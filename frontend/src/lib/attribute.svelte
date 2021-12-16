<script>
    import Attribute from '$lib/attribute.svelte'

    export let attrs;
</script>
{#each Object.entries(attrs) as [pav, subattrs]}
    {#if subattrs.constructor === Object}
        <p style="font-weight: bold">{pav}: </p>
        {#if subattrs["component_id"]}
            <p>{subattrs["brand"]} {subattrs["model"]}</p>
            {#if subattrs['attrs']}
                <Attribute attrs="{subattrs['attrs']}"/>
            {/if}
        {:else}
            <Attribute attrs="{subattrs}"/>
        {/if}
    {:else}
        <p>{pav}: {subattrs}</p>
    {/if}
{/each}
