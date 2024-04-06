<script lang="ts">
    import Logo from "./Logo.svelte";
</script>

<header>
    <a href="/">
        <Logo />
    </a>
</header>

<style lang="scss">
    header {
        /* subtle black shadow */
        box-shadow: 0 0 25px rgba(0, 0, 0, 0.4);
        padding: 1rem;
        margin-bottom: 20px;

        /* 
        position: sticky;
        top: 0;
        z-index: 100;
        */
    }
</style>