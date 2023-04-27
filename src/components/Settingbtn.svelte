<button class="setting" on:click><span class="material-symbols-outlined">settings</span> </button>
<style lang="scss">
	.setting{
		display: flex;
		align-items: center;
		justify-content: center;
		width: 35px;
		height: 35px;
		border-radius: 10px;	
		margin-top: 2vw;
		margin-bottom: 2vw;
		margin-left: 3vw;
		background-color: $correct-color;
		border: 0px;
		@include boxshadow-btn-small;
		@media (min-width: 810px){
            width: 45px;
            height: 45px;
            margin-bottom: 3vw;
            margin-top: 2vw;
		}
	}
</style>