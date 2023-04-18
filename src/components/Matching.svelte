<script lang="ts">
    export let choice:string[]
    export let matchA:string[]
    export let matchB:string[]
    choice = []
    let matchAmatchB = []
    let index = 0
    matchA.forEach(element => {
        matchAmatchB.push([element, matchB[index]])
        index += 1
    });
</script>

<div class="questionContainer">
    {#each matchAmatchB as AB}
        <div class="matchItem A">{AB[0]}</div>
        <div class="matchItem B">{AB[1]}</div>
    {/each}
</div>
<style lang="scss">
    .questionContainer{
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
    .B{
        margin: 5px
    }
</style>