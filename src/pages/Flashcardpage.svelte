<script lang="ts">
	import { fly } from "svelte/transition";
	import Close from "../components/Close.svelte";
	import { courseFlashcard } from "../lib/CourseItem";
	import { IPA } from "../lib/IpaFont";
	import { pageType, type Flashcard } from "../lib/TQuestion";
	import { flashcardIndexOn, flashcardOn, page } from "../lib/stores";
	const filtercourseFlash = (indexgiven):Flashcard => {
		return courseFlashcard.filter((value) => value.courseIndex == indexgiven)[0]
	}
	const close = () => {
		page.set(pageType.home)
	}
	const flashNext = () => {
		if(courseFlashcard[$flashcardIndexOn].listFlashcard.length != ($flashcardOn + 1)){
			flashcardOn.set($flashcardOn + 1)
		}else{
			flashcardOn.set(0)
		}
	}
	let cardFront = true
	const flipcard = () => {
		if (cardFront) {
			cardFront = false
		} else {
			cardFront = true 
		}
	}
</script>
<div class="flashcardPage">
<div class="topFlash">
	<Close on:click={close}/>
		<div class="flashtitle">flashcard {@html IPA(filtercourseFlash($flashcardIndexOn).courseName)}</div>
</div>
<br>
{#if cardFront == true}
	<button class="bigflashbtn" on:click={flipcard} transition:fly={{y: -100, x: -100, duration:200}}>
		{@html IPA(filtercourseFlash($flashcardIndexOn).listFlashcard[$flashcardOn].front)}
	</button>
{:else}
	<button class="bigflashbtn back" on:click={flipcard} transition:fly={{y: -100, x: -100, duration:200}} >
		{@html IPA(filtercourseFlash($flashcardIndexOn).listFlashcard[$flashcardOn].back)}
	</button>
{/if}
<button class="nextFlash" on:click={flashNext}>Next</button>
</div>
<style lang="scss">

	.bigflashbtn {
		@include bigbutton-style;
		@include bigbutton-font;
		@include boxshadow-btn;
		height: 70vh;
		width: 80vw;
		@media (min-width: 800px){
			height: 80vh;
		}
	}
	.nextFlash {
		margin-top: 4vh;
		@include bigbutton-style;
		@include bigbutton-font;
		@include boxshadow-btn;
		background-color: $friendly-color;
	}
	.back {
		box-shadow: 10px 7px 0px $friendly-color !important;
	}
	.flashtitle {
		@include text-x;
	}
	.topFlash {
		display: grid;
		grid-template-columns: 10% 90%;
		align-items: center;
		justify-items: center;
	}
</style>