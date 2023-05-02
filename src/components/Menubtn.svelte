<button class="stats" on:click><span class="material-symbols-outlined">menu</span> </button>
<style lang="scss">
	.stats{
		display: flex;
		align-items: center;
		justify-content: center;
		width: 35px;
		height: 35px;
		border-radius: 10px;	
		// margin-top: 3.5vw;
		// margin-bottom: 2vw;
		margin-left: 3vw;
        margin-top: -1vh;
		background-color: $friendly-color;
		border: 0px;
		@include boxshadow-btn-small;

		@include text-normal;
		@media (min-width: 810px){
            width: 45px;
            height: 45px;
            // margin-bottom: 3vw;
            // margin-top: 2vw;
            margin-right: 1vw;
		}
	}
</style>