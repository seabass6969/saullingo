<script lang="ts">
	import BigProgressBar from "./components/BigProgressBar.svelte";
import MiniProgressbar from "./components/MiniProgressbar.svelte";
	import { courseItem } from "./lib/CourseItem";
	//@ts-ignore
	import { pageType } from "./lib/Question.d.ts";
	import { page } from "./lib/stores";
	import Questions from "./pages/Questions.svelte";
	let currentPage:pageType = pageType.home
	page.subscribe(value => currentPage = value)
	let dayStreak = 0
	const startnow = () => page.set(pageType.question) 
</script>
{#if currentPage == pageType.home}
<main>
	<div class="topbar">
		<span class="title">Saullingo</span>
		<br>
		<span class="streak">Day streak: {dayStreak}</span>
	</div>
	<div class="maincontent">
		{#each courseItem as course}
		 	{#if (course.index % 2) == 0}
				<div class="gap"></div>
			{/if}
			<div class="coursetext">{course.courseName}
				<MiniProgressbar progressFloat={course.progressFloat}/>
			</div>
		 	{#if (course.index % 2) == 1}
				<div class="gap"></div>
			{/if}
		{/each}
	</div>
	<button class="startnow" on:click={startnow}>start now</button>
</main>
{:else if currentPage == pageType.question}
<Questions />
{:else}
<h1>ERROR ERROR </h1>
{/if}
<style lang="scss">
	// home screen
	.topbar {
		width: 100vw;
		background-color: #DDDDDD;
	}
	.title {
		margin-top: 10px;
		margin-left: 10px;
		@include titlefont;
	}
	main {
		display: grid;
		grid-template-columns: auto;
		grid-template-rows: 15vh 70vh 15vh;
	}
	.streak{
		margin-left: 10px;
		@include text-x;
	}
	.startnow {
		background: $base-color;
		@include bigbutton-style;
		@include bigbutton-font;
		@include boxshadow-btn;
	}
	.coursetext {
		margin-top: 3vh;
		margin-left: 3vw;
		@include text-x;
	}
	@media (min-width: 800px){
	}
	.maincontent {
		display: grid;
		grid-template-columns: auto auto ;
	}
</style>
