<script>
    import {getContext} from 'svelte'
    import { TABS } from './Tabs.svelte'

    export let href

    const tab = {}
    const { registerTab, selectTab, selectedTab } = getContext(TABS);

    registerTab(tab)
</script>

<li class:is-active="{$selectedTab === tab}" on:click="{() => selectTab(tab)}">
    <a href={href}>
        <slot></slot>
    </a>
</li>