<script lang="ts">
    export let id = 0;
    export let title = "Claim title";
    export let creator = "By creator";
    export let description = "Lorem ipsum dolor sit amet consectetur adipisicing elit.";
    export let rating = 1;
</script>

<div class="claim">
    <div class="claim-header">
        <h2>{title}</h2>
        <h3>By {creator}</h3>
    </div>
    <p>{description}</p>
    <a href={"/claims/" + id} class="button read-full">Read full</a>
    <div class="claim-footer">
        <div class="claim-sources">
            <h4>1 source</h4>
        </div>
        <div class="claim-rating-actions">
            <button class="button">⇑</button>
            <button class="button">{rating}</button>
            <button class="button">⇓</button>
        </div>
    </div>

</div>

<style lang="scss">
    .claim {
        background-color: $background2;
        padding: 5px 20px 20px;
        border-radius: 15px;
        margin: 10px 0;
    }
    .claim-footer {
        /* Horizontal flexbox with children on the opposite ends of the div */
        margin-top: 2rem;
        display: flex;
        justify-content: space-between;
        align-items: end;
    }
    .read-full {
        font-weight: 700;
        margin-top: 1rem;
        padding: 6px 15px 0 0;
        text-decoration: none;
        display: block;
        width: fit-content;
    }
    .claim-rating-actions {
        display: flex;
        gap: 5px;
    }
    .button {
        min-width: 20px;
    }

</style>