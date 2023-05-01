<script lang="ts">
	import type { Tab, courses } from "../lib/TQuestion";

    export let closedTabs:Tab[]
    export let course:courses
</script>
<button on:click={()=>{closedTabs[course.course].closed = closedTabs[course.course].closed ? false : true}} class="toggle">
<span class="material-symbols-outlined">
{#if closedTabs[course.course].closed == false}
    expand_less
{:else}
expand_more
{/if}
</span>
</button>
<style lang="scss">
    .toggle{
		@include bigbutton-style;
		@include bigbutton-font;
		@include boxshadow-btn;
		margin-top: 5vh;
		width: 10vw;
        margin-left: 45vw;
		background-color: $base-color;
        display: flex;
        justify-content: center;
        align-items: center;
		@media (min-width: 810px) {
            margin-left: 35vw;
		}
    }
</style>