<script lang="ts">
	import { onMount } from "svelte";
	import { fade, fly, slide } from "svelte/transition";
	// import BigProgressBar from "./components/BigProgressBar.svelte";
	import MiniProgressbar from "./components/MiniProgressbar.svelte";
	import {
		courseItem,
		courseItemVersion,
	} from "./lib/CourseItem";
	//@ts-ignore
	import { pageType, type Tab } from "./lib/TQuestion";
	import {
		DialogOpen,
		DialogText,
		flashcardIndexOn,
		flashcardOn,
		navbarOpen,
		page,
		questionCouldAsked,
	} from "./lib/stores";
	import Questions from "./pages/Questions.svelte";
	import { IPA } from "./lib/IpaFont";
	import Dialog from "./components/Dialog.svelte";
	import { OpenDialog } from "./lib/DialogUtils";
	import Settings from "./pages/Settings.svelte";
	import Menubtn from "./components/Menubtn.svelte";
	import Navbar from "./components/navbar.svelte";
	import { emojiText, timeText } from "./lib/TimeUtil";
	import {
		PageSwitchFlashcard,
		PageSwitchLearnSection,
		home,
	} from "./lib/PageUtil";
	import Learn from "./pages/Learn.svelte";
	import Flashcardpage from "./pages/Flashcardpage.svelte";
	// import StartNow from "./components/StartNow.old.svelte";
	import StartNowExp from "./components/StartNowEXP.svelte";
	import ExpandContent from "./components/ExpandContent.svelte";
	let currentPage: pageType = pageType.home;
	page.subscribe((value) => (currentPage = value));
	let dayStreak = 0;
	let questionCouldAskedSub;
	let clientWidth = 0;

	const generateTabItem = ():Tab[] => {
		let result: Tab[]
		let previousEle=-1
		courseItem.forEach(element => {
			if(element.course != previousEle){
				previousEle = element.course
				result.push({
					courseIndex: element.course,
					closed: true
				})
			}
		});
		return result
	}
	let closedTabs:Tab[] = generateProgressItem()

	questionCouldAsked.subscribe((value) => (questionCouldAskedSub = value));
	const selfBURNING = () => {
		if (
			localStorage.getItem("version") == undefined ||
			localStorage.getItem("version") != courseItemVersion
		) {
			console.log("destorying old content");
			localStorage.clear();
			localStorage.setItem("version", courseItemVersion);
			location.reload();
		}
	};
	const checkIfAllComplete = () => {
		let iFComplete = 0;
		questionCouldAskedSub.forEach((element) => {
			if (element[0] == undefined) {
				iFComplete += 1;
			}
		});
		if (questionCouldAskedSub.length == iFComplete) {
			return true;
		} else {
			return false;
		}
	};
	const resetQuestionAskVAR = () => {
		let questionAsked = [];
		let progressItemsINlocalStorage = JSON.parse(
			localStorage.getItem("progress")
		);
		progressItemsINlocalStorage.forEach((element) => {
			let inCompleteindex = element.data;
			element.completed.forEach((els) => {
				inCompleteindex = inCompleteindex.filter(
					(value) => value != els
				);
			});
			questionAsked.push(inCompleteindex);
		});
		questionCouldAsked.set(questionAsked);
	};
	const startnow = () => {
		resetQuestionAskVAR();
		if (checkIfAllComplete() == false) {
			page.set(pageType.question);
		} else {
			OpenDialog("sorry All your Task has complete 🙅");
		}
	};

	function generateProgressItem() {
		let progressItem = [];
		courseItem.forEach((element) => {
			let QuestionIndex = [];
			element.ListQuestion.forEach((ele) => {
				QuestionIndex.push(ele.index);
			});
			progressItem.push({
				index: element.index,
				LessonName: element.LessonName,
				courseName: element.courseName,
				data: QuestionIndex,
				course: element.course,
				lesson: element.lesson,
				completed: [],
			});
		});
		return progressItem;
	}
	let progressItems;

	if (localStorage.getItem("progress") == undefined) {
		console.log("new so creating it");
		localStorage.setItem(
			"progress",
			JSON.stringify(generateProgressItem())
		);
		// }else if (generateProgressItem() != JSON.parse(localStorage.getItem('progress'))){
		// 	console.log("not same")
	} else {
		progressItems = JSON.parse(localStorage.getItem("progress"));
	}

	// let courseItem_In_DB = JSON.parse(localStorage.getItem("data"))
	let courseItem_In_DB = courseItem;
	const setLocalTime = () => {
		const currentTime = new Date().valueOf().toString();
		localStorage.setItem("lastLogin", currentTime);
	};
	const checkNewUser = () => {
		if (localStorage.getItem("lastLogin") == undefined) {
			return true;
		} else {
			return false;
		}
	};
	onMount(() => {
		if (checkNewUser() == true) {
			page.set(pageType.starter);
			localStorage.setItem("version", courseItemVersion);
		}
		selfBURNING();
		setLocalTime();
	});
	const courseFilter = (LessonIndex) => {
		return courseItem.filter((val) => val.course == LessonIndex);
	};
</script>

<svelte:window bind:innerWidth={clientWidth} />
<Dialog bind:open={$DialogOpen}>
	<h1>{$DialogText}</h1>
