<script>
    import { writable } from "svelte/store";


    import Login from '$lib/login.svelte'
    import Register from '$lib/register.svelte'

    let selected_option = 0;

    function toggle(option) {
        if (selected_option == option) {
            selected_option = -1;
        } else selected_option = option;
    }
</script>

    <div class="box">
        
    <div class="tabs">
        <ul>
            <li class:is-active={selected_option == 0} on:click={() => toggle(0)}>
                <a>Login</a>
            </li>
            <li class:is-active={selected_option == 1} on:click="{() => toggle(1)}">
                <a>Register</a>
            </li>
        </ul>
        
        
    </div>
    {#if selected_option == 0}
        <Login/>
    {:else if selected_option == 1}
        <Register/>
    {/if}
    </div>
