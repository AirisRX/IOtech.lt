<script>
    import 'bulma/css/bulma.css'
    import '@fortawesome/fontawesome-free/css/all.min.css'
    import { createEventDispatcher } from 'svelte'

    const dispatch = createEventDispatcher()

    const email_regex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
    // const name_regex = /^[ą-ža-zA-Z]+\ {0,1}[ą-ža-zA-Z]*$/

    let name;
    let email;
    let password;
    let confirm_password;
    let passwords_match = true
    let registered = false

    let email_problem = null

    async function validateEmail() {
        if (!email) email_problem = null;
        else if (!!!email.match(email_regex)) {
            email_problem = "Invalid email"
        } else email_problem = await validateEmailExistence()
    }

    async function validateEmailExistence() {
        try {
            const res = await fetch('http://localhost:5000/auth/email', {
                method: 'POST',
                body: JSON.stringify({
                    email,
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const {message, exists} = JSON.parse(await res.text())
            if (!res.ok || !exists) {
                console.log(message)
                return message
            } else return null;
        } catch(err) {
            console.log(err)
        }
    }

    function validatePasswords() {
        passwords_match = (password == confirm_password)
        return passwords_match
    }

    async function register() {
        error = false

        error = undefined
        console.log('xd')
        try {
            const res = await fetch(':5000/auth/register', {
                method: 'POST',
                body: JSON.stringify({
                    email,
                    password,
                    name
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (res.ok) {
                dispatch('success')
                registered = true
            } else {
                error = 'An error occured'
            }
        } catch(err) {
            console.log(err)
            error = 'An error occured'
        }
    }    
</script>

{#if !registered}
<div class="field">
    <label class="label">Name</label>
    <div class="control has-icons-right">
      <input class="input" type="text" bind:value="{name}">
      <span class="icon is-small is-right">
          <i class="fas"></i>
      </span>
    </div>
  </div>
  <!-- {#if name_problem}
  <p class="help is-danger">{name_problem}</p>
  {/if} -->

<div class="field">
    <label class="label">E-mail</label>
    <div class="control has-icons-right">
      <input required class="input" class:is-danger={email_problem} type="email" bind:value={email} on:input={validateEmail}>
      <span class="icon is-small is-right">
          <i></i>
      </span>
    </div>
  </div>
  {#if email_problem}
  <p class="help is-danger">{email_problem}</p>
  {/if}

  <div class="field">
    <label class="label">Password</label>
    <div class="control has-icons-right">
      <input required class="input" class:is-danger={!passwords_match} type="password" bind:value={password} on:input={validatePasswords}>
      <span class="icon is-small is-right" >
        <i></i>
    </span>
    </div>
  </div>
  

  <div class="field">
    <label class="label">Confirm Password</label>
    <div class="control has-icons-right">
      <input required class="input" class:is-danger={!passwords_match} type="password" bind:value={confirm_password} on:input={validatePasswords}>
      <span class="icon is-small is-right has-text-warning">
          <i></i>
      </span>
    </div>
  </div>
  {#if !passwords_match}
  <p class="help is-danger">Passwords do not match</p>
  {/if}
  
<div class="field is-grouped">
    <div class="control">
      <button class="button is-success" on:click="{register}">Submit</button>
    </div>
    <div class="control">
      <button class="button is-danger is-light" >Cancel</button>
    </div>
  </div>
{:else}
<div class="content">
    <p>Registered successfully, please proceed to log in.</p>
</div>
{/if}
