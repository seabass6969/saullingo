<script lang="ts">
export let choice:string
export let option:string[]
let checkingBox = (ops) => {
    choice = ops
}
</script>
<div class="radioboxe">
{#each option as op}
    <button on:click={() => {checkingBox(op)}} class="buttons"><span class="material-symbols-outlined">
{#if op == choice}
radio_button_checked
{:else}
radio_button_unchecked
{/if}
</span> {op}</button>
{/each}
</div>

<style lang="scss">
    .radioboxe {
        margin-left: 10vw;
        display: grid;
        grid-template-columns: auto;
        margin-right: 10vw;
    }
    .buttons{
        padding: 5px;
        margin: 1px;
        display: flex;
        justify-content: left;
        border-style: solid;
        border-color: $base-color;
    }
</style>