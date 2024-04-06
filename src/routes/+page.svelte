<script lang="ts">
    import Claim from "$lib/components/Claim.svelte";
</script>

<div id="page">
    <div id="options">

    </div>
    <div id="feed">
        <h1>Welcome to SvelteKit</h1>
        <p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
        <a href="/">hi</a>
        <Claim />
    </div>

</div>


<style lang="scss">
    #page {
        display: grid;
        grid-template-columns: 20% 60% 20%;
        grid-template-rows: 100vh;
    }
</style>
