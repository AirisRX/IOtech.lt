<script>
    import Nav from "$lib/nav.svelte"
    import Footer from "$lib/footer.svelte"
    import '@fortawesome/fontawesome-free/css/all.min.css'
    import 'bulma/css/bulma.min.css';
</script>

<main>
    <Nav/>

<div style="margin-top: 50px;">.</div>
    
    <!-- <nav class="breadcrumb is-right" aria-label="breadcrumbs">
        <ul>
          <li><a href="/">IOtech</a></li>
          <li class="is-active"><a href="/" aria-current="page"></a>Kategorija</li>
        </ul>
    </nav> -->

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