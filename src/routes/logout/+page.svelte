<script lang="ts">
	import { enhance } from "$app/forms";
</script>

<svelte:head>
    <title>Log in</title>
</svelte:head>

<form method="post" use:enhance>
    <button class="auth-button negative-button">Sign out</button>
</form>