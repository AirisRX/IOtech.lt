<script context="module">
    export const TABS = {};
</script>

<script>
    import { setContext, onDestroy } from 'svelte'
    import { writable } from 'svelte/store'

    const tabs = []
    const views = []

    const selectedTab = writable(null)
    const selectedView = writable(null)

    setContext(TABS, {
        registerTab: tab => {
            tabs.push(tab)
            selectedTab.update(current => current || tab)

            onDestroy(() => {
                const i = tabs.indexOf(tab);
                tabs.splice(i, 1);
                selectedTab.update(current => current == tab ? (tabs[i] || tabs[tabs.length - 1]) : current)
            })
        },
        
        registerView: view => {
			views.push(view);
			selectedView.update(current => current || view);
			
			onDestroy(() => {
				const i = views.indexOf(view);
				views.splice(i, 1);
				selectedView.update(current => current === view ? (views[i] || views[views.length - 1]) : current);
			});
		},

		selectTab: tab => {
			const i = tabs.indexOf(tab);
			selectedTab.set(tab);
			selectedView.set(views[i]);
		},

		selectedTab,
		selectedView
    })
</script>

<slot></slot>
