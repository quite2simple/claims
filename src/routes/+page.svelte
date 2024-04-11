<script lang="ts">
    import Claim from "$lib/components/Claim.svelte";
    import ClaimIcon from "$lib/components/icons/ClaimIcon.svelte";

    export let data;
</script>

<div id="page">
    <div id="options">
        <a href="/claims/create" class="nav-button" id="create-claim">
            <ClaimIcon/>
            <h3 id="create-claim-text">Claim!</h3>
        </a>
    </div>
    <div id="feed">
        {#each data.claims as claim}
            <Claim
            id={claim.id} 
            title={claim.title} 
            creator={claim.creator.username}
            createdAt={claim.createdAt} 
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
        @include vflex(1rem);
        padding-top: 1rem;
    }

    #create-claim {
        background-color: $background1;
    }
    #create-claim-text {
        font-size: $h2-size;
        font-weight: 700;
        color: $text;
        margin-left: 0.5rem;
    }
</style>
