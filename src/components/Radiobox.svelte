<script lang="ts">
export let choice:string
export let option:string[]
let checkingBox = (ops) => {
    choice = ops
}
</script>
<div>
{#each option as op}
    <button on:click={() => {checkingBox(op)}}><span class="material-symbols-outlined">
{#if op == choice}
radio_button_checked
{:else}
radio_button_unchecked
{/if}
</span> {op}</button>
{/each}
</div>
