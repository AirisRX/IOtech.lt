
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function () {
    'use strict';

    function noop() { }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    let src_url_equal_anchor;
    function src_url_equal(element_src, url) {
        if (!src_url_equal_anchor) {
            src_url_equal_anchor = document.createElement('a');
        }
        src_url_equal_anchor.href = url;
        return element_src === src_url_equal_anchor.href;
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function custom_event(type, detail, bubbles = false) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, false, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    let flushing = false;
    const seen_callbacks = new Set();
    function flush() {
        if (flushing)
            return;
        flushing = true;
        do {
            // first, call beforeUpdate functions
            // and update components
            for (let i = 0; i < dirty_components.length; i += 1) {
                const component = dirty_components[i];
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        flushing = false;
        seen_callbacks.clear();
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = on_mount.map(run).filter(is_function);
                if (on_destroy) {
                    on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.44.1' }, detail), true));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    /* src/App.svelte generated by Svelte v3.44.1 */

    const file = "src/App.svelte";

    function create_fragment(ctx) {
    	let t0;
    	let main;
    	let div0;
    	let a0;
    	let img0;
    	let img0_src_value;
    	let t1;
    	let div1;
    	let button0;
    	let a1;
    	let t3;
    	let div10;
    	let div3;
    	let button1;
    	let t4;
    	let i0;
    	let t5;
    	let div2;
    	let a2;
    	let t7;
    	let a3;
    	let t9;
    	let a4;
    	let t11;
    	let a5;
    	let t13;
    	let a6;
    	let t15;
    	let a7;
    	let t17;
    	let a8;
    	let t19;
    	let a9;
    	let t21;
    	let a10;
    	let t23;
    	let div5;
    	let button2;
    	let t24;
    	let i1;
    	let t25;
    	let div4;
    	let a11;
    	let t27;
    	let a12;
    	let t29;
    	let a13;
    	let t31;
    	let div7;
    	let button3;
    	let t32;
    	let i2;
    	let t33;
    	let div6;
    	let a14;
    	let t35;
    	let a15;
    	let t37;
    	let a16;
    	let t39;
    	let div9;
    	let button4;
    	let t40;
    	let i3;
    	let t41;
    	let div8;
    	let a17;
    	let t43;
    	let a18;
    	let t45;
    	let a19;
    	let t47;
    	let a20;
    	let t49;
    	let a21;
    	let t51;
    	let a22;
    	let t53;
    	let a23;
    	let t55;
    	let a24;
    	let t57;
    	let a25;
    	let t59;
    	let a26;
    	let t61;
    	let div17;
    	let hr0;
    	let t62;
    	let h10;
    	let t64;
    	let hr1;
    	let t65;
    	let a27;
    	let img1;
    	let img1_src_value;
    	let t66;
    	let hr2;
    	let t67;
    	let h11;
    	let t69;
    	let hr3;
    	let t70;
    	let h12;
    	let t72;
    	let div16;
    	let div11;
    	let img2;
    	let img2_src_value;
    	let t73;
    	let a28;
    	let t75;
    	let p0;
    	let t77;
    	let button5;
    	let t79;
    	let div12;
    	let a29;
    	let t81;
    	let div13;
    	let a30;
    	let t83;
    	let div14;
    	let a31;
    	let t85;
    	let div15;
    	let a32;
    	let t87;
    	let hr4;
    	let t88;
    	let p1;
    	let t90;
    	let p2;
    	let t92;
    	let p3;

    	const block = {
    		c: function create() {
    			t0 = space();
    			main = element("main");
    			div0 = element("div");
    			a0 = element("a");
    			img0 = element("img");
    			t1 = space();
    			div1 = element("div");
    			button0 = element("button");
    			a1 = element("a");
    			a1.textContent = "Prisijungti/Registruotis";
    			t3 = space();
    			div10 = element("div");
    			div3 = element("div");
    			button1 = element("button");
    			t4 = text("Kompiuterių dalys\n            ");
    			i0 = element("i");
    			t5 = space();
    			div2 = element("div");
    			a2 = element("a");
    			a2.textContent = "Procesoriai (CPU)";
    			t7 = space();
    			a3 = element("a");
    			a3.textContent = "Operatyvioji atmintis (RAM)";
    			t9 = space();
    			a4 = element("a");
    			a4.textContent = "Pagrindinės plokštės";
    			t11 = space();
    			a5 = element("a");
    			a5.textContent = "Aušintuvai";
    			t13 = space();
    			a6 = element("a");
    			a6.textContent = "HDD, SSD ir kiti";
    			t15 = space();
    			a7 = element("a");
    			a7.textContent = "Vaizdo plokštės (GPU)";
    			t17 = space();
    			a8 = element("a");
    			a8.textContent = "Korpusai ir jų priedai";
    			t19 = space();
    			a9 = element("a");
    			a9.textContent = "Maitinimo blokai (PSU)";
    			t21 = space();
    			a10 = element("a");
    			a10.textContent = "Kiti priedai";
    			t23 = space();
    			div5 = element("div");
    			button2 = element("button");
    			t24 = text("Kompiuteriai\n            ");
    			i1 = element("i");
    			t25 = space();
    			div4 = element("div");
    			a11 = element("a");
    			a11.textContent = "Stacionarūs kompiuteriai";
    			t27 = space();
    			a12 = element("a");
    			a12.textContent = "Nešiojamieji kompiuteriai";
    			t29 = space();
    			a13 = element("a");
    			a13.textContent = "Priedai";
    			t31 = space();
    			div7 = element("div");
    			button3 = element("button");
    			t32 = text("Konsolės ir jų priedai\n            ");
    			i2 = element("i");
    			t33 = space();
    			div6 = element("div");
    			a14 = element("a");
    			a14.textContent = "Microsoft Xbox ir jų priedai";
    			t35 = space();
    			a15 = element("a");
    			a15.textContent = "Sony Playstation ir jų priedai";
    			t37 = space();
    			a16 = element("a");
    			a16.textContent = "Nintendo Switch ir jo priedai";
    			t39 = space();
    			div9 = element("div");
    			button4 = element("button");
    			t40 = text("Periferija, aksesuarai ir priedai\n            ");
    			i3 = element("i");
    			t41 = space();
    			div8 = element("div");
    			a17 = element("a");
    			a17.textContent = "Klaviatūros";
    			t43 = space();
    			a18 = element("a");
    			a18.textContent = "Pelės";
    			t45 = space();
    			a19 = element("a");
    			a19.textContent = "Kilimėliai";
    			t47 = space();
    			a20 = element("a");
    			a20.textContent = "Monitoriai";
    			t49 = space();
    			a21 = element("a");
    			a21.textContent = "Ausinės";
    			t51 = space();
    			a22 = element("a");
    			a22.textContent = "Kolonėles";
    			t53 = space();
    			a23 = element("a");
    			a23.textContent = "Web kameros";
    			t55 = space();
    			a24 = element("a");
    			a24.textContent = "Mikrofonai";
    			t57 = space();
    			a25 = element("a");
    			a25.textContent = "Virtualios realybės (VR) akiniai ir jų priedai";
    			t59 = space();
    			a26 = element("a");
    			a26.textContent = "Apie mus";
    			t61 = space();
    			div17 = element("div");
    			hr0 = element("hr");
    			t62 = space();
    			h10 = element("h1");
    			h10.textContent = "Nauji produktai";
    			t64 = space();
    			hr1 = element("hr");
    			t65 = space();
    			a27 = element("a");
    			img1 = element("img");
    			t66 = space();
    			hr2 = element("hr");
    			t67 = space();
    			h11 = element("h1");
    			h11.textContent = "Nuolaidos, išpardavimai";
    			t69 = space();
    			hr3 = element("hr");
    			t70 = space();
    			h12 = element("h1");
    			h12.textContent = "Rekomenduojami";
    			t72 = space();
    			div16 = element("div");
    			div11 = element("div");
    			img2 = element("img");
    			t73 = space();
    			a28 = element("a");
    			a28.textContent = "Dell";
    			t75 = space();
    			p0 = element("p");
    			p0.textContent = "2000 euru";
    			t77 = space();
    			button5 = element("button");
    			button5.textContent = "Į krepšelį";
    			t79 = space();
    			div12 = element("div");
    			a29 = element("a");
    			a29.textContent = "Lenovo";
    			t81 = space();
    			div13 = element("div");
    			a30 = element("a");
    			a30.textContent = "HP";
    			t83 = space();
    			div14 = element("div");
    			a31 = element("a");
    			a31.textContent = "Razer";
    			t85 = space();
    			div15 = element("div");
    			a32 = element("a");
    			a32.textContent = "Asus";
    			t87 = space();
    			hr4 = element("hr");
    			t88 = space();
    			p1 = element("p");
    			p1.textContent = "Airidas Rupšas / Nerijus Pocevičius";
    			t90 = space();
    			p2 = element("p");
    			p2.textContent = "JNII21";
    			t92 = space();
    			p3 = element("p");
    			p3.textContent = "2021";
    			document.title = "IOTech.lt - kompiuterių technikos parduotuvė";
    			attr_dev(img0, "class", "logo");
    			if (!src_url_equal(img0.src, img0_src_value = "IOtech.png")) attr_dev(img0, "src", img0_src_value);
    			attr_dev(img0, "alt", "IOtech");
    			attr_dev(img0, "title", "IOtech.lt - kompiuterių technikos parduotuvė");
    			add_location(img0, file, 9, 20, 187);
    			attr_dev(a0, "href", "/");
    			add_location(a0, file, 9, 8, 175);
    			attr_dev(div0, "align", "left");
    			add_location(div0, file, 8, 4, 148);
    			attr_dev(a1, "href", "/");
    			add_location(a1, file, 13, 31, 362);
    			attr_dev(button0, "class", "reg-logbtn svelte-xtrll5");
    			add_location(button0, file, 13, 4, 335);
    			attr_dev(div1, "class", "reg-log svelte-xtrll5");
    			add_location(div1, file, 12, 4, 309);
    			attr_dev(i0, "class", "fa fa-caret-down");
    			add_location(i0, file, 20, 12, 563);
    			attr_dev(button1, "class", "dropbtn svelte-xtrll5");
    			add_location(button1, file, 19, 12, 509);
    			attr_dev(a2, "href", "/");
    			attr_dev(a2, "class", "svelte-xtrll5");
    			add_location(a2, file, 23, 16, 677);
    			attr_dev(a3, "href", "/");
    			attr_dev(a3, "class", "svelte-xtrll5");
    			add_location(a3, file, 24, 16, 727);
    			attr_dev(a4, "href", "/");
    			attr_dev(a4, "class", "svelte-xtrll5");
    			add_location(a4, file, 25, 16, 787);
    			attr_dev(a5, "href", "/");
    			attr_dev(a5, "class", "svelte-xtrll5");
    			add_location(a5, file, 26, 16, 840);
    			attr_dev(a6, "href", "/");
    			attr_dev(a6, "class", "svelte-xtrll5");
    			add_location(a6, file, 27, 16, 883);
    			attr_dev(a7, "href", "/");
    			attr_dev(a7, "class", "svelte-xtrll5");
    			add_location(a7, file, 28, 16, 932);
    			attr_dev(a8, "href", "/");
    			attr_dev(a8, "class", "svelte-xtrll5");
    			add_location(a8, file, 29, 16, 986);
    			attr_dev(a9, "href", "/");
    			attr_dev(a9, "class", "svelte-xtrll5");
    			add_location(a9, file, 30, 16, 1041);
    			attr_dev(a10, "href", "/");
    			attr_dev(a10, "class", "svelte-xtrll5");
    			add_location(a10, file, 31, 16, 1096);
    			attr_dev(div2, "class", "dropdown-content svelte-xtrll5");
    			add_location(div2, file, 22, 12, 630);
    			attr_dev(div3, "class", "dropdown svelte-xtrll5");
    			add_location(div3, file, 18, 8, 474);
    			attr_dev(i1, "class", "fa fa-caret-down");
    			add_location(i1, file, 37, 12, 1252);
    			attr_dev(button2, "class", "dropbtn svelte-xtrll5");
    			add_location(button2, file, 36, 12, 1203);
    			attr_dev(a11, "href", "/");
    			attr_dev(a11, "class", "svelte-xtrll5");
    			add_location(a11, file, 40, 16, 1366);
    			attr_dev(a12, "href", "/");
    			attr_dev(a12, "class", "svelte-xtrll5");
    			add_location(a12, file, 41, 16, 1423);
    			attr_dev(a13, "href", "/");
    			attr_dev(a13, "class", "svelte-xtrll5");
    			add_location(a13, file, 42, 16, 1481);
    			attr_dev(div4, "class", "dropdown-content svelte-xtrll5");
    			add_location(div4, file, 39, 12, 1319);
    			attr_dev(div5, "class", "dropdown svelte-xtrll5");
    			add_location(div5, file, 35, 8, 1168);
    			attr_dev(i2, "class", "fa fa-caret-down");
    			add_location(i2, file, 48, 12, 1642);
    			attr_dev(button3, "class", "dropbtn svelte-xtrll5");
    			add_location(button3, file, 47, 12, 1583);
    			attr_dev(a14, "href", "/");
    			attr_dev(a14, "class", "svelte-xtrll5");
    			add_location(a14, file, 51, 16, 1756);
    			attr_dev(a15, "href", "/");
    			attr_dev(a15, "class", "svelte-xtrll5");
    			add_location(a15, file, 52, 16, 1817);
    			attr_dev(a16, "href", "/");
    			attr_dev(a16, "class", "svelte-xtrll5");
    			add_location(a16, file, 53, 16, 1880);
    			attr_dev(div6, "class", "dropdown-content svelte-xtrll5");
    			add_location(div6, file, 50, 12, 1709);
    			attr_dev(div7, "class", "dropdown svelte-xtrll5");
    			add_location(div7, file, 46, 8, 1548);
    			attr_dev(i3, "class", "fa fa-caret-down");
    			add_location(i3, file, 59, 12, 2074);
    			attr_dev(button4, "class", "dropbtn svelte-xtrll5");
    			add_location(button4, file, 58, 12, 2004);
    			attr_dev(a17, "href", "/");
    			attr_dev(a17, "class", "svelte-xtrll5");
    			add_location(a17, file, 62, 16, 2188);
    			attr_dev(a18, "href", "/");
    			attr_dev(a18, "class", "svelte-xtrll5");
    			add_location(a18, file, 63, 16, 2232);
    			attr_dev(a19, "href", "/");
    			attr_dev(a19, "class", "svelte-xtrll5");
    			add_location(a19, file, 64, 16, 2270);
    			attr_dev(a20, "href", "/");
    			attr_dev(a20, "class", "svelte-xtrll5");
    			add_location(a20, file, 65, 16, 2313);
    			attr_dev(a21, "href", "/");
    			attr_dev(a21, "class", "svelte-xtrll5");
    			add_location(a21, file, 66, 16, 2356);
    			attr_dev(a22, "href", "/");
    			attr_dev(a22, "class", "svelte-xtrll5");
    			add_location(a22, file, 67, 16, 2396);
    			attr_dev(a23, "href", "/");
    			attr_dev(a23, "class", "svelte-xtrll5");
    			add_location(a23, file, 68, 16, 2438);
    			attr_dev(a24, "href", "/");
    			attr_dev(a24, "class", "svelte-xtrll5");
    			add_location(a24, file, 69, 16, 2482);
    			attr_dev(a25, "href", "/");
    			attr_dev(a25, "class", "svelte-xtrll5");
    			add_location(a25, file, 70, 16, 2525);
    			attr_dev(div8, "class", "dropdown-content svelte-xtrll5");
    			add_location(div8, file, 61, 12, 2141);
    			attr_dev(div9, "class", "dropdown svelte-xtrll5");
    			add_location(div9, file, 57, 8, 1969);
    			attr_dev(a26, "class", "a svelte-xtrll5");
    			attr_dev(a26, "href", "/");
    			add_location(a26, file, 74, 8, 2631);
    			attr_dev(div10, "class", "meniu svelte-xtrll5");
    			attr_dev(div10, "id", "meniu-align");
    			add_location(div10, file, 16, 4, 428);
    			add_location(hr0, file, 79, 8, 2715);
    			attr_dev(h10, "class", "svelte-xtrll5");
    			add_location(h10, file, 80, 8, 2728);
    			add_location(hr1, file, 81, 8, 2761);
    			if (!src_url_equal(img1.src, img1_src_value = "tikrainetas.jpg")) attr_dev(img1, "src", img1_src_value);
    			attr_dev(img1, "alt", "Reklama");
    			attr_dev(img1, "title", "Paspauskite, norint susisiekti");
    			add_location(img1, file, 82, 47, 2813);
    			attr_dev(a27, "href", "mailto:airidas.rupsas@ku.lt");
    			add_location(a27, file, 82, 8, 2774);
    			add_location(hr2, file, 83, 8, 2907);
    			attr_dev(h11, "class", "svelte-xtrll5");
    			add_location(h11, file, 84, 8, 2920);
    			add_location(hr3, file, 85, 8, 2961);
    			attr_dev(h12, "class", "svelte-xtrll5");
    			add_location(h12, file, 86, 8, 2974);
    			if (!src_url_equal(img2.src, img2_src_value = "/products/dell-latitude-7410.jpg")) attr_dev(img2, "src", img2_src_value);
    			attr_dev(img2, "alt", "Dell kompiuteris");
    			attr_dev(img2, "class", "svelte-xtrll5");
    			add_location(img2, file, 89, 20, 3082);
    			attr_dev(a28, "href", "/");
    			attr_dev(a28, "class", "svelte-xtrll5");
    			add_location(a28, file, 90, 20, 3170);
    			attr_dev(p0, "class", "kaina svelte-xtrll5");
    			add_location(p0, file, 91, 20, 3211);
    			add_location(button5, file, 92, 20, 3262);
    			attr_dev(div11, "class", "item svelte-xtrll5");
    			add_location(div11, file, 88, 16, 3042);
    			attr_dev(a29, "href", "/");
    			attr_dev(a29, "class", "svelte-xtrll5");
    			add_location(a29, file, 96, 20, 3369);
    			attr_dev(div12, "class", "item svelte-xtrll5");
    			add_location(div12, file, 95, 16, 3330);
    			attr_dev(a30, "href", "/");
    			attr_dev(a30, "class", "svelte-xtrll5");
    			add_location(a30, file, 101, 20, 3529);
    			attr_dev(div13, "class", "item svelte-xtrll5");
    			add_location(div13, file, 100, 16, 3490);
    			attr_dev(a31, "href", "/");
    			attr_dev(a31, "class", "svelte-xtrll5");
    			add_location(a31, file, 105, 20, 3627);
    			attr_dev(div14, "class", "item svelte-xtrll5");
    			add_location(div14, file, 104, 16, 3588);
    			attr_dev(a32, "href", "/");
    			attr_dev(a32, "class", "svelte-xtrll5");
    			add_location(a32, file, 109, 20, 3728);
    			attr_dev(div15, "class", "item svelte-xtrll5");
    			add_location(div15, file, 108, 16, 3689);
    			attr_dev(div16, "class", "items svelte-xtrll5");
    			add_location(div16, file, 87, 8, 3006);
    			add_location(hr4, file, 112, 3, 3785);
    			attr_dev(p1, "class", "about svelte-xtrll5");
    			add_location(p1, file, 113, 3, 3793);
    			attr_dev(p2, "class", "about svelte-xtrll5");
    			add_location(p2, file, 114, 3, 3855);
    			attr_dev(p3, "class", "about svelte-xtrll5");
    			add_location(p3, file, 115, 3, 3888);
    			attr_dev(div17, "id", "center-align");
    			attr_dev(div17, "class", "svelte-xtrll5");
    			add_location(div17, file, 78, 4, 2683);
    			attr_dev(main, "class", "svelte-xtrll5");
    			add_location(main, file, 7, 0, 137);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t0, anchor);
    			insert_dev(target, main, anchor);
    			append_dev(main, div0);
    			append_dev(div0, a0);
    			append_dev(a0, img0);
    			append_dev(main, t1);
    			append_dev(main, div1);
    			append_dev(div1, button0);
    			append_dev(button0, a1);
    			append_dev(main, t3);
    			append_dev(main, div10);
    			append_dev(div10, div3);
    			append_dev(div3, button1);
    			append_dev(button1, t4);
    			append_dev(button1, i0);
    			append_dev(div3, t5);
    			append_dev(div3, div2);
    			append_dev(div2, a2);
    			append_dev(div2, t7);
    			append_dev(div2, a3);
    			append_dev(div2, t9);
    			append_dev(div2, a4);
    			append_dev(div2, t11);
    			append_dev(div2, a5);
    			append_dev(div2, t13);
    			append_dev(div2, a6);
    			append_dev(div2, t15);
    			append_dev(div2, a7);
    			append_dev(div2, t17);
    			append_dev(div2, a8);
    			append_dev(div2, t19);
    			append_dev(div2, a9);
    			append_dev(div2, t21);
    			append_dev(div2, a10);
    			append_dev(div10, t23);
    			append_dev(div10, div5);
    			append_dev(div5, button2);
    			append_dev(button2, t24);
    			append_dev(button2, i1);
    			append_dev(div5, t25);
    			append_dev(div5, div4);
    			append_dev(div4, a11);
    			append_dev(div4, t27);
    			append_dev(div4, a12);
    			append_dev(div4, t29);
    			append_dev(div4, a13);
    			append_dev(div10, t31);
    			append_dev(div10, div7);
    			append_dev(div7, button3);
    			append_dev(button3, t32);
    			append_dev(button3, i2);
    			append_dev(div7, t33);
    			append_dev(div7, div6);
    			append_dev(div6, a14);
    			append_dev(div6, t35);
    			append_dev(div6, a15);
    			append_dev(div6, t37);
    			append_dev(div6, a16);
    			append_dev(div10, t39);
    			append_dev(div10, div9);
    			append_dev(div9, button4);
    			append_dev(button4, t40);
    			append_dev(button4, i3);
    			append_dev(div9, t41);
    			append_dev(div9, div8);
    			append_dev(div8, a17);
    			append_dev(div8, t43);
    			append_dev(div8, a18);
    			append_dev(div8, t45);
    			append_dev(div8, a19);
    			append_dev(div8, t47);
    			append_dev(div8, a20);
    			append_dev(div8, t49);
    			append_dev(div8, a21);
    			append_dev(div8, t51);
    			append_dev(div8, a22);
    			append_dev(div8, t53);
    			append_dev(div8, a23);
    			append_dev(div8, t55);
    			append_dev(div8, a24);
    			append_dev(div8, t57);
    			append_dev(div8, a25);
    			append_dev(div10, t59);
    			append_dev(div10, a26);
    			append_dev(main, t61);
    			append_dev(main, div17);
    			append_dev(div17, hr0);
    			append_dev(div17, t62);
    			append_dev(div17, h10);
    			append_dev(div17, t64);
    			append_dev(div17, hr1);
    			append_dev(div17, t65);
    			append_dev(div17, a27);
    			append_dev(a27, img1);
    			append_dev(div17, t66);
    			append_dev(div17, hr2);
    			append_dev(div17, t67);
    			append_dev(div17, h11);
    			append_dev(div17, t69);
    			append_dev(div17, hr3);
    			append_dev(div17, t70);
    			append_dev(div17, h12);
    			append_dev(div17, t72);
    			append_dev(div17, div16);
    			append_dev(div16, div11);
    			append_dev(div11, img2);
    			append_dev(div11, t73);
    			append_dev(div11, a28);
    			append_dev(div11, t75);
    			append_dev(div11, p0);
    			append_dev(div11, t77);
    			append_dev(div11, button5);
    			append_dev(div16, t79);
    			append_dev(div16, div12);
    			append_dev(div12, a29);
    			append_dev(div16, t81);
    			append_dev(div16, div13);
    			append_dev(div13, a30);
    			append_dev(div16, t83);
    			append_dev(div16, div14);
    			append_dev(div14, a31);
    			append_dev(div16, t85);
    			append_dev(div16, div15);
    			append_dev(div15, a32);
    			append_dev(div17, t87);
    			append_dev(div17, hr4);
    			append_dev(div17, t88);
    			append_dev(div17, p1);
    			append_dev(div17, t90);
    			append_dev(div17, p2);
    			append_dev(div17, t92);
    			append_dev(div17, p3);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(main);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('App', slots, []);
    	let { name } = $$props;
    	const writable_props = ['name'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('name' in $$props) $$invalidate(0, name = $$props.name);
    	};

    	$$self.$capture_state = () => ({ name });

    	$$self.$inject_state = $$props => {
    		if ('name' in $$props) $$invalidate(0, name = $$props.name);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [name];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, { name: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*name*/ ctx[0] === undefined && !('name' in props)) {
    			console.warn("<App> was created without expected prop 'name'");
    		}
    	}

    	get name() {
    		throw new Error("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set name(value) {
    		throw new Error("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    const app = new App({
        target: document.body,
        props: {
            name: 'world'
        }
    });

    return app;

})();
//# sourceMappingURL=bundle.js.map
