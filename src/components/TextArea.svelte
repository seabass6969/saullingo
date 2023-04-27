<script>
    export let choice = ""
    const accentList = [
        "à","â","æ","ç","é","è","ê","ë","î","ï","ô","œ","ù","û","ü","ÿ"
    ]
    const insertText = (text) => {
        choice += text
    }
</script>

<div class="textareaContainer">
    <textarea name="" id="" class="answerbox textareas" bind:value={choice} ></textarea>
    <div class="accentInsert">
        {#each accentList as ac}
            <button class="accents" on:click={() => {insertText(ac)}}>{ac}</button>
        {/each}
    </div>
</div>
<style lang="scss">
	.answerbox {
		border-style: none;
		background: #9ED6FF;
        width: 81vw;
        height: 15vh
	}
    	.textareas {
		@include text-xx
	}
    textarea{
        resize: none;
    }
    .textareaContainer {
		margin-left: $margin-question;
		margin-right: $margin-question;
    }
    .accents {
        margin-top: 10px;
        margin-right: 7px;
        border-style: solid;
        border-width: 2px;
        border-color: $friendly-color;
        @include text-x;
    }
</style>