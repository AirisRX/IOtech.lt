<script context="module">

    /** @type {import('@sveltejs/kit').Load} */
    export async function load({page, fetch}) {
        const url = `http://localhost:5000/product/productinfo?pid=${page.params.product}`
        console.log(url)

        const res = await fetch(url);

        if (res.ok) {
            return {
                props: {
                    produkto_info: await res.json()
                }
            }
        }

        return {
            status: res.status,
            error: new Error(`Could not load ${url}`)
        }
    }
</script>

<script>
    import 'bulma/css/bulma.min.css';
    import Attribute from '$lib/attribute.svelte'

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

    export let produkto_info;

    console.log(produkto_info)
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

        <div class="columns">

            <div class="column">
                <p class="bd-notification is-info">
                <figure class="image" style="width: 512px; height: 512px;">
                    <img src="{produkto_info['img']}" alt="Produktas" style="border-radius: 5px;"/>
                </figure>
            </div>

            <div class="column">
                <h1 class="title" style="margin-bottom: 50px;">
                    {produkto_info['brand']} {produkto_info['model']}
                </h1>
                <div class="columns is-mobile">
                    <div class="column is-half">
                        <p class="bd-notification is-danger">Specifikacijos:</p>
                        <Attribute attrs="{produkto_info['attrs']}"/>
                    </div>
                    <div class="column">
                        <p class="bd-notification is-danger">Kaina:
                            {produkto_info['cost']}€
                        </p>
                    </div>
                    <span on:click={() => toggleNotification('Jūsų prekė buvo pridėta į krepšelį.')}>
                  <button class="button is-primary is-rounded">
                    <span class="icon is-left"><i class="fas fa-shopping-bag"/></span>
                    <span>Į krepšelį</span>
                  </button>
                </span>
                </div>
            </div>
        </div>

    </div>
</main>

<style>

    .column {
        color: white;
    }

    .title {
        color: white;
    }

</style>