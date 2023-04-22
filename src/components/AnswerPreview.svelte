<script lang="ts">
	import { questionTypes } from "../lib/Question";

	export let questionType: questionTypes;
	export let answer;
	export let option = [];
	export let matchA = []
	export let matchB = []
	let matchAmatchB = []
	function genMatch() {
		matchAmatchB = [];
		let index = 0;
		matchA.forEach((element) => {
			matchAmatchB.push([element, matchB[index]]);
			index += 1;
		});
	}
	if(matchA != undefined){
		genMatch()
	}
</script>

{#if questionType == questionTypes.LongQuestion}
	<div class="answers">{answer}</div>
{:else if questionType == questionTypes.MatchingQuestion}
	<div class="questionContainer">
		{#each matchAmatchB as AB}
			<div class="matchItem A">{AB[0]}</div>
				<div class="matchItem B">{AB[1]}</div>
		{/each}
	</div>
{:else if questionType == questionTypes.SelectionQuestion}
	<div class="answerContainerRadio">
		{#each option as opt}
			<button
				class="buttonsRadio"
				class:buttonsRadioCorrect={answer == opt}
				disabled
				><span
					class="material-symbols-outlined"
					class:red={answer == opt}
				>
					{#if answer == opt}
						radio_button_checked
					{:else}
						radio_button_unchecked
					{/if}
				</span>
				{opt}</button
			>
		{/each}
	</div>
{:else if questionType == questionTypes.ReorderQuestion}
	<div class="answerContainer">
		{#each answer as ans}
			<button class="ReorderBTN" disabled>{ans}</button>
		{/each}
	</div>
{/if}

<style lang="scss">
	.answers {
		margin-left: $margin-question;
		margin-right: $margin-question;
		border-style: none;
		background: #e6ff9e;
	}
	.answerContainer {
		margin-left: $margin-question;
	}
	.ReorderBTN {
		border-style: solid;
		border-radius: 5px;
		border-width: 1px;
		border-color: $secondary-color;
		margin: 4px;
		font-size: 1rem;
		color: black;
	}
	.answerContainerRadio {
		margin-left: 10vw;
		display: grid;
		grid-template-columns: auto;
		margin-right: 10vw;
	}
	.buttonsRadio {
		padding: 5px;
		margin: 1px;
		display: flex;
		justify-content: left;
		border-style: solid;
		border-color: $secondary-color;
		align-items: center;
	}

	.buttonsRadioCorrect {
		border-color: $base-color;
	}
	.red {
		color: red;
	}

	.questionContainer {
		margin-left: $margin-question;
		display: grid;
		grid-template-columns: 50% 50%;
	}
	.matchItem {
		border-width: 5px;
		border-radius: 10px;
		border-style: solid;
		padding: 5px;
		border-color: $secondary-color;
		user-select: none;
	}
	.A {
		margin: 5px;
	}
	.B {
		margin: 5px;
	}
</style>
