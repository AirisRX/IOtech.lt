<script>
	import 'bulma/css/bulma.css';
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
		console.log('veikia ar neveikia stai kur klausimas');
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

<main>
	<div class="container">
		{#if notification}
			<div>
				<div class="notification has-background-white has-text-primary has-text-weight-bold">
					<p>{notification}</p>
				</div>
			</div>
		{/if}
	</div>

	<!-- {produktai as produktas} -->
	<div
		class="box container"
		style="background-color: rgba(0, 0, 0, 0.6); border-radius: 10px; margin-top: 15px; outline: solid; outline-width: 2px; outline-color: blue;"
	>
		<section>
			<h1 class="title">Filtras</h1>
			<div class="columns">
				<div class="column">
					Prekių kaina:
					<input
						class="slider is-fullwidth is-success"
						step="1"
						min="0"
						max="100"
						value="50"
						type="range"
					/>
					<!-- <input class="slider is-fullwidth is-success" step="1" min={produktas['cost']} max={produktas['cost']} value="50" type="range"> -->
				</div>
				<div class="column">
          <div class="columns">
            <div class="column has-text-centered">
          Gamintojas:
          {#each produktai as produktas}
          <p class="product">{produktas['brand']}</p>
          <input type="checkbox"/>
          {/each}
          </div>
          
        </div>
			</div>
		</section>
	</div>
	<!-- {/as} -->

	<div class="container">
		<div
			class="box"
			style="background-color: rgba(0, 0, 0, 0.6); border-radius: 10px; margin-top: 15px;"
		>
			<section class="section level is-small">
				<div class="tile is-ancestor">
					<div class="tile">
						{#each produktai as produktas}
							<div class="tile is-parent is-3">
								<article class="tile is-child notification is-info" style="padding-right: 24px;">
									<p class="title">{produktas['brand']} {produktas['model']}</p>
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
		padding-bottom: 30px;
	}
	.columns {
		color: white;
	}
</style>
