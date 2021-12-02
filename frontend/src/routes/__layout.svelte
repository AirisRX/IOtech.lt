<script>
    import Nav from "$lib/nav.svelte"
    import Footer from "$lib/footer.svelte"
</script>

<main>
    <Nav/>
    
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
</style>