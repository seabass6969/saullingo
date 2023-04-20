<script lang="ts">
	import type { questionTypes } from "../lib/Question";

    export let questionType:questionTypes
    export let answer
</script>
{#if questionType == questionTypes.LongQuestion}
{:else if questionType == questionTypes.MatchingQuestion}
{:else if questionType == questionTypes.SelectionQuestion}
{/if}