<script lang="ts">
	export let choice: string[];
    export let toptable: string[] = [];
    export let lefttable: string[] = [];
    export let MatchQuestion: string[][] = [[]]
	let clientWidth
	$: {
		console.log(MatchQuestion)
	}
</script>

<svelte:window bind:innerWidth={clientWidth}/>
<div class="questionContainer">
	<table>
		<tr>
			{#each toptable as top}
				<td class="toprow">{top}</td>
			{/each}
		</tr>
		{#each MatchQuestion as mt,y}
			 <tr class="rows">
				<td class="toprow">{lefttable[y]}</td>
				{#each mt as ms,x}
					<td class="row" class:toprow={ms != undefined}>{ms == undefined ? "" : ms}</td>
				{/each}
			 </tr>
		{/each}
	</table>
	<h1>Coming soon 🚧</h1>
</div>

<style lang="scss">
	.questionContainer {
		margin-left: $margin-question;
		display: grid;
		grid-template-columns: 50% 50%;
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
</style>
