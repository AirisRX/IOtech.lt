<script>
    import 'bulma/css/bulma.css'
    import '@fortawesome/fontawesome-free/css/all.min.css'
    // import { createEventDispatcher } from 'svelte'

    // const dispatch = createEventDispatcher()


    // const name_regex = /^[ą-ža-zA-Z]+\ {0,1}[ą-ža-zA-Z]*$/

    let email;
    let password;

    async function login() {
        
    }    
</script>

<div class="field">
    <label class="label">E-mail</label>
    <div class="control has-icons-right">
      <input class="input" type="email" bind:value={email}>
      <span class="icon is-small is-right">
          <i></i>
      </span>
    </div>
  </div>

  <div class="field">
    <label class="label">Password</label>
    <div class="control has-icons-right">
      <input class="input" type="password" bind:value={password}>
      <span class="icon is-small is-right" >
        <i></i>
    </span>
    </div>
  </div>
  
<div class="field is-grouped">
    <div class="control">
      <button class="button is-success" on:click="{login}">Submit</button>
    </div>
    <div class="control">
      <button class="button is-danger is-light" >Cancel</button>
    </div>
  </div>