</Dialog>
{#if $navbarOpen == true}
	<Navbar />
{/if}
{#if currentPage == pageType.home}
	<div class="full">
		{#if clientWidth > 810}
			<Navbar />
		{/if}
		<main transition:fly={{ y: -200, duration: 400 }}>
			<div class="topbar">
				<div class="topset">
					{#if clientWidth < 810}
						<Menubtn
							on:click={() => {
								navbarOpen.set(true);
							}}
						/>
						<img src="/favicon.svg" alt="" class="logo" />
						<div>
							<span class="title">Saullingo</span>
						</div>
					{/if}
				</div>
				<!-- <span class="streak">Day streak: {dayStreak}</span> -->
				<span class="welcome"
					>Welcome! {timeText()}
					<img src={emojiText()} alt="" class="welcomeemoji" /></span
				>
			</div>
			<div class="maincontent">
				{#each courseItem_In_DB as course, i}
					{#if course.lesson == 0}
						<span
							class="courseName"
							style="background-color: {course.themeColor}"
							>{@html IPA(course.courseName)}</span>
						<div class="flashlearn">
							<button
								class="flashcard"
								on:click={() => {
									PageSwitchFlashcard(course.course);
								}}>Flashcard</button>
							<button
								class="learn"
								on:click={() => {
									PageSwitchLearnSection(course.course);
								}}>Learn</button>
						</div>
						<ExpandContent bind:closedTabs={closedTabs} course={course}/>
						{#if closedTabs[course.course].closed == false}
						<div class="courseSection" in:slide out:slide>
							{#each courseFilter(course.course) as cours, x}
								<div class="coursetext">
									{@html IPA(cours.LessonName)}
									<MiniProgressbar progressFloat={i + x} />
								</div>
							{/each}
						</div>
						{/if}
					{/if}
				{/each}
				<div class="bottom" />
			</div>
		</main>
	</div>
	<div class="backgroundblur">
		<StartNowExp on:click={startnow}/>
		<!-- <StartNow on:click={startnow}/> -->
	</div>
{:else if currentPage == pageType.learn}
	<Learn />
{:else if currentPage == pageType.flashcard}
	<Flashcardpage />
{:else if currentPage == pageType.update}
	<h1>Update</h1>
	<h2>Something is updating!!!</h2>
	<button on:click={home} class="startgo">goooo back</button>
{:else if currentPage == pageType.starter}
	<h1 class="starterA">welcome to saullingo</h1>
	<h2 class="starterA">saullingo is the gateway to language learning</h2>
	<button on:click={home} class="startgo">Lets goooo</button>
{:else if currentPage == pageType.question}
	<div transition:fly={{ y: 200, duration: 400 }}>
		<Questions />
	</div>
{:else if currentPage == pageType.settings}
	<Settings />
{:else}
	<h1>ERROR ERROR</h1>
{/if}

<style lang="scss">
	// home screen
	.topbar {
		width: 100vw;
		@media (min-width: 810px) {
			width: 79vw;
		}
	}
	.title {
		margin-left: 7px;
		@media (min-width: 810px) {
			margin-top: 2vh;
			margin-left: 2vw;
		}
		@include titlefont;
	}
	main {
		display: grid;
		grid-template-columns: auto;
		grid-template-rows: 20vh 80vh;
		@media (min-width: 810px) {
			grid-template-rows: 10vh 90vh;
		}
	}
	// .streak{
	// 	margin-left: 10px;
	// 	@include text-x;
	// }
	.backgroundblur {
		backdrop-filter: blur(5px);
		position: fixed;
		top: 90vh;
		height: 10vh;
		width: 100vw;
	display: flex;
justify-content: center;
align-items: center;}
	.coursetext {
		margin-top: 3vh;
		margin-left: 3vw;
		@include text-x;
	}
	.maincontent {
		display: grid;
		height: 80vh;
		// grid-template-columns: auto auto ;
		background-color: #dddddd;
		border-radius: 65px 65px 0px 0px;
		box-shadow: 0px -2px 51px 0px #848484;
		padding-top: 5vh;
		@media (min-width: 810px) {
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
	.learn {
		@include bigbutton-style;
		@include bigbutton-font;
		@include boxshadow-btn;
		margin-top: 1vh;
		width: 40vw;
		margin-left: 5vw;
		margin-right: 5vw;
		background-color: $friendly-color;
		@media (min-width: 810px) {
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
		@media (min-width: 810px) {
			width: 20vw;
		}
	}
	.courseSection {
		display: grid;
		grid-template-columns: auto auto;
	}
	.flashlearn {
		display: grid;
		grid-template-columns: auto auto;
	}
	.topset {
		display: grid;
		grid-template-columns: 15vw 15vw 40vw;
		align-items: center;
		justify-items: left;
		height: 13vh;
		@media (min-width: 810px) {
			// grid-template-columns: 5vw 5vw 70vw ;
			height: 2vh;
		}
	}
	.logo {
		width: 10vw;
		@media (min-width: 810px) {
			width: 5vw;
			margin-left: 1vw;
		}
		margin-left: 3vw;
	}
	.welcome {
		margin-left: 5vw;
		@include text-xx;
		display: flex;
		align-items: center;
		font-size: 20px;
		@media (min-width: 810px) {
			font-size: 25px;
		}
	}
	.welcomeemoji {
		margin-left: 1vw;
		width: 10vw;
		@media (min-width: 810px) {
			width: 50px;
		}
	}
	.full {
		display: flex;
		@media (min-width: 810px) {
			flex-direction: row;
			flex-wrap: nowrap;
		}
	}
	.starterA {
		margin-left: 3vw;
	}
</style>
