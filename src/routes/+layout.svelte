<script lang="ts">
    import '../app.scss';
    import Header from '$lib/components/Header.svelte';
</script>

<header>
    <Header />
</header>
<main>
    <slot />
</main>
