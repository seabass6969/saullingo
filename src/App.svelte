<script lang="ts">
	import { onMount } from "svelte";
	import { fly } from 'svelte/transition';
	import BigProgressBar from "./components/BigProgressBar.svelte";
import MiniProgressbar from "./components/MiniProgressbar.svelte";
	import { courseFlashcard, courseItem, courseItemVersion} from "./lib/CourseItem";
	//@ts-ignore
	import { pageType } from "./lib/Question";
	import { flashcardIndexOn, flashcardOn, page, questionCouldAsked, questionOn } from "./lib/stores";
	import Questions from "./pages/Questions.svelte";
	import Close from "./components/Close.svelte";
	let currentPage:pageType = pageType.home
	page.subscribe(value => currentPage = value)
	let dayStreak = 0
	let questionCouldAskedSub 
	questionCouldAsked.subscribe(value => questionCouldAskedSub = value)
	const selfBURNING = () => {
		if((localStorage.getItem("version") == undefined) || (localStorage.getItem("version") != courseItemVersion)){
			console.log("destorying old content")
			localStorage.clear()
			localStorage.setItem("version", courseItemVersion)
			location.reload()
		}
	}
	const checkIfAllComplete = () => {
		let iFComplete = 0
		questionCouldAskedSub.forEach(element => {
			if(element[0] == undefined){
				iFComplete += 1
			}
		});
		if(questionCouldAskedSub.length == iFComplete){
			return true
		}else{
			return false
		}
		
	}
	const resetQuestionAskVAR = () => {
		let questionAsked = []
		let progressItemsINlocalStorage = JSON.parse(localStorage.getItem("progress"))
		progressItemsINlocalStorage.forEach(element => {
			let inCompleteindex = element.data
			element.completed.forEach(els => {
				inCompleteindex = inCompleteindex.filter(value => value != els)
			});
			questionAsked.push(inCompleteindex)
		});
		questionCouldAsked.set(questionAsked)
	}
	const startnow = () => {
		resetQuestionAskVAR()
		if(checkIfAllComplete() == false){
			page.set(pageType.question)
		}else{
			alert("sorry All your Task has complete")
		}
	} 
	const home = () => page.set(pageType.home) 
	
	function generateProgressItem(){
		let progressItem = []
		courseItem.forEach(element => {
			let QuestionIndex = []
			element.ListQuestion.forEach(ele => {
				QuestionIndex.push(ele.index)
			});
			progressItem.push({
				index: element.index,
				LessonName: element.LessonName,
				courseName: element.courseName,
				data: QuestionIndex,
				course: element.course,
				lesson: element.lesson,
				completed: []
			})
		});
		return progressItem
	}
	let progressItems  

	if(localStorage.getItem('progress') == undefined){
		console.log("new so creating it")
		localStorage.setItem('progress', JSON.stringify(generateProgressItem()))
	// }else if (generateProgressItem() != JSON.parse(localStorage.getItem('progress'))){
	// 	console.log("not same")
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
	const flashcard = (course) => {
		flashcardIndexOn.set(course)
		page.set(pageType.flashcard)
	}
	onMount(()=> {
		if(checkNewUser() == true){
			page.set(pageType.starter)
			localStorage.setItem("version", courseItemVersion)
		}
		selfBURNING()
		setLocalTime()
	})
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
{#if currentPage == pageType.home}
<main transition:fly={{y:-200,duration: 400}}>
	<div class="topbar">
		<span class="title">Saullingo</span>
		<br>
		<span class="streak">Day streak: {dayStreak}</span>
	</div>
	<div class="maincontent">
		{#each courseItem_In_DB as course, i}
		  	{#if course.lesson == 0}
				<span class="courseName" style="background-color: {course.themeColor}">{course.courseName}</span>
				<button class="flashcard" on:click={()=> {flashcard(course.course)}}>Flashcard</button>
			{/if}
		 	<!-- {#if (course.index % 2) == 0}
				<div class="gap"></div>
			{/if} -->
			<div class="coursetext">{course.LessonName}
				<MiniProgressbar progressFloat={i}/>
			</div>
		 	<!-- {#if (course.index % 2) == 1}
				<div class="gap"></div>
			{/if} -->
		{/each}
		<div class="bottom"></div>
	</div>
</main>
  <div class="backgroundblur">
		<button class="startnow" on:click={startnow}>start now</button>
  </div>
{:else if currentPage == pageType.flashcard}
<div class="flashcardPage">
<div class="topFlash">
	<Close on:click={close}/>
	<div class="flashtitle">flashcard {courseFlashcard[$flashcardIndexOn].courseName}</div>
</div>
<br>
{#if cardFront == true}
	<button class="bigflashbtn" on:click={flipcard} transition:fly={{y: -100, x: -100, duration:200}}>
		{courseFlashcard[$flashcardIndexOn].listFlashcard[$flashcardOn].front}
	</button>
{:else}
	<button class="bigflashbtn back" on:click={flipcard} transition:fly={{y: -100, x: -100, duration:200}} >
		{courseFlashcard[$flashcardIndexOn].listFlashcard[$flashcardOn].back}
	</button>
{/if}
<button class="nextFlash" on:click={flashNext}>Next</button>
</div>
{:else if currentPage == pageType.update}
<h1>Update</h1>
<h2>Something is updating!!!</h2>
<button on:click={home} class="startgo">goooo back</button>
{:else if currentPage == pageType.starter}
<h1>welcome to saullingo</h1>
<h2>saullingo is the gateway to language learning</h2>
<button on:click={home} class="startgo">Lets goooo</button>
{:else if currentPage == pageType.question}
<div transition:fly={{y: 200, duration: 400}}>
<Questions />
</div>
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
		grid-template-rows: 15vh 85vh;
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
		height: 7vh;
		margin-top: 0 !important; 
		margin-bottom: 0 !important; 
	}
	.backgroundblur {
		backdrop-filter: blur(5px);
		position: absolute;
		top: 90vh;
		height: 10vh;
		width: 100vw;
	}
	.coursetext {
		margin-top: 3vh;
		margin-left: 3vw;
		@include text-x;
	}
	.maincontent {
		display: grid;
		overflow-y: scroll;
		height: 80vh
		// grid-template-columns: auto auto ;
	}
	.startgo {
		@include bigbutton-style;
		@include bigbutton-font;
		@include boxshadow-btn;
	}
	.bottom {
		height: 10vh;
	}
	.courseName {
		@include text-xx;
		margin-left: 3vw;
		margin-right: 3vw;
		margin-top: 3vw;
		font-style: italic;
	}
	.flashcard {
		@include bigbutton-style;
		@include bigbutton-font;
		@include boxshadow-btn;
		margin-top: 1vh;
	}
	.bigflashbtn {
		@include bigbutton-style;
		@include bigbutton-font;
		@include boxshadow-btn;
		height: 80vh;
		width: 80vw;
	}
	.topFlash {
		display: grid;
		grid-template-columns: auto auto;
		align-items: center;
	}
	.flashtitle {
		@include text-xx
	}
	.back {
		box-shadow: 10px 7px 0px $friendly-color !important;
	}
	.nextFlash {
		margin-top: 4vh;
		@include bigbutton-style;
		@include bigbutton-font;
		@include boxshadow-btn;
		background-color: $friendly-color;
	}
</style>
