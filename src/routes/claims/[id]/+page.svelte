<script lang="ts">
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
    <h1>{data.claim?.title}</h1>
    <h3>By {data.claim?.creator.username} {#if isYours} (you){/if}</h3>
    <p>{data.claim?.description}</p>
    {#if data.sources}
        <p>Sources:</p>
        {#each data.sources as source}
            <a href="{source.url}">{source.url}</a><br>
        {/each}
    {:else}
        <p>No sources were provided</p>
    {/if}
    {#if isYours}
        <button on:click={onDelete}>Delete</button>
        {#if deleteMessage}
            <p>{deleteMessage}</p>
        {/if}
    {/if}
    


</div>

<style lang="scss">
    #claim {
        width: 80%;
        margin: 0 auto;
        padding: 1rem;
        background-color: $background2;
        border-radius: 2rem;
    }
</style>