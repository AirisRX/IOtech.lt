<script>
	import 'bulma/css/bulma.min.css';
  import { fade } from 'svelte/transition';

	let produktai = [];

	async function getProducts() {
		try {
			const res = await fetch('http://localhost:5000/product/products?slug=nesiojami_kompiuteriai');
			const text = await res.text();
			// console.log(text)
			produktai = JSON.parse(text);
			console.log(produktai);
		} catch (err) {
			console.log(err);
		}
	}

	getProducts();

	// function cartnotification() {
	// 	alert('Jūsų prekė buvo sėkmingai pridėta į krepšelį. ');
	// }

	let notification;

	function toggleNotification(text) {
		console.log("veikia ar neveikia stai kur klausimas")
		if (notification) {
			notification = null;
			return;
		} 
		notification = text;
		setInterval(() => {
			notification = null;
		}, 3000);
	}
</script>

<svelte:head>
	<title>IOTech.lt - kompiuterių technikos parduotuvė</title>
</svelte:head>


<main class="mt-4">
	<div class="container">
	
		{#if notification}
		<div>
			<div class="notification has-background-white has-text-primary has-text-weight-bold">
				<p>{notification}</p>
			  </div>
		</div>
		{/if}

		<div class="box" style="background-color: rgba(0, 0, 0, 0.6); border-radius: 10px; margin-top: 15px;">
			<h1 class="title" style="padding-top: 10px;">Nauji produktai</h1>
			<section class="section level is-small">
				<div class="tile is-ancestor">
					<div class="tile">
						{#each produktai as produktas}
							<div class="tile is-parent is-3">
								<article class="tile is-child notification is-info">
									<p class="title">{produktas['brand']} {produktas['model']}</p>
									<figure class="image">
										<img src={produktas['img']} alt="Produktas" style="border-radius: 5px;" />
										<div class="columns">
											<div class="column">
												<p class="subtitle">{produktas['cost']}€</p>
											</div>
											<button class="button is-primary is-rounded">
												<span class="icon is-left"><i class="fas fa-shopping-bag" /></span>
												<span on:click={() => toggleNotification("Jūsų prekė buvo pridėta į krepšelį.")}>Į krepšelį</span>
											</button>
										</div>
									</figure>
								</article>
							</div>
						{/each}
					</div>
				</div>
			</section>
			

		</div>


		<hr />

		<div class="level">
			<div class="level-item">
				<a href="mailto:airidas.rupsas@ku.lt">
					<img src="tikrainetas.jpg" alt="Reklama" title="Paspauskite, norint susisiekti" />
				</a>
			</div>
		</div>

		<hr />

		<div class="box" style="background-color: rgba(0, 0, 0, 0.6); border-radius: 10px;">
			<h1 class="title" style="padding-top: 10px;">Išpardavimai</h1>
			<section class="section level is-small">
				<div class="tile is-ancestor">
					<div class="tile">
						{#each produktai as produktas}
							<div class="tile is-parent is-3">
								<article class="tile is-child notification is-info">
									<p class="title">{produktas['brand']} {produktas['model']}</p>
									<figure class="image">
										<img src={produktas['img']} alt="Produktas" style="border-radius: 5px;" />
										<div class="columns">
											<div class="column">
												<p class="subtitle">{produktas['cost']}€</p>
											</div>
											<button class="button is-primary is-rounded">
												<span class="icon is-left"><i class="fas fa-shopping-bag" /></span>
												<span>Į krepšelį</span>
											</button>
										</div>
									</figure>
								</article>
							</div>
						{/each}
					</div>
				</div>
			</section>
		</div>

		<hr />

		<div class="box" style="background-color: rgba(0, 0, 0, 0.6); border-radius: 10px;">
			<h1 class="title" style="padding-top: 10px;">Rekomenduojami</h1>
			<section class="section level is-small">
				<div class="tile is-ancestor">
					<div class="tile">
						{#each produktai as produktas}
							<div class="tile is-parent is-3">
								<article class="tile is-child notification is-info">
									<p class="title">{produktas['brand']} {produktas['model']}</p>
									<figure class="image">
										<img src={produktas['img']} alt="Produktas" style="border-radius: 5px;" />
										<div class="columns">
											<div class="column">
												<p class="subtitle">{produktas['cost']}€</p>
											</div>
											<button class="button is-primary is-rounded">
												<span class="icon is-left"><i class="fas fa-shopping-bag" /></span>
												<span>Į krepšelį</span>
											</button>
										</div>
									</figure>
								</article>
							</div>
						{/each}
					</div>
				</div>
			</section>
		</div>
	</div>
</main>

<style>
	.title {
		color: white;
		/* display: flex; */
	}
</style>
