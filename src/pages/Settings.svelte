<script>
    import Close from "../components/Close.svelte";
	import { OpenDialogConform } from "../lib/DialogUtils";
	import { alertconfirmType, pageType } from "../lib/TQuestion";
	import { page } from "../lib/stores";
	const close = () => {
		page.set(pageType.home)
	}
    const clearAllDAta = async () => {
        let result = await OpenDialogConform("Are you sure")
        if(result == alertconfirmType.yes){
            console.log("clearing All the data")
            localStorage.removeItem("lastLogin")
            localStorage.removeItem("progress")
            localStorage.removeItem("version")
            navigator.serviceWorker.getRegistrations().then(function(registrations) {
				for(let registration of registrations) {
					registration.unregister();
				} 
			});
			location.reload()
        }
    }
</script>
<div class="topFlash">
	<Close on:click={close}/>
	<div class="flashtitle">Settings </div>
</div>
<br>
<br>
<button class="btn" on:click={clearAllDAta}>Clear All Data</button>
<style lang="scss">
	.topFlash {
		display: grid;
		grid-template-columns: auto auto;
		align-items: center;
	}
	.flashtitle {
		@include text-x;
	}
    .btn {
		@include bigbutton-style;
		@include bigbutton-font;
		@include boxshadow-btn;
		background-color: $friendly-color;
    }
</style>