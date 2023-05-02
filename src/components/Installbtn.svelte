<button class="stats" on:click><span class="material-symbols-outlined">system_update</span> Install</button>
<style lang="scss">
	.stats{
		display: flex;
		align-items: center;
		justify-content: center;
		height: 35px;
		border-radius: 10px;	
		// margin-top: 3.5vw;
		// margin-bottom: 2vw;
		margin-left: 1vw;
		background-color: $friendly-color;
		border: 0px;
		@include boxshadow-btn-small;

		@include text-normal;
		@media (min-width: 810px){
            height: 45px;
            // margin-bottom: 3vw;
            // margin-top: 2vw;
		}
	}
</style>