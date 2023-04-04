<script lang="ts">
    export let progressFloat:number
</script>
<div class="progressbarback"><div class="progressing" style="width: calc({progressFloat}*40vw)"></div></div>
<style lang="scss">
	.progressbarback{
		width: 40vw;
		height: 10px;
		background: $base-color;
		border-radius: 10px;
		margin-left: 3vw;
		margin-right: 3vw;
	}
	.progressing {
		width: 20vw;
		height: 10px;
		background: linear-gradient(90deg, #0036F8 2.45%, #9CD4FF 98.91%);
		border-radius: 10px;
	}
</style>