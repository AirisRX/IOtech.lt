<svelte:head>
	<title>IOTech.lt - kompiuterių technikos parduotuvė</title>
</svelte:head>

<main>
	<div id="center-align">
		<hr />
		<h1>Nauji produktai</h1>
		<hr />
		<a href="mailto:airidas.rupsas@ku.lt">
			<img src="tikrainetas.jpg" alt="Reklama" title="Paspauskite, norint susisiekti" />
		</a>
		<hr />
		<h1>Nuolaidos, išpardavimai</h1>
		<hr />
		<h1>Rekomenduojami</h1>
		<div class="items">
			<div class="item">
				<img src="/products/dell-latitude-7410.jpg" alt="Dell kompiuteris" />
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
	</div>
</main>

<style lang="css">
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
		width: auto;
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
