<script lang="ts">
	import { onMount } from "svelte";
	import BigProgressBar from "./components/BigProgressBar.svelte";
import MiniProgressbar from "./components/MiniProgressbar.svelte";
	import { EmptyProgressItem, courseItem} from "./lib/CourseItem";
	//@ts-ignore
	import { pageType } from "./lib/Question.d.ts";
	import { page, questionCouldAsked, questionOn } from "./lib/stores";
	import Questions from "./pages/Questions.svelte";
	let currentPage:pageType = pageType.home
	page.subscribe(value => currentPage = value)
	let dayStreak = 0
	const startnow = () => {
		let questionAsked = []
		progressItems.forEach(element => {
			let inCompleteindex = element.data
			element.completed.forEach(els => {
				inCompleteindex = inCompleteindex.filter(value => value != els)
			});
			questionAsked.push(inCompleteindex)
			console.log(questionAsked)
		});
		questionCouldAsked.set(questionAsked)
		page.set(pageType.question)
	} 
	const home = () => page.set(pageType.home) 
	
	let progressItems = EmptyProgressItem

	if(localStorage.getItem('progress') == undefined){
		console.log("new so creating it")
		let progressItem = []
		courseItem.forEach(element => {
			let QuestionIndex = []
			element.ListQuestion.forEach(ele => {
				QuestionIndex.push(ele.index)
			});
			progressItem.push({
				index: element.index,
				data: QuestionIndex,
				completed: []
			})
		});
		localStorage.setItem('progress', JSON.stringify(progressItem))
	}else{
		progressItems = JSON.parse(localStorage.getItem("progress"))
	}

	// let courseItem_In_DB = JSON.parse(localStorage.getItem("data"))
	let courseItem_In_DB = courseItem
	const setLocalTime = () => {
		const currentTime = (new Date().valueOf()).toString()
		localStorage.setItem("lastLogin", currentTime)
	}
	const checkNewUser = () => {
		if (localStorage.getItem("lastLogin") == undefined){
			return true
		}else{
			return false
		}
	}
	onMount(()=> {
		if(checkNewUser() == true){
			page.set(pageType.starter)
		}
		setLocalTime()
	})
</script>
{#if currentPage == pageType.home}
<main>
	<div class="topbar">
		<span class="title">Saullingo</span>
		<br>
		<span class="streak">Day streak: {dayStreak}</span>
	</div>
	<div class="maincontent">
		{#each courseItem_In_DB as course, i}
		 	{#if (course.index % 2) == 0}
				<div class="gap"></div>
			{/if}
			<div class="coursetext">{course.courseName}
				<MiniProgressbar progressFloat={progressItems[i]}/>
			</div>
		 	{#if (course.index % 2) == 1}
				<div class="gap"></div>
			{/if}
		{/each}
	</div>
	<button class="startnow" on:click={startnow}>start now</button>
</main>
{:else if currentPage == pageType.starter}
<h1>welcome to the show</h1>
<button on:click={home}>Lets goooo</button>
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
