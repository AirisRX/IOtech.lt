<script context="module">
 export async function load({session}) {
        if (!session.account) return {
            status: 401,
            error: "Unauthorised"
        }
        return {
            props: {
                account: session.account
            }
        }
    }
</script>

<script>
    export let account;
</script>

<main>
    <div class="container">
    <div class="box" style="background-color: rgba(0, 0, 0, 0.6); border-radius: 10px; margin-top: 15px;">

        <section class="section">
            <h1 class="title">Profilis</h1>
            <div class="columns">
                <div class="column">
                    <div class="card">
                        <div class="card-content">
                          <div class="media">
                            <div class="media-left">
                              <figure class="image">
                                <i class="fas fa-user"></i>
                              </figure>
                            </div>
                            <div class="media-content">
                              <p class="title is-5 user">{account.name}</p>
                              <p class="subtitle is-6">{account.email}</p>
                            </div>
                          </div>
                      
                          <div class="content">
                            
                          </div>
                        </div>
                      </div>
                </div>
                <div class="column">
                  <h1 class="title">Nustatymai:</h1>
              </div>
        </section>
</div>
</div>

</main>

<style>

.title
{
    color: white;
}

.user
{
    color: grey;
}

</style>