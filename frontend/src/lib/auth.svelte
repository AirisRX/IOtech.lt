<script>
    import Login from '$lib/login.svelte'
    import Register from '$lib/register.svelte'

    import { Tabs, TabView, Tab, TabList } from './tabs.js';
</script>

    <div class="box">
        <Tabs>
            <TabList>
                <Tab>Prisijungti</Tab>
                <Tab>Registruotis</Tab>
            </TabList>

            <TabView>
                <Login/>
            </TabView>

            <TabView>
                <Register/>
            </TabView> 
        </Tabs>
    </div>