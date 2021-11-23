<script lang="ts">
	export let name: string;
</script>

<svelte:head>
	<title>IOTech.lt - kompiuterių technikos parduotuvė</title>
</svelte:head>

<main>
    <div align="left">
        <a href="/"><img class="logo" src="IOtech.png" alt="IOtech" title="IOtech.lt - kompiuterių technikos parduotuvė"></a>
    </div>

    <div class="meniu" id="center-align">

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

    </div>

	<hr>
    <div id="center-align">
        <hr>
        <h1>Nauji produktai</h1>
        <hr>
        <a href="mailto:airidas.rupsas@ku.lt"> <img src="tikrainetas.jpg" alt="Reklama" title="Paspauskite, norint susisiekti"> </a>
        <hr>
        <h1>Nuolaidos, išpardavimai</h1>
        <hr>
        <h1>Rekomenduojami</h1>
        <div class="items">
                <div class="item"> 
                    <img src="/products/dell-latitude-7410.jpg" alt="Dell kompiuteris">
                    <a href="/">Dell</a>
                    <p class="kaina">2000 euru</p>
                    <button>Į krepšelį</button>
                </div>

                <div class="item">
                    <a href="/">Lenovo</a> 
                    <!-- Padaryti veikiančius linkus -->
                </div>

                <div class="item">
                    <a href="/">HP</a>
                </div>

                <div class="item">
                    <a href="/">Razer</a>
                </div>

                <div class="item">
                    <a href="/">Asus</a>
                </div>
			</div>
			<hr>
			<p class="about"> Airidas Rupšas / Nerijus Pocevičius </p>
			<p class="about"> JNII21 </p>
			<p class="about"> 2021 </p>
    </div>
</main>

<style lang="css">

.about {
    font-weight: bold;
    color:white;
    text-align: center;
    margin: 5px;
}

.items {
    display: flex;
    align-content: space-between;
    justify-content: space-evenly;
    flex-wrap: nowrap;
    margin: 25px;
}

.item {
    width: fit-content;
    gap: 0px;
    border-radius: 5px;
}

.item a {
    display: block;
    text-align: center;
    color: whitesmoke;
}

.item img {
    width:auto;
    height: 200px;
    border-radius: 5px;
}

.kaina {
    color: white;
}

#center-align {
  margin: 20px auto;
  width: 70%;
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

	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		font-weight: 100;
        text-align: left;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>