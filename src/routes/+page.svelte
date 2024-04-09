<script lang="ts">
    import Claim from "$lib/components/Claim.svelte";

    export let data;
</script>

<div id="page">
    <div id="options">

    </div>
    <div id="feed">
        {#each data.claims as claim}
            <Claim
            id={claim.id} 
            title={claim.title} 
            creator={claim.creator.username} 
            description={claim.description} 
            rating={claim.rating} 
            />
        {/each}
    </div>

</div>


<style lang="scss">
    #page {
        display: grid;
        grid-template-columns: 20% 60% 20%;
        grid-template-rows: 100vh;
    }
</style>
