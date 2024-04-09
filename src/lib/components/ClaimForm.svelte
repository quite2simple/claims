<script lang="ts">
    import { enhance } from "$app/forms";

    let sources = [
        {
            i: 0,
            value: "example.com"
        }
    ];

    $: sourcesStr = sources.map(source => source.value).join(", ");

    const addSource = () => {
        sources = [...sources, {
            i: sources.length,
            value: "example.com"
        }]
    };

    const removeSource = (i: number) => {
        sources = sources.filter(source => source.i !== i);
    };

    const editSource = (i: number, value: string) => {
        sources = sources.map(source => source.i === i ? {i, value} : source);
    };

    const handleSourceEdit = (i: number, e: EventTarget | null) => {
        const target = e as HTMLInputElement;
        editSource(i, target.value);
    }

    export let message: string | undefined;
    
</script>

<form method="post" class="claim-form" use:enhance>
    {#if message}
        <p>{message}</p>
    {/if}
    <div class="form-field">
        <label for="title">Title: </label>
        <input type="text" name="title" id="title" required><br>
    </div>
    <div class="form-field">
        <label for="description">Description: </label><br>
        <textarea name="description" id="description" cols="30" rows="10" required></textarea><br>
    </div>
    <div class="form-field">
        <div id="sources">
            {#each sources as source (source.i)}
            <div class="source-input">
                <input type="text"
                on:input={e => handleSourceEdit(source.i, e.target)}
                placeholder="example.com"
                >
                <button on:click|preventDefault={() => removeSource(source.i)}>Remove</button>
            </div>
                
            {/each}
            <button on:click|preventDefault={addSource}>Add source</button>
        </div>
    </div>
    <input type="hidden" bind:value={sourcesStr} name="sources">
    <button>Submit</button>
    

</form>

<style lang="scss">
    .source-input {
        display: flex;
        gap: 1rem;
    }
</style>