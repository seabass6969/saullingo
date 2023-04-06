<script>
    export let active = false
    function genRandom(min, max) {
        return Math.random() * (max - min) + min;
    }
</script>
{#if active == true}
{#each Array.from(Array(25).keys()) as a}
    <span class="floating" style="top: {genRandom(10,80)}vh; left: {genRandom(10,80)}vw;">🥳</span>
{/each}
{/if}
<style>
    .floating {
        position: absolute;
        
    }
</style>