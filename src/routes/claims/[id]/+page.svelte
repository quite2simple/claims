<script lang="ts">
    export let data;

    $: isYours = data.claim?.creator.id === data.user?.id;
</script>

<div id="claim">
    <h1>{data.claim?.title}</h1>
    <h3>By {data.claim?.creator.username} {#if isYours} (you){/if}</h3>
    <p>{data.claim?.description}</p>
    {#if data.sources}
        <p>Sources:</p>
        {#each data.sources as source}
            <a href="{source.url}">{source.url}</a>
        {/each}
    {:else}
        <p>No sources were provided</p>
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