<script lang="ts">
    import ClaimForm from '$lib/components/ClaimForm.svelte';
    export let form;
</script>

<svelte:head>
    <title>Create claim</title>
</svelte:head>

<ClaimForm message={form?.message}/>