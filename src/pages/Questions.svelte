<script lang="ts">
	import { fly, slide } from "svelte/transition";
	import BigProgressBar from "../components/BigProgressBar.svelte";
	import FloatingAnimation from "../components/FloatingAnimation.svelte";
	import Matching from "../components/Matching.svelte";
	import Radiobox from "../components/Radiobox.svelte";
	import { courseItem } from "../lib/CourseItem";
	//@ts-ignore
	import { pageType, questionStatus, questionTypes} from "../lib/TQuestion";
	import { spin } from "../lib/animation";
	import { page, questionCouldAsked, questionOn, questionOnbyID, questionStats} from "../lib/stores";
	import Reorder from "../components/Reorder.svelte";
	import AnswerPreview from "../components/AnswerPreview.svelte";
	import Close from "../components/Close.svelte";
	import { IPA } from "../lib/IpaFont";
	import TextArea from "../components/TextArea.svelte";
	import { OpenDialog } from "../lib/DialogUtils";
	import Check from "../components/Check.svelte";
	let stats = questionStatus.answer 
	let questionAsked
	let questionOns 
	let questionType = questionTypes.LongQuestion
	let answerboz
	let clientWidth
	const resetQuestionAskVAR = () => {
		let questionAsked = []
		let progressItems = JSON.parse(localStorage.getItem("progress"))
		progressItems.forEach(element => {
			let inCompleteindex = element.data
			element.completed.forEach(els => {
				inCompleteindex = inCompleteindex.filter(value => value != els)
			});
			questionAsked.push(inCompleteindex)
		});
		questionCouldAsked.set(questionAsked)
	}
	const close = () => page.set(pageType.home)
	questionStats.set(questionStatus.answer)

	function checkingAnswerLogic (): boolean{
		if (questionType == questionTypes.LongQuestion) {
			if(answerboz == $questionOn["answer"]) return true
			if(answerboz != $questionOn["answer"]) return false
		}else if (questionType == questionTypes.MatchingQuestion){
			let index = 0
			let corrected_times = 0
			let suppose_times = $questionOn["answer"].length
			answerboz.forEach(element=> {
				if(element[1] == $questionOn["answer"][index][1]) {corrected_times++}
				index++
			});
			if(corrected_times == suppose_times) return true
			if(corrected_times != suppose_times) return false
		}else if (questionType == questionTypes.SelectionQuestion){
			if(answerboz == $questionOn["answer"]) return true
			if(answerboz != $questionOn["answer"]) return false
		}else if (questionType == questionTypes.ReorderQuestion){
			try {
				let index = 0
				let corrected_times = 0
				let suppose_times = $questionOn["answer"].length
				answerboz.forEach(element=> {
					if(element == $questionOn["answer"][index]) {corrected_times++}
					index++
				});
				if(corrected_times == suppose_times) return true
				if(corrected_times != suppose_times) return false
			} catch (error) {
				return false
			}
		}
	}
	const check = () => {
		if(checkingAnswerLogic()){
			questionStats.set(questionStatus.correct)
		}else{
			questionStats.set(questionStatus.wrong)
		}
	}
	// const forgot = () => {questionStats.set(questionStatus.forgot)}
	const checkingIfAllQuestionDone = () => {
		let iFComplete = 0
		$questionCouldAsked.forEach(element => {
			if(element[0] == undefined){
				iFComplete += 1
			}
		});
		if($questionCouldAsked.length == iFComplete){
			return true
		}else{
			return false
		}
	}
	const next = () => {
		setingCompleting()
		resetQuestionAskVAR()
		changeQuestionOn()
		questionStats.set(questionStatus.answer)
		answerboz = ""
		if(checkingIfAllQuestionDone() == true){
			OpenDialog("all are done for now")
			page.set(pageType.home)
		}
	}
	const again = () => {questionStats.set(questionStatus.answer)}
	questionStats.subscribe(value => stats = value)
	const setingCompleting = () => {
		let localStorageProgress = JSON.parse(localStorage.getItem("progress"))
		localStorageProgress[$questionOnbyID[0]]["completed"].push($questionOnbyID[1])
		localStorage.setItem("progress", JSON.stringify(localStorageProgress))
	}
	const changeQuestionOn = () => {
		let indexOn = 0
		let questionOna = 0
		let completed = false
		questionAsked.forEach(element => {
			if(completed == false){
				if(element[0] == undefined){
					indexOn+=1
				}else{
					questionOna = element[0]
					questionOnbyID.set([indexOn, questionOna])
					questionOn.set(courseItem[indexOn]["ListQuestion"][questionOna])
					questionType = courseItem[indexOn]["ListQuestion"][questionOna].Type
					completed = true
				}
			}
		});
	}

	questionCouldAsked.subscribe(value =>{questionAsked = value; changeQuestionOn()})
	questionOn.subscribe(value => {questionOns = value;})
	// animations area
	let activeAnimation = false
	$: {
		ProgressFloat = getProgressFloat()
		if(stats == questionStatus.correct){
			activeAnimation = true
		}else{
			activeAnimation = false
		}
	}
	const getProgressFloat = ():number => {
		let localStorageItem = JSON.parse(localStorage.getItem("progress"))[$questionOnbyID[0]]
		return localStorageItem.completed.length / localStorageItem.data.length
	}
	let ProgressFloat = getProgressFloat()
