<script lang="ts">
	import { onMount } from "svelte";
	import { fly } from 'svelte/transition';
	import BigProgressBar from "./components/BigProgressBar.svelte";
import MiniProgressbar from "./components/MiniProgressbar.svelte";
	import { CourseLearn, courseFlashcard, courseItem, courseItemVersion} from "./lib/CourseItem";
	//@ts-ignore
	import { pageType, type Flashcard, type LearnSection } from "./lib/Question";
	import { DialogOpen, DialogText, LearnIndexOn, flashcardIndexOn, flashcardOn, page, questionCouldAsked, questionOn } from "./lib/stores";
	import Questions from "./pages/Questions.svelte";
	import Close from "./components/Close.svelte";
	import { IPA } from "./lib/IpaFont";
	import Dialog from "./components/Dialog.svelte";
	import { OpenDialog } from "./lib/DialogUtils";
	import Settingbtn from "./components/Settingbtn.svelte";
	import Statisticbtn from "./components/Statisticbtn.svelte";
	import Settings from "./pages/Settings.svelte";
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
			OpenDialog("sorry All your Task has complete 🙅")	
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
		if(courseFlashcard.filter((value) => value.courseIndex == course).length != 0){
			flashcardIndexOn.set(course)
			page.set(pageType.flashcard)
		}else{
			OpenDialog("Oh no! Seems like this Flashcard section is not there yet! 🚧")
		}
	}
	const learnSection = (course) => {
		if(CourseLearn.filter((value) => value.courseIndex == course).length != 0){
			LearnIndexOn.set(course)
			page.set(pageType.learn)
		}else{
			OpenDialog("Oh no! Seems like this Learn section is not there yet! 🚧")
		}
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
	const filterlearncourse = (indexgiven):LearnSection=> {
		return CourseLearn.filter((value) => value.courseIndex == indexgiven)[0]
	}
	const filtercourseFlash = (indexgiven):Flashcard => {
		return courseFlashcard.filter((value) => value.courseIndex == indexgiven)[0]
	}
	const courseFilter = (LessonIndex) => {
		return courseItem.filter((val) => val.course== LessonIndex)
	}
	const settingsPage = () => {
		page.set(pageType.settings)
	}
</script>
<Dialog bind:open={$DialogOpen}>
	<h1>{$DialogText}</h1>
</Dialog>
{#if currentPage == pageType.home}
<main transition:fly={{y:-200,duration: 400}}>
	<div class="topbar">
		<div class="topset">
			<span class="title">Saullingo</span>
			<Settingbtn on:click={settingsPage}/>
			<Statisticbtn on:click={()=> {OpenDialog("Is just not there yet🚧")}}/>
		</div>
		<!-- <span class="streak">Day streak: {dayStreak}</span> -->
	</div>
	<div class="maincontent">
		{#each courseItem_In_DB as course, i}
		  	{#if course.lesson == 0}
				<span class="courseName" style="background-color: {course.themeColor}">{@html IPA(course.courseName)}</span>
				<div class="flashlearn">
					<button class="flashcard" on:click={()=> {flashcard(course.course)}}>Flashcard</button>
					<button class="learn" on:click={()=> {learnSection(course.course)}}>Learn</button>
				</div>
				<div class="courseSection">
					{#each courseFilter(course.course) as cours, x}
						<div class="coursetext">{@html IPA(cours.LessonName)}
							<MiniProgressbar progressFloat={i+x}/>
						</div>
					{/each}
				</div>
			{/if}
		{/each}
		<div class="bottom"></div>
	</div>
</main>
  <div class="backgroundblur">
		<button class="startnow" on:click={startnow}>start now</button>
  </div>
{:else if currentPage == pageType.learn}
<div class="flashcardPage">
<div class="topFlash">
	<Close on:click={close}/>
	<div class="flashtitle">learn {@html IPA(filtercourseFlash($flashcardIndexOn).courseName)}</div>
</div>
<br>
<br>
<div class="learnText">
	{@html IPA(filterlearncourse($LearnIndexOn).learn)}
</div>
</div>
{:else if currentPage == pageType.flashcard}
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
{:else if currentPage == pageType.settings}
	<Settings />
{:else}
<h1>ERROR ERROR </h1>
{/if}
<style lang="scss">
	// home screen
	.topbar {
		width: 100vw;
		background-color: #DDDDDD;
		border-radius: 0px 0px 30px 30px;
		box-shadow: 2px 2px 51px -10px rgb(37,0,171);
	}
	.title {
		margin-left: 7px;
		@media (min-width: 810px){
			margin-top: 10px;
			margin-left: 10px;
		}
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
		overflow-x: none;
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
	.learn{
		@include bigbutton-style;
		@include bigbutton-font;
		@include boxshadow-btn;
		margin-top: 1vh;
		width: 40vw;
		margin-left: 5vw;
		margin-right: 5vw;
		background-color: $friendly-color;
	}
	.flashcard {
		@include bigbutton-style;
		@include bigbutton-font;
		@include boxshadow-btn;
		margin-top: 1vh;
		width: 40vw;
		margin-left: 5vw;
		margin-right: 5vw;
		background-color: $correct-color;
	}
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
	.topFlash {
		display: grid;
		grid-template-columns: auto auto;
		align-items: center;
	}
	.flashtitle {
		@include text-x;
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
.courseSection {
	display: grid;
	grid-template-columns: auto auto;
}
.flashlearn {
	display: grid;
	grid-template-columns: auto auto;
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
.topset {
	display: grid;
	grid-template-columns: 60vw auto auto;

	@media (min-width: 810px){
		grid-template-columns: 80vw auto auto;
	}
}
</style>
