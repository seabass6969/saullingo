<script>
    import Close from "../components/Close.svelte";
	import { pageType } from "../lib/TQuestion";
	import { page } from "../lib/stores";
	const close = () => {
		page.set(pageType.home)
	}
</script>
<div class="topFlash">
	<Close on:click={close}/>
	<div class="flashtitle">How to Install</div>
</div>
<br>
<br>
<div class="marginMaincontent">
    <span class="text">1. Press the share button</span>
    <br>
    <img src="/Assets/install_share.png" alt="install share" class="roundedCorner">
</div>
<style lang="scss">
	.topFlash {
		display: grid;
		grid-template-columns: auto auto;
		align-items: center;
	}
	.flashtitle {
		@include text-x;
	}
    .roundedCorner {
        border-color: $correct-color;
        border-width: 5px;
        border-style: solid;
        border-radius: 10px;
    }
    .marginMaincontent {
        margin-left: $margin-question;
    }
    .text {
        @include text-x
    }
</style>