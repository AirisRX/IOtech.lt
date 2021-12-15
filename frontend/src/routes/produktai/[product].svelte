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

<main>
	{#if notification}
			<div
				class="notification has-background-white has-text-primary has-text-weight-bold"
				style="position: fixed; top: 15px; left: 15px; display:inline-block; margin-top: 75px;"
			>
				<p>{notification}</p>
			</div>
	{/if}

    <div class="box container" style="background-color: rgba(0, 0, 0, 0.6); border-radius: 10px; margin-top: 15px;">

        <div class="columns">

            <div class="column">
              <p class="bd-notification is-info">
                <figure class="image" style="width: 512px; height: 512px;">
                    {#if produktai[0]}
                    <img src="{produktai[0]['img']}" alt="Produktas" style="border-radius: 5px;" />
                    {/if}
                  </figure>
              </p>
            </div>

            <div class="column">
              <h1 class="title" style="margin-bottom: 50px;">
                  {#if produktai[0]}
                {produktai[0]['brand']} {produktai[0]['model']}
                {/if}
              </h1>
              <div class="columns is-mobile">
                <div class="column is-half">
                  <p class="bd-notification is-danger">Specifikacijos:</p>
                </div>
                <div class="column">
                  <p class="bd-notification is-danger">Kaina:
                    {#if produktai[0]}
                    {produktai[0]['cost']}€
                    {/if}
                  </p>
                </div>
                <button class="button is-primary is-rounded">
                    <span class="icon is-left"><i class="fas fa-shopping-bag" /></span>
                    <span
                        on:click={() => toggleNotification('Jūsų prekė buvo pridėta į krepšelį.')}
                        >Į krepšelį</span
                    >
                </button>
              </div>
            </div>
          </div>

    </div>
</main>

<style>

.column
{
    color: white;
}

.title
{
    color: white;
}

</style>