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
    <div class="areas">
        <span class="title">iOS device:</span>
        <br>
        <span class="text">1. Press share</span>
        <br>
        <img src="/Assets/install_share.png" alt="install share" class="roundedCorner">
        <br>
        <span class="text">2. Press "Add to Home Screen"</span>
        <br>
        <img src="/Assets/install_addtohome.png" alt="install share" class="roundedCorner smallerIMG">
        <br>
        <span class="text">2. Press "Add"</span>
        <br>
        <img src="/Assets/install_add.png" alt="install share" class="roundedCorner smallerIMG">
    </div>
    <div class="areas">
        <span class="title">Chrome Browser:</span>
        <br>
        <span class="text">1. Press Install</span>
        <br>
        <img src="/Assets/install_add_chrome.png" alt="install share" class="roundedCorner smallerIMG">
        <br>
        <span class="text">2. Press "Install"</span>
        <br>
        <img src="/Assets/install_install_chrome.png" alt="install share" class="roundedCorner smallerIMG">
    </div>
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
        margin-right: $margin-question;
    }
    .text {
        @include text-x
    }
    .areas {
        border-color: $alert-color;
        border-width: 5px;
        border-style: solid;
        border-radius: 10px;
        padding: 10px;
        margin: 1vw;
    }
    .title {
        @include text-xx
    }
    .smallerIMG {
        width: 200px;
    }
</style>