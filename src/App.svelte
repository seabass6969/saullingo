<script lang="ts">
	import { onMount } from "svelte";
	import { fly, slide } from 'svelte/transition';
	import BigProgressBar from "./components/BigProgressBar.svelte";
import MiniProgressbar from "./components/MiniProgressbar.svelte";
	import { CourseLearn, courseFlashcard, courseItem, courseItemVersion} from "./lib/CourseItem";
	//@ts-ignore
	import { pageType, type Flashcard, type LearnSection } from "./lib/Question";
	import { DialogOpen, DialogText, LearnIndexOn, flashcardIndexOn, flashcardOn, navbarOpen, page, questionCouldAsked, questionOn } from "./lib/stores";
	import Questions from "./pages/Questions.svelte";
	import Close from "./components/Close.svelte";
	import { IPA } from "./lib/IpaFont";
	import Dialog from "./components/Dialog.svelte";
	import { OpenDialog } from "./lib/DialogUtils";
	import Settings from "./pages/Settings.svelte";
	import Menubtn from "./components/Menubtn.svelte";
	import Navbar from "./components/navbar.svelte";
	import { typewriter } from "./lib/animation";
	let currentPage:pageType = pageType.home
	page.subscribe(value => currentPage = value)
	let dayStreak = 0
	let questionCouldAskedSub 
	let clientWidth = 0
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
	enum GreetingTime {
		morning = "Good Morning",
		afternoon = "Good Afternoon",
		night = "Good Night"
	}
	const timeText = ():GreetingTime => {
		let date = new Date()
		if (date.getHours() <= 11 && date.getHours() >= 6){
			return GreetingTime.morning
		}else if (date.getHours() >= 11 && date.getHours() <= 18){
			return GreetingTime.afternoon
		}else {
			return GreetingTime.night
		}
	}
	const emojiText = () => {
		let times = timeText()
		if(times == GreetingTime.morning){
			return "/emoji/happy.png"
		}else if(times == GreetingTime.afternoon){
			return "/emoji/sun.png"
		}else if(times == GreetingTime.night){
			return "/emoji/night.png"
		}
	}
</script>
<svelte:window bind:innerWidth={clientWidth} />
<Dialog bind:open={$DialogOpen}>
	<h1>{$DialogText}</h1>
</Dialog>
{#if $navbarOpen == true }
	<Navbar />
{/if}
{#if currentPage == pageType.home}
<div class="full">
{#if clientWidth > 810}
	<Navbar />
{/if}
<main transition:fly={{y:-200,duration: 400}}>
	<div class="topbar">
		<div class="topset">
			{#if clientWidth < 810}
				<Menubtn on:click={()=> {navbarOpen.set(true)}}/>
			<img src="/favicon.svg" alt="" class="logo">
			<div>
			<span class="title">Saullingo</span>
			</div>
			{/if}
		</div>
		<!-- <span class="streak">Day streak: {dayStreak}</span> -->
		<span class="welcome" >Welcome! {timeText()} <img src={emojiText()} alt="" class="welcomeemoji"></span>
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
	
</div>
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
		@media (min-width: 810px){
			width: 79vw;
		}
	}
	.title {
		margin-left: 7px;
		@media (min-width: 810px){
			margin-top: 2vh;
			margin-left: 2vw;
		}
		@include titlefont;
	}
	main {
		display: grid;
		grid-template-columns: auto;
		grid-template-rows: 20vh 80vh;
		@media (min-width: 810px){
			grid-template-rows: 10vh 90vh;
		}
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
		@media (min-width: 810px){
			margin-left: 30vw;
			margin-right: 10vw;
			width: 60vw;
		}
	}
	.backgroundblur {
		backdrop-filter: blur(5px);
		position: fixed;
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
		height: 80vh;
		// grid-template-columns: auto auto ;
		background-color: #DDDDDD;
		border-radius: 65px 65px 0px 0px;
		box-shadow: 0px -2px 51px 0px #848484;
		padding-top: 5vh;
		@media (min-width: 810px){
			height: 80vh;
			width: 78.9vw;
			overflow-x: scroll;
		}
}
	.startgo {
		@include bigbutton-style;
		@include bigbutton-font;
		@include boxshadow-btn;
	}
	.bottom {
		height: 15vh;
	}
	.courseName {
		@include text-xx;
		margin-left: 3vw;
		margin-right: 3vw;
		margin-top: 3vw;
		font-style: italic;
		padding: 4px;
		border-radius: 5px;
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
		@media (min-width: 810px){
			width: 20vw;
		}
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
		@media (min-width: 810px){
			width: 20vw;
		}
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
		grid-template-columns: 10% 90%;
		align-items: center;
		justify-items: center;
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
	grid-template-columns: 15vw 15vw 40vw ;
	align-items: center;
	justify-items: left;
	height: 13vh;
	@media (min-width: 810px){
		// grid-template-columns: 5vw 5vw 70vw ;
		height: 2vh;
	}
}
.logo {
	width: 10vw;
	@media (min-width: 810px){
	width: 5vw;
	margin-left: 1vw;
	}
	margin-left: 3vw;
}
.welcome {
	margin-left: 5vw;
	@include text-xx;
	display:flex;
	align-items: center;
}
.welcomeemoji {
	margin-left: 1vw;
	width: 10vw;
	@media (min-width: 810px){
	width: 50px;
	}

}
.full {
	display: flex;
	@media (min-width: 810px){
flex-direction: row;
flex-wrap: nowrap;
	}
}
</style>
