<script>
	import { fade } from "svelte/transition";
</script>

<button class="startnow" on:click out:fade>
    start now 
    <img
		src="/emoji/rocket.png"
		alt=""
		class="rocketStart"
	/>
</button>

<style lang="scss">
	.startnow {
		background: mediumaquamarine;
		@include bigbutton-style;
		@include bigbutton-font;
		@include boxshadow-btn;
		font-size: 25px;
		height: 7vh;
		margin-top: 0 !important;
		margin-bottom: 0 !important;
		@media (min-width: 810px) {
			margin-left: 30vw;
			margin-right: 10vw;
			width: 60vw;
		}
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.rocketStart {
		width: 20px;
		@media (min-width: 810px) {
			width: 30px;
		}
	}
</style>
