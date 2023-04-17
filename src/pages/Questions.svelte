<script>
	import BigProgressBar from "../components/BigProgressBar.svelte";
	import FloatingAnimation from "../components/FloatingAnimation.svelte";
	import Radiobox from "../components/Radiobox.svelte";
	import { courseItem } from "../lib/CourseItem";
	//@ts-ignore
	import { pageType, questionStatus, questionTypes} from "../lib/Question.d.ts";
	import { page, questionCouldAsked, questionOn, questionOnbyID, questionStats} from "../lib/stores";
	let stats = questionStatus.answer 
	let questionAsked
	let questionOns 
	let questionType = questionTypes.LongQuestion
	let answerboz
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
	const check = () => {
		if(answerboz == $questionOn["answer"]){
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
			alert("all are done for now")
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
		if(stats == questionStatus.correct){
			activeAnimation = true
		}else{
			activeAnimation = false
		}
	}

</script>
<FloatingAnimation active={activeAnimation} />
<main>
	<div class="topbar">
		<div class="inTest">
			<button class="close" on:click={close}></button>
			<BigProgressBar progressFloat={1}/>
		</div>
		<div class="titlebar">
			<span class="coursetitle">Course {$questionOnbyID[0]} - {courseItem[$questionOnbyID[0]].courseName}</span>
			<span class="progressNumber"></span>
		</div>
	</div>
	{#if stats == questionStatus.answer}
	 	{#if questionType == questionTypes.LongQuestion}
			<div class="question">
				<span class="questions">Question: Type your answer</span>
				<span class="description">{$questionOn["question"]}</span>
				<span class="typehere">Type text here:</span>
				<input type="text" name="" id="" class="answerbox" bind:value={answerboz}>
			</div>
		{:else if questionType == questionTypes.SelectionQuestion}
			<div class="question">
				<span class="questions">Question: Click On you Answer</span>
				<span class="description">{$questionOn["question"]}</span>
				<span class="typehere">click answer:</span>
				<Radiobox bind:choice={answerboz} option={$questionOn["selection"]}/>
			</div>
		{/if}
		<button class="forgot" on:click={check} >Forgot</button>
		<button class="check" on:click={check}>Check</button>
	{:else if stats == questionStatus.forgot}
		<div class="forgotPage">
			<span class="forgotText">Going back later</span>
			<span class="questions">Question: Type your answer</span>
			<span class="description">{$questionOn["question"]}</span>
			<span class="typehere">answer:</span>
			<div class="answers">{$questionOn["answer"]}</div>
		</div>
		<button class="next" on:click={next}>next</button>
	{:else if stats == questionStatus.wrong}
		<div class="wrongPage">
			<span class="wrongText">Wrong!</span>
			<span class="questions">Question: Type your answer</span>
			<span class="description">{$questionOn["question"]}</span>
			<span class="typehere">answer:</span>
			<div class="answers">{$questionOn["answer"]}</div>
		</div>
		<button class="next" on:click={again}>again</button>
	{:else if stats == questionStatus.correct}
		<div class="correctPage">
			<span class="correctText">Well done!</span>
			<span class="questions">Question: Type your answer</span>
			<span class="description">{$questionOn["question"]}</span>
			<span class="typehere">answer:</span>
			<div class="answers">{$questionOn["answer"]}</div>
		</div>
		<button class="next" on:click={next}>next</button>
	{/if}
</main>
<style lang="scss">
	// Answering screen
	$margin-question: 10vw;
	.topbar {
		width: 100vw;
		background-color: #DDDDDD;
	}
	main {
		display: grid;
		grid-template-columns: auto;
		grid-template-rows: 15vh 59vh 13vh 13vh;
	}
	.question {
		display: grid;
		grid-template-columns: auto;
		grid-template-rows: 13vh 20vh 5vh 13vh;
	}

	.wrongText{
		margin-left: $margin-question;
		margin-top: 10px;
		@include text-question;
		color: $alert-color;
	}
	.wrongPage{
		display: grid;
		grid-template-columns: auto;
		grid-template-rows: 10vh 10vh 20vh 5vh 13vh;
	}
	.correctText{
		margin-left: $margin-question;
		margin-top: 10px;
		@include text-question;
		color: $base-color;
	}
	.correctPage{
		display: grid;
		grid-template-columns: auto;
		grid-template-rows: 10vh 10vh 20vh 5vh 13vh;
	}
	.forgotPage{
		display: grid;
		grid-template-columns: auto;
		grid-template-rows: 10vh 10vh 20vh 5vh 13vh;
	}
	.forgotText {
		margin-left: $margin-question;
		margin-top: 10px;
		@include text-question;
		color: red;
	}
	.close {
		width: 45px;
		height: 45px;
		border-radius: 10px;	
		margin-top: 3vw;
		margin-left: 3vw;
		background-color: $alert-color;
		border: 0px;
		@include boxshadow-btn-small;
	}
	.coursetitle{
		margin-left: 15px;
		margin-top: 7px;
		@include text-xx;
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
	.check {
		background-color: $base-color;
		@include bigbutton-style;
		@include bigbutton-font;
		@include boxshadow-btn;
		height: 10vh;
		margin-top: 1vh;
		margin-bottom: 1vh;
	}
	.forgot{
		background-color: $alert-color;
		@include bigbutton-style;
		@include bigbutton-font;
		@include boxshadow-btn;
		height: 10vh;
		margin-top: 1vh;
		margin-bottom: 1vh;
	}
	.description {
		margin-left: $margin-question;
		@include text-x;
	}
	.typehere {
		margin-left: $margin-question;
		font-family: 'Kaisei Tokumin';
		font-style: normal;
		font-weight: 800;
		font-size: 15px;
		line-height: 22px;
	}
	.answerbox {
		margin-left: $margin-question;
		margin-right: $margin-question;
		border-style: none;
		background: #9ED6FF;
	}
	.answers{
		margin-left: $margin-question;
		margin-right: $margin-question;
		border-style: none;
		background: #E6FF9E;
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