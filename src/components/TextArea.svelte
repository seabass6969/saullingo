<script lang="ts">
    export let choice = ""
    function splitStr(strings:string, index:number): string[]{
        let out = ["", ""]
        let splt = strings.split('')
        let indexOn = 0
        splt.forEach(element => {
            if(indexOn < index){
                out[0] = out[0] + element
            }else {
                out[1] = out[1] + element
            }
            indexOn += 1
        });
        return out
    }
    function sliceStr(strings: string, start:number, end:number, replace:string): string{
        let topstring = strings.slice(0,start-1)
        let bottomstring = strings.slice(end)
        return topstring + replace + bottomstring
    }
    let thistext:HTMLTextAreaElement
    const accentList = [
        "à","â","æ","ç","é","è","ê","ë","î","ï","ô","œ","ù","û","ü","ÿ"
    ]
    const insertText = (text) => {
        if(thistext.selectionStart || thistext.selectionEnd === 0){
            let [topstring,bottomstring] = splitStr(choice, thistext.selectionStart)
            choice = topstring + text + bottomstring
            thistext.focus()
        }
    }
</script>

<div class="textareaContainer">
    <textarea name="" id="" class="answerbox textareas" bind:value={choice} bind:this={thistext}></textarea>
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