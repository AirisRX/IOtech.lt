<svelte:head>
	<title>IOTech.lt - kompiuterių technikos parduotuvė</title>
</svelte:head>

<script>
    import 'bulma/css/bulma.min.css'

    let produktai = []

    async function getProducts() {
        try {
            const res = await fetch('http://localhost:5000/product/products?slug=nesiojami_kompiuteriai');
            const text = await res.text()
            // console.log(text)
            produktai = JSON.parse(text)
            console.log(produktai)
        } catch (err) {
            console.log(err)
        }
    }

    getProducts();
</script>

<main>

<section class="section level is-small">
  <div class="tile is-ancestor">
    <h1 class="tile is-4 title level-item ">Nauji produktai</h1>
    <div class="tile">
      {#each produktai as produktas}
        <div class="tile is-parent is-3">
            <article class="tile is-child notification is-info">
              <p class="title">{produktas["brand"]} {produktas["model"]}</p>
              <p class="subtitle">{produktas["cost"]}€</p>
              <figure class="image">
                <img src="{produktas["img"]}" alt="Produktas">
              </figure>
            </article>
          </div>
      {/each}
    </div>
  </div>
</section>

<hr>

<a href="mailto:airidas.rupsas@ku.lt">
    <div class="level">
        <div class="level-item">
            <img src="tikrainetas.jpg" alt="Reklama" title="Paspauskite, norint susisiekti" />
        </div>
    </div>
</a>

<hr>

<section class="section level is-small">
  <div class="tile is-ancestor">
    <h1 class="tile is-4 title level-item">Išpardavimai</h1>
    <div class="tile">
      {#each produktai as produktas}
        <div class="tile is-parent is-3">
            <article class="tile is-child notification is-info">
              <p class="title">{produktas["brand"]} {produktas["model"]}</p>
              <p class="subtitle">{produktas["cost"]}€</p>
              <figure class="image">
                <img src="{produktas["img"]}" alt="Produktas">
              </figure>
            </article>
          </div>
      {/each}
    </div>
  </div>
</section>

<hr>

<section class="section level is-small">
  <div class="tile is-ancestor">
    <h1 class="tile is-4 title level-item">Rekomenduojami</h1>
    <div class="tile">
      {#each produktai as produktas}
        <div class="tile is-parent is-3">
            <article class="tile is-child notification is-info">
              <p class="title">{produktas["brand"]} {produktas["model"]}</p>
              <p class="subtitle">{produktas["cost"]}€</p>
              <figure class="image">
                <img src="{produktas["img"]}" alt="Produktas">
              </figure>
            </article>
          </div>
      {/each}
    </div>
  </div>
</section>

<hr>

</main>

<style>

.title
{
    color: white;
    display: flex;
}

</style>