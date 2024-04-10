<script lang="ts">
    import Claim from "$lib/components/Claim.svelte";

    export let data;
</script>

<div id="page">
    <div id="options">
        <a href="/claims/create" class="nav-button positive-button">Create a claim!</a>
    </div>
    <div id="feed">
        {#each data.claims as claim}
            <Claim
            id={claim.id} 
            title={claim.title} 
            creator={claim.creator.username} 
            description={claim.description} 
            rating={claim.rating}
            userReaction={claim.reaction} 
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
    #options {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 1rem;
    }

    #feed {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding-top: 1rem;
    }
</style>
