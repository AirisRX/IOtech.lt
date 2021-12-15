<script>
	import 'bulma/css/bulma.min.css';

	let produktai = [];

	async function getProducts() {
		try {
			const res = await fetch('http://localhost:5000/product/products?slug=nesiojami_kompiuteriai');
			const text = await res.text();
			produktai = JSON.parse(text);
			console.log(produktai);
		} catch (err) {
			console.log(err);
		}
	}

	getProducts();

	let notification;

	function toggleNotification(text) {
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

<main>
	{#if notification}
			<div
				class="notification has-background-white has-text-primary has-text-weight-bold"
				style="position: fixed; top: 15px; left: 15px; display:inline-block; margin-top: 75px;"
			>
				<p>{notification}</p>
			</div>
	{/if}

	<div class="container">
		<div
			class="box"
			style="background-color: rgba(0, 0, 0, 0.6); border-radius: 10px; margin-top: 15px;"
		>
			<h1 class="title" style="padding-top: 10px;">Nauji produktai</h1>
			<section class="section level is-small">
				<div class="tile is-ancestor">
					<div class="tile">
						{#each produktai as produktas}
							<div class="tile is-parent is-3">
								<article class="tile is-child notification is-info" style="padding-right: 24px;">
									<p class="title" style="height: 100px;">{produktas['brand']} {produktas['model']}</p>
									<figure class="image">
										<img src={produktas['img']} alt="Produktas" style="border-radius: 5px;" />
										<div class="columns">
											<div class="column">
												<p class="subtitle">{produktas['cost']}€</p>
											</div>
											<button class="button is-primary is-rounded">
												<span class="icon is-left"><i class="fas fa-shopping-bag" /></span>
												<span
													on:click={() => toggleNotification('Jūsų prekė buvo pridėta į krepšelį.')}
													>Į krepšelį</span
												>
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
								<article class="tile is-child notification is-info" style="padding-right: 24px;">
									<p class="title" style="height: 100px;">{produktas['brand']} {produktas['model']}</p>
									<figure class="image">
										<img src={produktas['img']} alt="Produktas" style="border-radius: 5px;" />
										<div class="columns">
											<div class="column">
												<p class="subtitle">{produktas['cost']}€</p>
											</div>
											<button class="button is-primary is-rounded">
												<span class="icon is-left"><i class="fas fa-shopping-bag" /></span>
												<span
													on:click={() => toggleNotification('Jūsų prekė buvo pridėta į krepšelį.')}
													>Į krepšelį</span
												>
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
								<article class="tile is-child notification is-info" style="padding-right: 24px;">
									<p class="title" style="height: 100px;">{produktas['brand']} {produktas['model']}</p>
									<figure class="image">
										<img src={produktas['img']} alt="Produktas" style="border-radius: 5px;" />
										<div class="columns">
											<div class="column">
												<p class="subtitle">{produktas['cost']}€</p>
											</div>
											<button class="button is-primary is-rounded">
												<span class="icon is-left"><i class="fas fa-shopping-bag" /></span>
												<span
													on:click={() => toggleNotification('Jūsų prekė buvo pridėta į krepšelį.')}
													>Į krepšelį</span
												>
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
	}
</style>
