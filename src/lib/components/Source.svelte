<script lang="ts">
    export let url: string;
</script>

<div class="source">
    <a class="source-url" href={url}><h4>{url}</h4></a>
    <h4>Not reviewed</h4>
</div>

<style lang="scss">
    .source {
        display: flex;
        align-items: center;
        margin: 1rem 0;
    }
    .source-url {
        text-decoration: none;
        background-color: $secondary;
        color: $text;
        padding: 0.25rem 1rem;
        margin-right: 1.5rem;
        border-radius: 5px;
    }
</style>