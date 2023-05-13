
<button class="close" on:click><span class="material-symbols-outlined">close</span> </button>
<style lang="scss">
	.close {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 45px;
		height: 45px;
		border-radius: 10px;	
		margin-top: 3vw;
		margin-left: 3vw;
		background-color: $alert-color;
		border: 0px;
		@include boxshadow-btn-small;
		@media (min-width: 810px){
			margin-top: 1.5vw;
			margin-left: 1.5vw;
		}
	}
</style>