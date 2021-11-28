<script>
    import 'bulma/css/bulma.css'
    import '@fortawesome/fontawesome-free/css/all.min.css'
    // import { createEventDispatcher } from 'svelte'

    // const dispatch = createEventDispatcher()


    // const name_regex = /^[ą-ža-zA-Z]+\ {0,1}[ą-ža-zA-Z]*$/

    let email;
    let password;
    let submit_message = null;

    async function login() {
        try {
            const res = await fetch('http://localhost:5000/auth/login', {
                method: 'POST',
                body: JSON.stringify({
                    email,
                    password
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }) 
            const { message } = JSON.parse(await res.text())
            if (res.status == 200) {
                submit_message = {
                    message,
                    success: true
                }
            } else {
                submit_message = {
                    message,
                    sucecss: false
                }
            }
        } catch (err) {
            console.log(err)
        }
    }
</script>

<div class="field">
	<label class="label">E-mail</label>
	<div class="control has-icons-right">
		<input class="input" type="email" bind:value={email} />
		<span class="icon is-small is-right">
			<i />
		</span>
	</div>
</div>

<div class="field">
	<label class="label">Password</label>
	<div class="control has-icons-right">
		<input class="input" type="password" bind:value={password} />
		<span class="icon is-small is-right">
			<i />
		</span>
	</div>
</div>

<div class="field">
	<div class="control">
		<button class="button is-success" on:click={login}>Submit</button>
	</div>
</div>
{#if submit_message}
	<p
		class="help"
		class:is-danger={!submit_message['success']}
		class:is-success={submit_message['success']}
	>
		{submit_message['message']}
	</p>
{/if}
