<script lang="ts">
    import Logo from "./icons/Logo.svelte";
    import Account from "./icons/Account.svelte";
</script>

<header>
    <a href="/">
        <Logo />
    </a>
    <nav>
        <a href="/">
            <Account />
        </a>
    </nav>
</header>

<style lang="scss">
    header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 60px;
        /* subtle black shadow */
        box-shadow: 0 0 25px rgba(0, 0, 0, 0.4);
        padding: 1rem 2rem;
        margin-bottom: 20px;

        /* 
        position: sticky;
        top: 0;
        z-index: 100;
        */
    }
    nav, a {
        display: flex;
        align-items: center;
    }
</style>