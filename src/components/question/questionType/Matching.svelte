<script lang="ts">
	export let choice: string[];
	export let matchA: string[];
	export let matchB: string[];
	let matchAmatchB = [];
	let clientWidth
	function genMatch() {
		matchAmatchB = [];
		let index = 0;
		matchA.forEach((element) => {
			matchAmatchB.push([element, matchB[index]]);
			index += 1;
		});
        choice = matchAmatchB
	}
	genMatch();
	const leave = (event, index) => {
		try {
			if (event.target.classList.contains("B")) {
				event.target.style.borderColor = "#0036F8";
			}
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
        let swapperA = matchB[index]
        let swapperB = matchB[event.dataTransfer.getData("text/plain")]
        matchB[event.dataTransfer.getData("text/plain")] = swapperA
        matchB[index] = swapperB
        genMatch()
	};
	let movingA = -1
	const movingabout = (index) => {
		if(movingA == -1){
			movingA = index
		}else{
			let swappingA = matchB[movingA]
			let swappingB = matchB[index]
			matchB[index] = swappingA
			matchB[movingA] = swappingB
			movingA = -1
			genMatch()
		}
	}
</script>

<svelte:window bind:innerWidth={clientWidth}/>
<div class="questionContainer">
	{#each matchAmatchB as AB, index}
		<div class="matchItem A">{AB[0]}</div>
		 {#if clientWidth <= 815}
		 	<button class="matchItem B" on:click={()=>movingabout(index)}>{AB[1]}</button>
		 {:else}
			<div
				class="matchItem B"
				draggable="true"
				on:dragstart={(event) => drag(event, index)}
				on:dragover={(event) => enter(event, index)}
				on:dragleave={(event) => leave(event, index)}
				on:drop={(event) => drop(event, index)}
			>
				{AB[1]}
			</div>
		 {/if}
	{/each}
</div>

<style lang="scss">
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