</script>
<FloatingAnimation active={activeAnimation} />
<svelte:window bind:innerWidth={clientWidth} />
<main>
	<div class="topbar" transition:slide={{duration: 500}}>
		<div class="inTest">
			<Close on:click={close}/>
			<BigProgressBar progressFloat={ProgressFloat}/>
		</div>
		<div class="titlebar">
			<span class="coursetitle"><span style="background-color: {courseItem[$questionOnbyID[0]].themeColor}">{@html IPA(courseItem[$questionOnbyID[0]].courseName)}</span> - {@html IPA(courseItem[$questionOnbyID[0]].LessonName)}</span>
			<span class="progressNumber"></span>
		</div>
	</div>
	{#if stats == questionStatus.answer}
	 	{#if questionType == questionTypes.LongQuestion}
			<div class="question">
				<span class="questions">Question: Type your answer</span>
				<span class="description">{@html IPA($questionOn["question"])}</span>
				<span class="typehere">Type text here:</span>
				<TextArea bind:choice={answerboz}/>
		<button class="forgot" on:click={check} >Forgot</button>
		<!-- <button class="check" on:click={check}>Check</button> -->
		<Check on:click={check} />
			</div>
		{:else if questionType == questionTypes.MatchingQuestion}
			<div class="Matchquestion">
				<span class="questions">Question: Matching</span>
				<span class="description">{@html IPA($questionOn["question"])}</span>
				<span class="typehere">Match
					{#if clientWidth <= 815}
						by pressing n swap
					{:else}
						by dragging
					{/if}
				:</span>
				<Matching bind:choice={answerboz} matchA={$questionOn["matchA"]} matchB={$questionOn['matchB']}/>
		<button class="forgot" on:click={check} >Forgot</button>
		<!-- <button class="check" on:click={check}>Check</button> -->
		<Check on:click={check} />
			</div>
		{:else if questionType == questionTypes.SelectionQuestion}
			<div class="question">
				<span class="questions">Question: Click On you Answer</span>
				<span class="description">{@html IPA($questionOn["question"])}</span>
				<span class="typehere">click answer:</span>
				<Radiobox bind:choice={answerboz} option={$questionOn["selection"]}/>
		<button class="forgot" on:click={check} >Forgot</button>
		<!-- <button class="check" on:click={check}>Check</button> -->
		<Check on:click={check} />
			</div>
		{:else if questionType == questionTypes.ReorderQuestion}
			<div class="question">
				<span class="questions">Question: Reorder Answer </span>
				<span class="description">{@html IPA($questionOn["question"])}</span>
				<span class="typehere">Reorder by pressing on it:</span>
				<Reorder bind:choice={answerboz} option={$questionOn["selection"]}/>
		<button class="forgot" on:click={check} >Forgot</button>
		<!-- <button class="check" on:click={check}>Check</button> -->
		<Check on:click={check} />
			</div>
		{/if}
	<!-- {:else if stats == questionStatus.forgot}
		<div class="forgotPage" out:fly={{x: 200, duration: 200}}>
			<span class="forgotText">Going back later</span>
			<span class="questions">Question: Type your answer</span>
			<span class="description">{$questionOn["question"]}</span>
			<span class="typehere">answer:</span>
			<AnswerPreview answer={$questionOn["answer"]} questionType={questionType} option={$questionOn["selection"]} matchA={$questionOn["matchA"]} matchB={$questionOn['matchB']}/>
		<button class="next" on:click={next}>next</button>
		</div> -->
	{:else if stats == questionStatus.wrong}
		<div class="correctwrongPage" in:spin={{duration: 400}} out:fly={{x: 200, duration: 200}} class:matchcorrectwrongPage={questionType == questionTypes.MatchingQuestion}>
			<span class="wrongText">Wrong!</span>
			<span class="description">{@html IPA($questionOn["question"])}</span>
			<span class="typehere">answer:</span>
			<AnswerPreview answer={$questionOn["answer"]} questionType={questionType} option={$questionOn["selection"]} matchA={$questionOn["matchA"]} matchB={$questionOn['matchB']}/>
		<button class="next" on:click={again}>again</button>
		</div>
	{:else if stats == questionStatus.correct}
		<div class="correctwrongPage correctPage" out:fly={{x: 200, duration: 200}} class:matchcorrectwrongPage={questionType == questionTypes.MatchingQuestion}>
			<span class="correctText">Well done!</span>
			<span class="questions">Question: Type your answer</span>
			<span class="description">{@html IPA($questionOn["question"])}</span>
			<span class="typehere">answer:</span>
			<AnswerPreview answer={$questionOn["answer"]} questionType={questionType} option={$questionOn["selection"]} matchA={$questionOn["matchA"]} matchB={$questionOn['matchB']}/>
		<button class="next" on:click={next}>next</button>
		</div>
	{/if}
</main>
<style lang="scss">
	// Answering screen
	.topbar {
		width: 100vw;
		background-color: #DDDDDD;
		border-radius: 0px 0px 30px 30px;
		box-shadow: 2px 2px 51px -10px rgb(37,0,171);
	}
	main {
		display: grid;
		grid-template-columns: auto;
		grid-template-rows: 15vh 59vh 13vh 13vh;
	}
	.Matchquestion {
		display: grid;
		grid-template-columns: auto;
		grid-template-rows: 7vh 7vh 5vh 40vh 13vh 13vh;
	}
	.question {
		display: grid;
		grid-template-columns: auto;
		grid-template-rows: 7vh 22vh 5vh 25vh 13vh 13vh;
	}

	.wrongText{
		margin-left: $margin-question;
		margin-top: 10px;
		@include text-question;
		color: $alert-color;
	}
	.correctText{
		margin-left: $margin-question;
		margin-top: 10px;
		@include text-question;
		color: $correct-color;
		font-weight: bolder;
	}
	.correctwrongPage{
		display: grid;
		grid-template-columns: auto;
		grid-template-rows: 6vh 7vh 9vh 50vh 13vh;
	}
	.correctPage {
		grid-template-rows: 6vh 7vh 9vh 10vh 40vh 13vh;
	}
	.matchcorrectwrongPage{
		display: grid;
		grid-template-columns: auto;
		grid-template-rows: 6vh 7vh 7vh 5vh 43vh 13vh 13vh;
	}
	.coursetitle{
		margin-left: 15px;
		margin-top: 7px;
		@include text-small;
		@media (min-width: 810px){
			margin-top: 24px;
		}
	}
	.inTest {
		display: grid;
		grid-template-columns: auto auto;
	}
	.progressNumber {
		margin-top: 7px;
		margin-right: 10px;
		@include text-xx
	}
	.titlebar {
		display: grid;
		grid-template-columns: 85% 15%;
	}
	.questions {
		margin-top: 10px;
		margin-left: $margin-question;
		@include text-question;
	}
	// .check {
	// 	background-color: $base-color;
	// 	@include bigbutton-style;
	// 	@include bigbutton-font;
	// 	@include boxshadow-btn;
	// 	height: 10vh;
	// 	margin-top: 1vh;
	// 	margin-bottom: 1vh;
	// 	@media (min-width: 810px) {
	// 		height: 8vh;
	// 		width: 30vw;
	// 		margin-left: 35vw;
	// 		margin-right: 35vw;
	// 	}
	// }
	.forgot{
		background-color: $alert-color;
		@include bigbutton-style;
		@include bigbutton-font;
		@include boxshadow-btn;
		height: 10vh;
		margin-top: 1vh;
		margin-bottom: 1vh;
		@media (min-width: 810px) {
			height: 8vh;
			width: 30vw;
			margin-left: 35vw;
			margin-right: 35vw;
		}
	}
	.description {
		margin-left: $margin-question;
		@include text-x;
	}
	.typehere {
		margin-left: $margin-question;
		@include text-extra-small;
	}
	.next {
		background-color: #E6FF9E;
		@include bigbutton-style;
		@include bigbutton-font;
		@include boxshadow-btn;
		height: 10vh;
		margin-top: 1vh;
		margin-bottom: 1vh;
	}
</style>