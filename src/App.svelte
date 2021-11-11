<script lang="ts">
	export let name: string;
</script>

<svelte:head>
	<title>IOTech.lt - kompiuterių technikos parduotuvė</title>
</svelte:head>

<main>
	<img class="logo" src="/logo.png" alt="IOtech" title="IOtech.lt - kompiuterių technikos parduotuvė">

	<hr>
        <h1>Nauji produktai</h1>
        <hr>
        <img class="reklama" src="reklama.jpg" alt="Reklama" title="Paspauskite, norint susisiekti" href="mailto:airidas.rupsas@ku.lt">
        <hr>
        <h1>Nuolaidos, išpardavimai</h1>
        <hr>
        <h1>Rekomenduojami</h1>
        <div class="items">
                <div class="item"> 
                    <img src="/products/dell-latitude-7410.jpg">
                    <a>Dell</a>
                    <a>2000 euru</a>
                    <button class="button">Į krepšelį</button>
                </div>

                <div class="item">
                    <a>Lenovo</a>
                </div>

                <div class="item">
                    <a>HP</a>
                </div>

                <div class="item">
                    <a>Razer</a>
                </div>

                <div class="item">
                    <a>Asus</a>
                </div>
			</div>
			<hr>
			<p class="about"> Airidas Rupšas / Nerijus Pocevičius </p>
			<p class="about"> JNII21 </p>
			<p class="about"> 2021 </p>
</main>

<style>
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
    /* background-color: greenyellow; */
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

.reklama {
    width: auto;
    height: 200px;
}

.button {
    text-align: center;
}

	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>