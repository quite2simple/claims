<script lang="ts">
    import { onMount, beforeUpdate } from "svelte";
    import { enhance } from "$app/forms";
    import Source from "$lib/components/Source.svelte";

    export let data;
    
    let deleteMessage: string | null = null;

    $: isYours = data.claim?.creator.id === data.user?.id;
    $: modOthersButton = data.canModify && !isYours ? "mod-button" : "";
    let verificationStatus: string;

    onMount(() => {
        verificationStatus = data.verified === true ? "verified" : data.verified === false ? "refuted" : "none";
    });


    const onDelete = async () => {
        const answer = confirm("Are you sure you want to delete this claim?");
        if (answer) {
            const responce = await fetch("/claims/" + data.claim?.id, {
                method: "DELETE"
            });
            const res = await responce.json();
            console.log(res);
            deleteMessage = res.message;
        }
    };

    const onChangeVerificationStatus = async (v: boolean | null) => {
        const responce = await fetch("/claims/" + data.claim?.id, {
            method: "PUT",
            body: JSON.stringify({verificationStatus: v}),
        })
    }
</script>

<svelte:head>
    <title>{data.claim?.title}</title>
</svelte:head>

<div id="claim">
    <div id="title-creator">
        <h1>{data.claim?.title}</h1>
        <h3>By {data.claim?.creator.username} {#if isYours} (you){/if}</h3>
    </div>
    <div id="description">
        <p>{data.claim?.description}</p>
    </div>
    <div id="sources">
        {#if data.sources}
            <p>Sources:</p>
            {#each data.sources as source}
                <Source url={source.url} />
            {/each}
        {:else}
            <p>No sources were provided</p>
        {/if}
    </div>
    <div id="actions">
        {#if data.canModify}
            {#if deleteMessage}
                <p>{deleteMessage}</p>
            {/if}
            <a href="/claims/{data.claim?.id}/edit" class={`nav-button ${modOthersButton}`}>Edit</a>
            <button on:click={onDelete} class={`negative-button ${modOthersButton}`}>Delete</button>
            {#if !isYours}
            <form action="?/verify" method="POST" use:enhance>
                <p>Choose a verification status: </p>
                <div>
                    
                    <input type="radio" id="verified" name="verification" value="verified" 
                    bind:group={verificationStatus}>
                    <label for="verified">Verified</label>
                </div>
                <div>  
                    <input type="radio" id="none" name="verification" value="none" 
                    bind:group={verificationStatus}>
                    <label for="none">Not reviewed</label>
                </div>
                <div>
                    <input type="radio" id="refuted" name="verification" value="refuted" 
                    bind:group={verificationStatus}>
                    <label for="refuted">Refuted</label>
                </div>
                <button class="mod-button">Set verification status to {verificationStatus}</button>
            </form>

            {/if}
        {/if}
    </div>

    


</div>

<style lang="scss">
    #claim {
        @include vflex(2rem);
        width: 80%;
        margin: 0 auto;
        padding: 1rem;
        background-color: $background2;
        border-radius: 2rem;
    }

    #actions {
        @include vflex(1rem);
    }
</style>