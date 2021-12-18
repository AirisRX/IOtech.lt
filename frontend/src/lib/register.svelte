<script>
    import 'bulma/css/bulma.css'
    import '@fortawesome/fontawesome-free/css/all.min.css'

    // eslint-disable-next-line no-control-regex
    const email_regex = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/i
    // const name_regex = /^[ą-ža-zA-Z]+\ {0,1}[ą-ža-zA-Z]*$/

    let name;
    let email;
    let password;
    let confirm_password;
    let passwords_match = true
    let submit_message = null
    let problem = null

    async function validateEmail() {
        if (!email.match(email_regex)) {
            problem = {message: "Netinkamas el. pašto adresas", field: "email"}
            return false;
        } else {
            problem = null
            return true;
        }
    }

    function validatePasswords() {
        passwords_match = (password === confirm_password)
        return passwords_match
    }

    async function register() {

        if (!name) {
            problem = {message: "Prašome užpildyti jūsų vardą", field: "name"}
            return;
        }

        if (!email) {
            problem = {message: "Prašome užpildyti el. pašto adresą", field: "email"}
            return;
        }

        if (!await validateEmail()) {
            return;
        }

        if (!password) {
            problem = {message: "Prašome užpildyti slaptažodį", field: "password"}
            return;
        }

        problem = null;

        try {
            const res = await fetch('http://localhost:5000/auth/register', {
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
            const {message, session_id} = JSON.parse(await res.text())
            if (res.status === 200) {
                document.cookie = `session_id=${session_id}`
                submit_message = {
                    message,
                    success: true
                }
            } else {
                submit_message = null;

                problem = {
                    message,
                    field: "email"
                }
            }
            console.log(submit_message)
        } catch (err) {
            console.log(err)
        }
    }
</script>


<div class="field">
    <label class="label">Vardas:</label>
    <div class="control has-icons-right">
        <input class="input" type="text" class:is-danger={problem && problem["field"] == "name"} bind:value="{name}">
        <span class="icon is-small is-right">
          <i class="fas"></i>
      </span>
    </div>
</div>
{#if problem && problem["field"] == "name"}
    <p class="help is-danger">{problem["message"]}</p>
{/if}
<!-- {#if name_problem}
<p class="help is-danger">{name_problem}</p>
{/if} -->

<div class="field">
    <label class="label">El. pašto adresas:</label>
    <div class="control has-icons-right">
        <input class="input" class:is-danger={problem && problem["field"] == "email"} type="email" bind:value={email}
               on:input={validateEmail}>
        <span class="icon is-small is-right">
          <i></i>
      </span>
    </div>
</div>
{#if problem && problem["field"] == "email"}
    <p class="help is-danger">{problem["message"]}</p>
{/if}

<div class="field">
    <label class="label">Slaptažodis:</label>
    <div class="control has-icons-right">
        <input class="input" class:is-danger={!passwords_match || problem && problem["field"] == "password"}
               type="password" bind:value={password} on:input={validatePasswords}>
        <span class="icon is-small is-right">
        <i></i>
    </span>
    </div>
</div>
{#if problem && problem["field"] == "password"}
    <p class="help is-danger">{problem["message"]}</p>
{/if}

<div class="field">
    <label class="label">Pakartokite slaptažodį:</label>
    <div class="control has-icons-right">
        <input class="input" class:is-danger={!passwords_match} type="password" bind:value={confirm_password}
               on:input={validatePasswords}>
        <span class="icon is-small is-right has-text-warning">
          <i></i>
      </span>
    </div>
</div>
{#if !passwords_match}
    <p class="help is-danger">Slaptažodžiai nesutampa</p>
{/if}

<div class="field">
    <div class="control">
        <button class="button is-success" on:click="{register}">Registruotis</button>
    </div>
</div>
{#if submit_message}
    <p class="help" class:is-danger="{!submit_message['success']}"
       class:is-success="{submit_message['success']}">{submit_message['message']}</p>
{/if}