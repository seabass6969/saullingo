<script lang="ts">
	import { slide } from "svelte/transition";

	let clientWidth = 0
    export let progressFloat
	let localStorageITEM = JSON.parse(localStorage.getItem("progress"))[progressFloat]
	let progress = localStorageITEM.completed.length / localStorageITEM.data.length
</script>
<svelte:window bind:innerWidth={clientWidth} />
{#key progress}
{#if clientWidth < 810}
	<div class="progressbarback" ><div class="progressing" style="width: calc({progress}*40vw)" in:slide={{axis: "x",duration: 1000}}></div></div>
{:else}
	<div class="progressbarback small" ><div class="progressing small" style="width: calc({progress}*30vw)" in:slide={{axis: "x", duration: 1000}}></div></div>
{/if}
{/key}
<style lang="scss">
	.progressbarback{
		width: 40vw;
		height: 10px;
		background: $base-color;
		border-radius: 10px;
	}
	.progressing {
		width: 20vw;
		height: 10px;
		background: linear-gradient(90deg, #0036F8 2.45%, #9CD4FF 98.91%);
		border-radius: 10px;
	}
	.small {
		width: 30vw;
	}
</style>