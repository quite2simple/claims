<script lang="ts">
    export let data;

    $: user = data.user;
    $: createdAt = user?.createdAt.toLocaleString("en-US", 
    { month: "long", day: "numeric", year: "numeric" });
</script>

<div id="me">
    <span class="wip-placeholder">This is a prototype page. It will be reworked in the future</span>
    <h1>@{user?.username}</h1>
    <p>id: {user?.id}</p>
    <p>Created at: {createdAt}</p>
    <p>Roles:</p>
    <!-- <ul>
        {#each user?.roles as role}
            <li>{role}</li>
        {/each}
    </ul> -->
    <span class="wip-placeholder">Can't display roles yet. Coming soon!</span>
    <p>
        {#if user?.verified}
            Verified
        {:else}
            Not verified
        {/if}
    </p>
    <p>
        {#if user?.muted}
            Muted
        {:else}
            Not muted
        {/if}
    </p>

    <a href="/logout">Log out</a>
   

</div>

<style lang="scss">
    #me {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        width: 80%;
        margin: 0 auto;
    }
</style>