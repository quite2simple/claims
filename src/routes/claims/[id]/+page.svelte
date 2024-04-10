<script lang="ts">
    import Source from "$lib/components/Source.svelte";

    export let data;
    
    let deleteMessage: string | null = null;

    $: isYours = data.claim?.creator.id === data.user?.id;

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
</script>

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
        {#if isYours}
            {#if deleteMessage}
                <p>{deleteMessage}</p>
            {/if}
            <a href="/claims/{data.claim?.id}/edit" class="nav-button">Edit</a>
            <button on:click={onDelete} class="negative-button">Delete</button>
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