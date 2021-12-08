<script>
    import 'bulma/css/bulma.css'
    import {onMount} from 'svelte'

    let kategorijos = new Map()

    async function getCategories() {
        try {
            const res = await fetch('http://localhost:5000/product/category');
            const text = await res.text()
            console.log(text)
            kategorijos = JSON.parse(text)
            console.log(kategorijos)
        } catch (err) {
            console.log(err)
        }
    }

    onMount(getCategories);
</script>

<nav class="navbar is-transparent" role="navigation" aria-label="main navigation">

    <div class="navbar-brand">
      <a class="navbar-item" href="/">
        <img src="IOtech.png" width="auto" height="auto" alt="IOtech.lt - kompiuterių technikos parduotuvė">
      </a>
  
      <!-- svelte-ignore a11y-missing-attribute -->
      <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
  
    <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-start">

            {#each Object.entries(kategorijos) as [sub, attrs]}
            <div class="navbar-item has-dropdown is-hoverable">
                <nav class="navbar" role="navigation" aria-label="dropdown navigation">
                    <div class="navbar-item has-dropdown">
                    
                        <a class="navbar-link">{sub}</a>
                        <div class="navbar-dropdown">
                            {#each Object.entries(attrs["kategorijos"]) as [kat, sub]}
                                <a class="navbar-item" href="category">{kat}</a>
                            {/each}
                        </div>
                    </div>
                </nav>
            </div>
            {/each}

            <a class="navbar-item" href="about">Apie mus</a>

        </div>
    </div>

    <div class="navbar-end">
        <div class="navbar-item">
            <div class="buttons">
                <a class="button is-primary" href="auth">
                    <strong>Registuotis/Prisijungti</strong>
                </a>
            </div>
        </div>
    </div>

</nav>