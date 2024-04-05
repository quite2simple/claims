<script lang="ts">
	import { enhance } from "$app/forms";
    export let form;
</script>

<h1>Log in</h1>
<form method="post" use:enhance>
    {#if form?.message}
    <p>{form.message}</p>
    {/if}
    <label for="username">Username: </label>
    <input type="text" name="username" id="username"><br>
    <label for="password">Password: </label>
    <input type="password" name="password" id="password"><br>
    <button>Sign in</button>
    <p>Don't have an account? <a href="/signup">Sign up</a></p>
</form>