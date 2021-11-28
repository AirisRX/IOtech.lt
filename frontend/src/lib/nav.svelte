<script>
    // import Auth from "$lib/auth.svelte"

    let user;
</script>

<div class="meniu-align">
    <!-- {#if user}
    <div class="reg-log">
        <button class="reg-logbtn"><a href="/">Prisijungti/Registruotis</a></button>
    </div>
    {:else}
        <Auth/>
    {/if} -->

    <div class="meniu">
        
        <div class="dropdown">
            <a href="/"><img class="logo" src="IOtech.png" alt="IOtech" title="IOtech.lt - kompiuterių technikos parduotuvė"></a>
        </div>
        <div class="dropdown">
            
            <button class="dropbtn">Kompiuterių dalys
            <i class="fa fa-caret-down"></i>
            </button>
            <div class="dropdown-content">
                <a href="/">Procesoriai (CPU)</a>
                <a href="/">Operatyvioji atmintis (RAM)</a>
                <a href="/">Pagrindinės plokštės</a>
                <a href="/">Aušintuvai</a>
                <a href="/">HDD, SSD ir kiti</a>
                <a href="/">Vaizdo plokštės (GPU)</a>
                <a href="/">Korpusai ir jų priedai</a>
                <a href="/">Maitinimo blokai (PSU)</a>
                <a href="/">Kiti priedai</a>
            </div>
        </div>

        <div class="dropdown">
            <button class="dropbtn">Kompiuteriai
            <i class="fa fa-caret-down"></i>
            </button>
            <div class="dropdown-content">
                <a href="/">Stacionarūs kompiuteriai</a>
                <a href="/">Nešiojamieji kompiuteriai</a>
                <a href="/">Priedai</a>
            </div>
        </div>

        <div class="dropdown">
            <button class="dropbtn">Konsolės ir jų priedai
            <i class="fa fa-caret-down"></i>
            </button>
            <div class="dropdown-content">
                <a href="/">Microsoft Xbox ir jų priedai</a>
                <a href="/">Sony Playstation ir jų priedai</a>
                <a href="/">Nintendo Switch ir jo priedai</a>
            </div>
        </div>

        <div class="dropdown">
            <button class="dropbtn">Periferija, aksesuarai ir priedai
            <i class="fa fa-caret-down"></i>
            </button>
            <div class="dropdown-content">
                <a href="/">Klaviatūros</a>
                <a href="/">Pelės</a>
                <a href="/">Kilimėliai</a>
                <a href="/">Monitoriai</a>
                <a href="/">Ausinės</a>
                <a href="/">Kolonėles</a>
                <a href="/">Web kameros</a>
                <a href="/">Mikrofonai</a>
                <a href="/">Virtualios realybės (VR) akiniai ir jų priedai</a>
            </div>
        </div>

        <a class="a" href="/">Apie mus</a>

    </div>
</div>

<style>
.meniu-align {
  margin: 20px auto;
  width: 50%;
  height: 50%;
}

.meniu {
    background-color: #5a5858;
    /* Galbūt pakeisti spalva ateityje. */
    overflow: hidden;
    border-radius: 10px;
}

.dropdown {
    float: left;
    overflow: hidden;
}

.dropdown .dropbtn {
  font-size: 18px;
  border: none;
  color: #ff3e00;
  padding: 14px 15px;
  background-color: inherit;
  margin: 0; 
}

.meniu a:hover, .dropdown:hover .dropbtn {
  background-color: black;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: white;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  min-width: 160px;
  box-shadow: 0px 6px 18px 0px rgba(0,0,0,0.2);
  z-index: 1;
}

.dropdown-content a {
  float: none;
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  text-align: left;
}

.dropdown-content a:hover {
  background-color: #ddd;
}

.dropdown:hover .dropdown-content {
  display: block;
}

.reg-log {
    color: black;
    text-align: center;
	padding: 1em;
	max-width: 240px;
	margin: 0 auto;
}

.reg-logbtn {
    font-size: 18px;
    border: groove;
    color: #ff3e00;
    padding: 14px 15px;
    background-color: #5a5858;
    margin: 0; 
}

.a {
    float: left;
    font-size: 18px;
    color: #ff3e00;
    text-align: center;
    padding: 14px 15px;
    text-decoration: none;
}

.logo {
    width: 50px;
    height: 50px;
}
</style>