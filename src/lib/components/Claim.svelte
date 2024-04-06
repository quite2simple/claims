<script lang="ts">
    export let claimTitle = "Claim title";
    export let claimAuthor = "By author";
    export let claimBody = "Lorem ipsum dolor sit amet consectetur adipisicing elit.";
    export let claimRating = 1;
</script>

<div class="claim">
    <div class="claim-header">
        <h2>{claimTitle}</h2>
        <h3>By {claimAuthor}</h3>
    </div>
    <p>{claimBody}</p>
    <div class="claim-footer">
        <div class="claim-sources">
            <h4>1 source</h4>
        </div>
        <div class="claim-rating-actions">
            <button class="button">^</button>
            <button class="button">{claimRating}</button>
            <button class="button">v</button>
        </div>
    </div>
    <a href="/claims/1" class="button read-full">Read full</a>
</div>

<style lang="scss">
    .claim {
        background-color: $background2;
        padding: 20px;
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
        padding: 6px 15px;
        text-decoration: none;
        display: block;
        width: fit-content;
    }

</style>