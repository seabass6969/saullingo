<script>
	import { fade, slide } from "svelte/transition";
	import { OpenDialog } from "../lib/DialogUtils";
	import { pageType } from "../lib/TQuestion";
	import { navbarOpen, page } from "../lib/stores";
	import Close from "./Close.svelte";
	import Settingbtn from "./Settingbtn.svelte";
	import Statisticbtn from "./Statisticbtn.svelte";
	import Installbtn from "./Installbtn.svelte";
	import DictBtn from "./DictBtn.svelte";
	import InfoBtn from "./InfoBtn.svelte";


	const settingsPage = () => {
        navbarOpen.set(false)
		page.set(pageType.settings)
	}
    const closes = () => {
        navbarOpen.set(false)
    }
    const statisticPage = () => {
        navbarOpen.set(false)
        OpenDialog("Is just not there yet🚧")
    }
    const InstallPage = () => {
        navbarOpen.set(false)
        page.set(pageType.installhowto)
    }
    const DictPage = () => {
        page.set(pageType.dictionary)
    }
    const infopage = () => {
        page.set(pageType.info)
    }
    let clientWidth = 0
</script>
<svelte:window bind:innerWidth={clientWidth} />
<div class="navback" out:fade={{duration: 300}} in:fade={{duration: 300}}>
    <div class="leftnav" in:slide={{duration: 300, axis: "x"}} out:slide={{duration: 300, axis: "x"}}>
        {#if clientWidth > 810}
            <div class="topset">
                <img src="/favicon.svg" alt="" class="logo">
                <div>
                <span class="title">Saullingo</span>
                </div>
            </div>
        {/if}
        {#if clientWidth < 810}
            <Close on:click={closes}/>
        {/if}
        <Settingbtn on:click={settingsPage}/>
        <Statisticbtn on:click={statisticPage}/>
        <Installbtn on:click={InstallPage}/>
        <DictBtn on:click={DictPage}/>
        <InfoBtn on:click={infopage}/>
    </div>
</div>
<style lang="scss">
    .leftnav {
        z-index: 9;
        height: 100vh;
background: linear-gradient(145deg, #f0f0f0, #cacaca);
box-shadow:  20px 20px 60px #bebebe,
             -20px -20px 60px #ffffff;
        // background-color: $base-color;
		border-radius: 0px 35px 35px 0px;
        display: grid;
        grid-template-rows: repeat(6, 12vh);
        align-items: center;
        padding-left: 2vw;
        padding-right: 4vw;
        width: 36vw;
        box-shadow: 2px 0px 60px -1px rgba(0,0,0,0.6);
        // position: fixed;
		@media (min-width: 810px){
            width: 15vw;
            // position: relative;
            min-width: 15vw;
        }
    }
    .navback {
        z-index: 9;
        height: 100vh;
        width: 100vw;
        backdrop-filter: blur(5px);
        position: fixed;
		@media (min-width: 810px){
            position: relative;
            width: 30vw;
        }
    }
.topset {
	display: grid;
	align-items: center;
	justify-items: left;
	height: 13vh;
    grid-template-columns: 5vw 10vw ;
}
.logo {
	width: 10vw;
	width: 5vw;
}
	.title {
        margin-left: 1vw;
		@include titlefont;
	}
</style>        