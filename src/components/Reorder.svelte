<script lang="ts">
	import { fade } from "svelte/transition";

    export let choice = []
    export let option = []
    let choices = []
    function optionadd(opt){
        choices.push(opt)
        choice = choices
    }
    function optionremove(opt){
        choices = choices.filter(value => opt != value)
        choice = choices
    }
</script>

<div class="reorder">
    <div class="choose">
        {#each option as opt}
            <button  class="option" on:click={() => optionadd(opt)} disabled={choice.indexOf(opt) != -1} class:disabling={choice.indexOf(opt) != -1}>{opt}</button>
        {/each}
    </div>
    <div class="choices">
        {#each choice as c}
            <button in:fade={{duration: 1000}} class="answer" on:click={() => optionremove(c)}>{c}</button>
        {/each}
    </div>
</div>
<style lang="scss">
    .reorder{
		margin-left: $margin-question;
    }
    .option {
        border-style: solid;
        border-radius: 5px;
        border-width: 1px;
        border-color: $base-color;
        margin: 4px;
        font-size: 1rem;
        color:black
    }
    .answer {
        border-style: solid;
        border-radius: 5px;
        border-width: 1px;
        border-color: $secondary-color;
        margin: 4px;
        font-size: 1rem;
    }
    .disabling {
        color:white
    }
</style>