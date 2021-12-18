<script>
    import 'bulma/css/bulma.min.css';
    import {fly} from 'svelte/transition';

    export let account = null;
    console.log(account)

    let kategorijos = new Map();

    async function getCategories() {
        try {
            const res = await fetch('http://localhost:5000/product/category');
            const text = await res.text();
            // console.log(text)
            kategorijos = JSON.parse(text);
        } catch (err) {
            console.log(err);
        }
    }

    let search = null

    async function searching() {
        try {
            const res = await fetch(`http://localhost:5000/product/products?name=${search}`);
            const text = await res.text();
            search = JSON.parse(text);
        } catch (err) {
            console.log(err);
        }
    }

    getCategories();

    let burger = false;

    const onKeyPress = e => {
        if (e.charCode === 13) window.location.href = "/search/" + search;
    };
</script>

<nav
        id="pagr-meniu"
        class="navbar is-transparent p-1 is-fixed-top has-navbar-fixed-top"
        role="navigation"
        aria-label="main navigation"
>
    <div class="navbar-brand">
        <a class="navbar-item" href="/">
            <img
                    src="/IOtech.png"
                    width="auto"
                    height="auto"
                    alt="IOtech.lt - kompiuterių technikos parduotuvė"
            />
        </a>

        <!-- svelte-ignore a11y-missing-attribute -->
        <div
                role="button"
                class="navbar-burger"
                aria-label="menu"
                aria-expanded="true"
                data-target="navbarBasicExample"
                class:is-active={burger}
                on:click={() => (burger = !burger)}
        >
            <span aria-hidden="true"/>
            <span aria-hidden="true"/>
            <span aria-hidden="true"/>
        </div>
    </div>

    <div id="navbarBasicExample" class="navbar-menu" class:is-active={burger}>
        <div class="navbar-start">
            {#each Object.entries(kategorijos) as [sub, sattrs]}
                <div class="navbar-item has-dropdown is-hoverable">
                    <nav class="navbar" role="navigation" aria-label="dropdown navigation">
                        <div class="navbar-item has-dropdown" transition:fly={{ y: -200, duration: 1500 }}>
                            <a class="navbar-link" href="/kategorijos/{sattrs['slug']}">{sub}</a>
                            <div class="navbar-dropdown">
                                {#each Object.entries(sattrs['kategorijos']) as [kat, kattrs]}
                                    <a class="navbar-item" href="/kategorijos/{kattrs['slug']}">{kat}</a>
                                {/each}
                            </div>
                        </div>
                    </nav>
                </div>
            {/each}
        </div>
    </div>

    <div class="navbar-end">
        <div class="navbar-item">
            <div class="field has-addons">
                <div class="control is-rounded">
                    <input class="input is-rounded" type="text" placeholder="Paieška" bind:value="{search}"
                           on:click="{search}" on:keypress="{onKeyPress}">
                </div>
                <div class="control">
                    <a class="button is-primary is-rounded" href="/search/{search}">
                        <span class="icon"><i class="fas fa-search"/></span>
                    </a>
                </div>
            </div>
        </div>
    </div>

    <div class="navbar-end">
        <div class="navbar-item">
            <div class="buttons">
                <a class="button is-primary is-rounded" href="/cart">
					<span class="icon">
						<i class="fas fa-shopping-cart"/>
					</span>
                    <strong>Krepšelis</strong>
                </a>
            </div>
        </div>
    </div>

    {#if account}
        <div class="navbar-end">
            <div class="navbar-item">
                <div class="buttons">
                    <a class="button is-primary is-rounded" href="/auth">
					<span class="icon">
						<i class="fas fa-user"/>
					</span>
                        <strong>{account.name}</strong>
                    </a>
                </div>
            </div>
        </div>
    {:else }
        <div class="navbar-end">
            <div class="navbar-item">
                <div class="buttons">
                    <a class="button is-primary is-rounded" href="/auth">
					<span class="icon">
						<i class="fas fa-user"/>
					</span>
                        <strong>Registruotis/Prisijungti</strong>
                    </a>
                </div>
            </div>
        </div>
    {/if}

    <div class="navbar-end">
        <div class="navbar-item">
            <div class="buttons">
                <a class="button is-primary is-rounded" href="/about">
					<span class="icon">
						<i class="fas fa-address-card"/>
					</span>
                    <strong>Apie mus</strong>
                </a>
            </div>
        </div>
    </div>
</nav>

<style>
    :global(#pagr-meniu) {
        margin-bottom: 100px;
    }
</style>
