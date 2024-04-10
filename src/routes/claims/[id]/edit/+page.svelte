<script lang="ts">
    import ClaimForm from '$lib/components/ClaimForm.svelte';
    export let data;
    export let form;
</script>

<svelte:head>
    <title>Edit claim</title>
</svelte:head>

<ClaimForm 
    editTitle={data.claim?.title} 
    editDescription={data.claim?.description}
    editSources={data.sources.map(source => source.url)}
    editId={data.claim?.id} 
    message={form?.message}
/>