<script lang="ts">
    import ClaimForm from '$lib/components/ClaimForm.svelte';
    export let form;
</script>

<ClaimForm message={form?.message}/>