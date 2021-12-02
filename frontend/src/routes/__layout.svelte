<script>
    import Nav from "$lib/nav.svelte"
    import Footer from "$lib/footer.svelte"
</script>

<main>
    <Nav/>
    <slot></slot>
    <Footer/>
</main>

<style>
</style>