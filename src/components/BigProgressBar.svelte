<script lang="ts">
	   import { slide } from "svelte/transition"
    export let progressFloat:number
</script>
{#key progressFloat}
<div class="progressbarback"><div class="progressing" style="width: calc({progressFloat}*70vw)" in:slide={{axis: "x", duration: 1000}}></div></div>
{/key}
<style lang="scss">
	.progressbarback{
		width: 70vw;
		height: 20px;
		background: $base-color;
		border-radius: 10px;
		margin-left: 3vw;
		margin-right: 3vw;
		margin-top: 3vh;
	}
	.progressing {
		width: 20vw;
		height: 20px;
		background: linear-gradient(90deg, #0036F8 2.45%, #9CD4FF 98.91%);
		border-radius: 10px;
	}
</style>