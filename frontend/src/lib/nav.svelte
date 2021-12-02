<script>
    import 'bulma/css/bulma.css'
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

            <div class="navbar-item has-dropdown is-hoverable">
                <nav class="navbar" role="navigation" aria-label="dropdown navigation">
                    <div class="navbar-item has-dropdown">
                    <!-- svelte-ignore a11y-missing-attribute -->
                        <a class="navbar-link">Kompiuterių dalys</a>
                        <div class="navbar-dropdown">
                        <a class="navbar-item" href="category">Procesoriai (CPU)</a>
                        <a class="navbar-item" href="category">Operatyvioji atmintis (RAM)</a>
                        <a class="navbar-item" href="category">Pagrindinės plokštės</a>
                        <a class="navbar-item" href="category">Aušintuvai</a>
                        <a class="navbar-item" href="category">HDD, SSD ir kiti</a>
                        <a class="navbar-item" href="category">Vaizdo plokštės (GPU)</a>
                        <a class="navbar-item" href="category">Korpusai ir jų priedai</a>
                        <a class="navbar-item" href="category">Maitinimo blokai (PSU)</a>
                        <a class="navbar-item" href="category">Kiti priedai</a>
                        </div>
                    </div>
                </nav>
            </div>

            <div class="navbar-item has-dropdown is-hoverable">
                <nav class="navbar" role="navigation" aria-label="dropdown navigation">
                    <div class="navbar-item has-dropdown">
                    <!-- svelte-ignore a11y-missing-attribute -->
                        <a class="navbar-link">Kompiuteriai</a>
                        <div class="navbar-dropdown">
                        <a class="navbar-item" href="category">Stacionarūs kompiuteriai</a>
                        <a class="navbar-item" href="category">Nešiojamieji kompiuteriai</a>
                        <a class="navbar-item" href="category">Priedai</a>
                        </div>
                    </div>
                </nav>
            </div>

            <div class="navbar-item has-dropdown is-hoverable">
                <nav class="navbar" role="navigation" aria-label="dropdown navigation">
                    <div class="navbar-item has-dropdown">
                    <!-- svelte-ignore a11y-missing-attribute -->
                        <a class="navbar-link">Konsolės ir jų priedai</a>
                        <div class="navbar-dropdown">
                        <a class="navbar-item" href="category">Microsoft Xbox ir jų priedai</a>
                        <a class="navbar-item" href="category">Sony Playstation ir jų priedai</a>
                        <a class="navbar-item" href="category">Nintendo Switch ir jo priedai</a>
                        </div>
                    </div>
                </nav>
            </div>

            <div class="navbar-item has-dropdown is-hoverable">
                <nav class="navbar" role="navigation" aria-label="dropdown navigation">
                    <div class="navbar-item has-dropdown">
                    <!-- svelte-ignore a11y-missing-attribute -->
                        <a class="navbar-link">Periferija</a>
                        <div class="navbar-dropdown">
                        <a class="navbar-item" href="category">Klaviatūros</a>
                        <a class="navbar-item" href="category">Pelės</a>
                        <a class="navbar-item" href="category">Kilimėliai</a>
                        <a class="navbar-item" href="category">Monitoriai</a>
                        <a class="navbar-item" href="category">Ausinės</a>
                        <a class="navbar-item" href="category">Kolonėles</a>
                        <a class="navbar-item" href="category">Web kameros</a>
                        <a class="navbar-item" href="category">Mikrofonai</a>
                        <a class="navbar-item" href="category">Virtualios realybės (VR) akiniai ir jų priedai</a>
                        </div>
                    </div>
                </nav>
            </div>

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