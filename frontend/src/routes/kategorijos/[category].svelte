<script context="module">
	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ page, fetch }) {
		// console.log(page.params.category);

		const url = `http://localhost:5000/product/products?slug=${page.params.category}`;
		console.log(url);
		const res = await fetch(url);

		if (res.ok) {
			return {
				props: {
					produktai: await res.json()
				}
			}
		}
		
		return {
			status: res.status,
			error: new Error(`Could not load ${url}`)
		};
	}
</script>

<script>
	import 'bulma/css/bulma.css';
	import 'bulma/css/bulma.min.css'

	export let produktai;

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
		}, 2000);
	}

	console.log()
	console.log()

	let nuo_kaina = Math.min.apply(Math, produktai.map(function(o) { return o.cost }));
	let iki_kaina = Math.max.apply(Math, produktai.map(function(o) { return o.cost }));

</script>

<main>

		{#if notification}
		<div
			class="notification has-background-white has-text-primary has-text-weight-bold"
			style="position: fixed; top: 15px; left: 15px; display:inline-block; margin-top: 75px; z-index: 10;"
		>
			<p>{notification}</p>
		</div>
{/if}



	<!-- {produktai as produktas} -->
	<div
		class="box container"
		style="background-color: rgba(0, 0, 0, 0.6); border-radius: 10px; margin-top: 15px; outline: solid; outline-width: 2px; outline-color: blue;"
	>
		<section>
			<h1 class="title">Filtras</h1>
			<div class="columns">
				<div class="column">
					Prekių kaina (€):
					<!-- <input
						class="slider is-fullwidth is-success"
						step="1"
						min="0"
						max="100"
						value="50"
						type="range"
					/> -->
					<div>
						<div style="display: inline-block;">
							<p>Nuo</p>
							<input class="slider is-fullwidth is-success" step="50" bind:value={nuo_kaina} min={Math.min.apply(Math, produktai.map(function(o) { return o.cost }))} max={Math.max.apply(Math, produktai.map(function(o) { return o.cost }))} type="number">
						</div>

						<div style="display: inline-block;">
							<p>Iki</p>
							<input class="slider is-fullwidth is-success" step="50" bind:value={iki_kaina} min={Math.min.apply(Math, produktai.map(function(o) { return o.cost }))} max={Math.max.apply(Math, produktai.map(function(o) { return o.cost }))} type="number">
						</div>
					</div>
				</div>
				<div class="column">
          <div class="columns">
            <div class="column has-text-centered">
          Gamintojas:
		  <div>
          {#each produktai.filter((value, index, self) => index === self.findIndex((t) => (
			t.brand === value.brand
		  ))) as produktas}
			
			<div class="is-inline-block">
				<p class="product p-1">{produktas['brand']}</p>
				<input type="checkbox"/>
			</div> 
		  
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
									<a class="title" style="height: 100px; display:inline-block;" href="/produktai/{produktas['id']}">{produktas['brand']} {produktas['model']}</a>
									<figure class="image">
										<a href="/produktai/{produktas['id']}">
										<img src={produktas['img']} alt="Produktas" style="border-radius: 5px;" />
										</a>
										<div class="columns">
											<div class="column">
												<p class="subtitle">{produktas['cost']}€</p>
											</div>
											<span on:click={() => toggleNotification('Jūsų prekė buvo pridėta į krepšelį.')}>
												<button class="button is-primary is-rounded">
													<span class="icon is-left"><i class="fas fa-shopping-bag" /></span>
													<span>Į krepšelį</span>
												</button>
											</span>
										</div>
									</figure>
								</article>
							</div>
						{:else}
						<p style="color: white;">Šiuo metu produktų nėra. Pabandykite vėliau.</p>
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
