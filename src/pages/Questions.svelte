<script>
	import BigProgressBar from "../components/BigProgressBar.svelte";
	//@ts-ignore
	import { pageType, questionStatus} from "../lib/Question.d.ts";
	import { page, questionStats } from "../lib/stores";
	let stats = questionStatus.answer 
	const close = () => page.set(pageType.home)
	questionStats.set(questionStatus.answer)
	const check = () => questionStats.set(questionStatus.right)
	const forgot = () => questionStats.set(questionStatus.forgot)
	const next = () => questionStats.set(questionStatus.answer)
	questionStats.subscribe(value => stats = value)
</script>
<main>
	<div class="topbar">
		<div class="inTest">
			<button class="close" on:click={close}></button>
			<BigProgressBar progressFloat={0.75}/>
		</div>
		<div class="titlebar">
			<span class="coursetitle">course 1 - ABC</span>
			<span class="progressNumber">75%</span>
		</div>
	</div>
	{#if stats == questionStatus.answer}
		<div class="question">
			<span class="questions">Question: Type your answer</span>
			<span class="description">ABC</span>
			<span class="typehere">Type text here:</span>
			<input type="text" name="" id="" class="answerbox">
		</div>
		<button class="forgot" on:click={forgot}>Forgot</button>
		<button class="check" on:click={check}>Check</button>
	{:else if stats == questionStatus.forgot}
		<div class="question">
			<span class="questions">Question: Type your answer</span>
			<span class="description">ABC</span>
			<span class="typehere">answer:</span>
			<div class="answers">ABVCCKJBDSLKJFHSLDFJ</div>
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