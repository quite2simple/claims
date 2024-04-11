<script lang="ts">
    export let id = 0;
    export let title = "Claim title";
    export let creator = "By creator";
    export let createdAt = new Date();
    export let description = "Lorem ipsum dolor sit amet consectetur adipisicing elit.";
    export let rating = 1;
    // -1 - disapprove, 1 - approve, 0 - no reaction
    export let userReaction = 0;

    $: approveButtonStyle = (userReaction === 1) ? "button approve-active" : "button";
    $: disapproveButtonStyle = (userReaction === -1) ? "button disapprove-active" : "button";

    const setReaction = async (v: number) => {
        const oldUserReaction = userReaction;
        if (userReaction === v) {
            userReaction = 0;
            rating -= v;
            await deleteReaction();
            return;
        }
        else {
            userReaction = v;
        }
        const diff = userReaction - oldUserReaction;
        if (Math.abs(diff) === 2) {
            await updateReaction((v === 1) ? true : false);
        }
        else if (Math.abs(diff) === 1) {
            await addReaction((v === 1) ? true : false);
        }
        rating += diff;
    }

    const addReaction = async (approve: boolean) => {
        const responce = await fetch(`/claims/${id}/react`, {
            method: 'POST',
            body: JSON.stringify({approve}),
            headers: 
            {
                'Content-Type': 'application/json'
            }
        });
    }
    const updateReaction = async (approve: boolean) => {
        const responce = await fetch(`/claims/${id}/react`, {
            method: 'PUT',
            body: JSON.stringify({approve}),
            headers: 
            {
                'Content-Type': 'application/json'
            }
        });
    }
    const deleteReaction = async () => {
        const responce = await fetch(`/claims/${id}/react`, {
            method: 'DELETE'
        });
    }
</script>

<div class="claim">
    <div class="claim-header">
        <h2>{title}</h2>
        <h3>@{creator}  {createdAt.toLocaleString("en-US", 
        { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "numeric" })}</h3>
    </div>
    <p>{description}</p>
    <a href={"/claims/" + id} class="button read-full">Read full</a>
    <div class="claim-footer">
        <div class="claim-sources">
            <h4>1 source</h4>
        </div>
        <div class="claim-rating-actions">
            <button on:click={() => setReaction(1)} class={approveButtonStyle}>⇑</button>
            <button class="button">{rating}</button>
            <button on:click={() => setReaction(-1)} class={disapproveButtonStyle}>⇓</button>
        </div>
    </div>

</div>

<style lang="scss">
    .claim {
        background-color: $background2;
        padding: 5px 20px 20px;
        border-radius: 15px;
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
        @include hflex(5px);
    }
    .button {
        min-width: 30px;
    }
    .approve-active {
        background-color: $accent-green1;
        color: $background2;
    }
    .disapprove-active {
        background-color: $accent-red1;
        color: $background2;
    }

</style>