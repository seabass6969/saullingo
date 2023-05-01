<script>
	import { fade } from "svelte/transition";
</script>
<button on:click class="startnow"><img src="/start now.svg" alt="" out:fade in:fade></button>
<style lang="scss">
.startnow {
        background-color: transparent;
        border-style: none;
		height: 7vh;
		margin-top: 0 !important;
		margin-bottom: 0 !important;
		@media (min-width: 810px) {
			margin-left: 30vw;
			margin-right: 10vw;
			width: 40vw;
		}
		display: flex;
		align-items: center;
		justify-content: center;
}
</style>