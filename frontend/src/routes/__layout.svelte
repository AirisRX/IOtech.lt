<script context="module">
    export async function load({session}) {
        return {
            props: {
                account: session.account
            }
        }
    }
</script>

<script>
    export let account;

    import Nav from "$lib/nav.svelte"
    import Footer from "$lib/footer.svelte"
</script>

<main>
    <Nav account="{account}"/>
    
    <nav class="breadcrumb is-right" aria-label="breadcrumbs">
        <ul>
          <li><a href="/">IOtech</a></li>
          <li class="is-active"><a href="/" aria-current="page"></a>Kategorija</li>
        </ul>
    </nav>

    <slot></slot>
    <Footer/>
</main>

<style>
    :global(html), :global(body) {
        position: relative;
        width: 100%;
        height: 100%;
    }

    :global(html) {
        background-image: url("/background.jpg");
        background-attachment: fixed;
        font-family: 'Ubuntu', sans-serif;
        background-size: auto;
    }
</style>