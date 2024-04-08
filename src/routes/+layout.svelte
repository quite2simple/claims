<script lang="ts">
    import '../app.scss';
    import Header from '$lib/components/Header.svelte';

    export let data;
</script>

<Header loggedIn={data.loggedIn} username={data.user?.username}/>
<main>
    <slot />
</main>
