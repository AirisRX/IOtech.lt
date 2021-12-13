<script>
    import 'bulma/css/bulma.min.css'

    let kategorijos = new Map()

    async function getCategories() {
        try {
            const res = await fetch('http://localhost:5000/product/category');
            const text = await res.text()
            // console.log(text)
            kategorijos = JSON.parse(text)
        } catch (err) {
            console.log(err)
        }
    }

    getCategories();

    let burger = false
</script>

<nav class="navbar is-transparent" role="navigation" aria-label="main navigation">

    <div class="navbar-brand">
      <a class="navbar-item" href="/">
        <img src="/IOtech.png" width="auto" height="auto" alt="IOtech.lt - kompiuterių technikos parduotuvė">
      </a>
  
      <!-- svelte-ignore a11y-missing-attribute -->
      <div role="button" class="navbar-burger" aria-label="menu" aria-expanded="true" data-target="navbarBasicExample" class:is-active="{burger}" on:click="{()=>burger=!burger}">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </div>
    </div>
  
    <div id="navbarBasicExample" class="navbar-menu" class:is-active="{burger}" >
        <div class="navbar-start">

            {#each Object.entries(kategorijos) as [kat, attrs]}
            <div class="navbar-item has-dropdown is-hoverable">
                <nav class="navbar" role="navigation" aria-label="dropdown navigation">
                    <div class="navbar-item has-dropdown">
                    
                        <a class="navbar-link" href="/produktai/{kat}">{kat}</a>
                        <div class="navbar-dropdown">
                            {#each Object.entries(attrs["kategorijos"]) as [kat, attrs]}
                                <a class="navbar-item" href="/produktai/{kat}">{kat}</a>
                            {/each}
                        </div>
                    </div>
                </nav>
            </div>
            {/each}

            <a class="navbar-item" href="/about">Apie mus</a>

        </div>
    </div>

    <div class="navbar-end">
        <div class="navbar-item">
            <div class="buttons">
                <a class="button is-primary" href="/auth">
                    <strong>Registuotis/Prisijungti</strong>
                </a>
            </div>
        </div>
    </div>

</nav>