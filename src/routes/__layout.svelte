<script>
    import Nav from "../components/nav.svelte"
    import Footer from "../components/footer.svelte"
</script>

<main>
    <div align="left">
        <a href="/"><img class="logo" src="IOtech.png" alt="IOtech" title="IOtech.lt - kompiuterių technikos parduotuvė"></a>
    </div>
    <Nav/>

    <slot></slot>

    <Footer/>
</main>

<style>
    
</style>