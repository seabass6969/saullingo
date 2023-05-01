<script lang="ts">
	import Close from "../components/Close.svelte";
	import { CourseLearn } from "../lib/CourseItem";
	import { IPA } from "../lib/IpaFont";
	import { page } from "../lib/stores";
	import { pageType, type LearnSection } from "./../lib/TQuestion";
	import { flashcardIndexOn,LearnIndexOn } from "../lib/stores";
	const close = () => {
		page.set(pageType.home)
	}
	const filterlearncourse = (indexgiven):LearnSection=> {
		return CourseLearn.filter((value) => value.courseIndex == indexgiven)[0]
	}
</script>
<div class="flashcardPage">
<div class="topFlash">
	<Close on:click={close}/>
	<div class="flashtitle">learn {@html IPA(filterlearncourse($flashcardIndexOn).courseName)}</div>
</div>
<br>
<br>
<div class="learnText">
	{@html IPA(filterlearncourse($LearnIndexOn).learn)}
</div>
</div>
<style lang="scss">
	.flashtitle {
		@include text-x;
	}
	.topFlash {
		display: grid;
		grid-template-columns: 10% 90%;
		align-items: center;
		justify-items: center;
	}
.learnText {
	@include text-x;
	margin-left: $margin-question;
	margin-right: $margin-question;
	border-style: solid;
	border-width: 5px;
	border-radius: 30px;
	border-color: $friendly-color;
	padding: 10px;
}
</style>