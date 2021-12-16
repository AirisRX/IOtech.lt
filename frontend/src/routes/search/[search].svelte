<script context="module">
	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ page, fetch }) {
		// console.log(page.params.category);

		const url = `http://localhost:5000/product/products?name=${page.params.search}`;
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
    export let produktai;

    let notification;

function toggleNotification(text) {
    if (notification) {
        notification = null;
        return;
    }
    notification = text;
    setInterval(() => {
        notification = null;
    }, 2000);
}
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

    <div class="box container" style="background-color: rgba(0, 0, 0, 0.6); border-radius: 10px; margin-top: 15px;">
        <h1 class="title">Paieška</h1>

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
						<p style="color: white;">Produktų pagal jūsų paklausa nerasta. Bandykite dar kartą.</p>
                    {/each}
                </div>
            </div>
        </section>
    </div>

</main>

<style>
    .title
    {
        color: white;
    }
</style>