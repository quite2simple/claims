<script lang="ts">
	import { enhance } from "$app/forms";
    export let form;
</script>

<div class="auth-form">
    <h1>Log in</h1>
    <form method="post" use:enhance>
        <div id="#message">
            {#if form?.message}
            <p>{form.message}</p>
            {/if}
        </div>
        <div id="username">
            <label for="username">Username: </label>
            <input type="text" name="username" id="username"><br>
        </div>
        <div id="password">
            <label for="password">Password: </label>
            <input type="password" name="password" id="password"><br>
        </div>
        
        <button class="auth-button">Log in</button>
        <p>Don't have an account? <a href="/signup">Sign up</a></p>
    </form>
</div>

<style lang="scss">
    form {
        @include centered;
        gap: 1rem;
    }
</style>
