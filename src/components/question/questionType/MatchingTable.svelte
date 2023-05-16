<script lang="ts">
	import { IPA } from "../../../lib/IpaFont";
    export let choice: string[];
    export let toptable: string[] = [];
    export let lefttable: string[] = [];
    export let MatchQuestion: string[][] = [[]]
    export let TableSelection: string[] = []
	let clientWidth:number
	$: {
		console.log(MatchQuestion)
	}
	const leave = (event, index) => {
		try {
            event.target.style.borderColor = "#0036F8";
		} catch (error) {}
	};
	const enter = (event, index) => {
    event.preventDefault();
		if (event.target.classList.contains("B")) {
			event.target.style.borderColor = "cornflowerblue";
		}
	};
	const drag = (event, index) => {
		event.dataTransfer.setData("text/plain", index);
	};
	const drop = (event, index) => {
		event.preventDefault();
	};
    
</script>

<svelte:window bind:innerWidth={clientWidth}/>
<div class="questionContainer">
	<table>
		<tr>
			{#each toptable as top}
				<td class="toprow text">{@html IPA(top)}</td>
			{/each}
		</tr>
		{#each MatchQuestion as mt,y}
			 <tr class="rows">
				<td class="toprow text">{@html (lefttable[y])}</td>
				{#each mt as ms,x}
                    {#if ms == undefined}
					<td class="row text">empty</td>
                    {:else}
					<td class="row text toprow">{@html IPA(ms)}</td>
                    {/if}
				{/each}
			 </tr>
		{/each}
	</table>
    <table class="selectionArea">
        <tr>
        {#each TableSelection as tb, index}
            <td class="selectionItem"
				draggable="true"
				on:dragstart={(event) => drag(event, index)}
				on:dragover={(event) => enter(event, index)}
				on:dragleave={(event) => leave(event, index)}
				on:drop={(event) => drop(event, index)}
            >{tb}</td>
        {/each}
        </tr>
    </table>
</div>

<style lang="scss">
	.questionContainer {
		margin-left: $margin-question;
		margin-right: $margin-question;
		display: grid;
		grid-template-rows: 70% 30%;
	}
	.row {
        border-width: 2px;
        border-color: $friendly-color;
        border-style: solid;
	}
	.rows{
		height: fit-content;
	}
	.toprow{
		border-width: 2px;
		border-color: $correct-color;
		border-style: solid;
	}
	.text {
		@include text-x;
	}
    .selectionArea {
		border-width: 2px;
		border-color: $secondary-color;
		border-style: solid;
    }
    .selectionItem{
		border-width: 2px;
		border-color: $friendly-color;
        margin: 10px;
		border-style: solid;
    }
</style>
