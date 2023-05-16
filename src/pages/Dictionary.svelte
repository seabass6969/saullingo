<script lang="ts">
    import Close from "../components/Utillity/Close.svelte";
	import { IPA } from "../lib/IpaFont";
	import { pageType, type dictionarys } from "../lib/TQuestion";
	import { typewriterplaceholder } from "../lib/animation";
	import { dictionary } from "../lib/dict";
	import { page } from "../lib/stores";
    let typedSearch: string = ""
    const close = () => {
        page.set(pageType.home)
    }
    let eachSearchItem: dictionarys = []
    $: {
        if(typedSearch != ""){
            typedSearch = typedSearch.toLowerCase()
            eachSearchItem = dictionary.filter(filtrate => filtrate.english.indexOf(typedSearch) != -1)
        }else{
            eachSearchItem = []
        }
    }
</script>
<div class="DictonaryPage">
<div class="topFlash">
	<Close on:click={close}/>
		<div class="dictTitle">Dictonary</div>
</div>
<br>
    <div class="maincontent">
        <input type="text" name="" id="" bind:value={typedSearch} class="typedsearch" placeholder="Search Text by start typing in here!" in:typewriterplaceholder={{speed: 0.7}}>
        <div class="searchArea">
        {#each eachSearchItem as s}
            <div class="searchdiv">
                <span class="textEng">english: {s.english}</span>
                <br>
                <span class="textResult">{@html IPA("<ipa>hɛɾɪnəʊ</ipa>")}: {@html IPA("<ipa>" + s.result + "</ipa>")}</span>
            </div>
        {/each}
        </div>
    </div>
</div>
<style lang="scss">
	.topFlash {
		display: grid;
		grid-template-columns: 10% 90%;
		align-items: center;
		justify-items: center;
	}
	.dictTitle{
		@include text-x;
	}
    .maincontent{
        margin-left: $margin-question;
        margin-right: $margin-question;
    }
    .typedsearch {
		border-style: none;
		background: #9ED6FF;
        width: 81vw;
        height: 5vh;
		@include text-xx;
        resize: none;
    }
    .searchdiv {
        border-style: solid;
        border-width: 3px;
        border-color: $friendly-color;
        margin: 10px;
        border-radius: 10px;
        padding: 10px;
    }
    .textEng {
        @include text-x
    }
    .textResult {
        @include text-x
    }
    .searchArea {
        display: grid;
        grid-template-columns: auto auto auto;
    }
</style>