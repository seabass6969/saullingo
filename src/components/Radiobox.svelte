<script lang="ts">
export let choice:string
export let option:string[]

</script>
<div>
{#each option as op}
    <button on:click={() => {choice = op}}>{op}</button>
{/each}
</div>
