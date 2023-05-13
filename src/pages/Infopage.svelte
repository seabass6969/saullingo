<script lang="ts">
    import Close from "../components/Utillity/Close.svelte";
	import { pageType } from "../lib/TQuestion";
	import { page } from "../lib/stores";
    const close = () => {
        page.set(pageType.home)
    }
</script>
<div class="DictonaryPage">
<div class="topFlash">
	<Close on:click={close}/>
		<div class="dictTitle">info</div>
</div>
<br>
    <div class="maincontent">

<h1>
Welcome to Saullingo where you can progress through a variety of courses on your journey to learning the language or hɛɾɪnəʊ, the language of the Cyll.
</h1> 
<h2 class="title"> The Language: </h2>
<br>
<span class="content">
The language of hɛɾɪnəʊ is a dialect of the elven language spoken by the Cyll the inhabitants of the Golden Isle. The Cyll are a community of elves and druids and are named after their first queen, the Lady Cyll, an elven princess. The language has evolved over time and has been influenced by the Druid’s speech to make it different from its maiden tongue.
</span>
<br>
<h2 class="title">
The Script:
</h2>
<br>
<span class="content">
The script of hɛɾɪnəʊ is the same one used by the elven language. It is very different to the English writing system in the fact that it prioritises consonants and that vowels are of lesser importance. Learning the script is available as part of this course however is optional and is not often used outside of this section.
</span>
<br>
<h2 class="title">
The IPA:
</h2>
<br>
<span class="content">
The IPA (international phonetic alphabet) is an alphabet containing all the phonemes used in language, it is used often in this site as a way of easily showing how the words of hɛɾɪnəʊ are pronounced. If you are struggling to type these symbols try using this website. If you want to hear the IPA use this or this.
</span>
<br>
<h2 class="title">
The Website:
</h2>
<br>
<span class="content">
The language of hɛɾɪnəʊ and the information in this website was created by Saul.
Special thanks to Cephas who did an incredible job coding and constructing this website.
</span>
</div>
</div>
<style lang="scss">
    .topFlash {
        display: grid;
        grid-template-columns: 10% 90%;
        align-items: center;
        justify-items: center;
    }
	.dictTitle{
		@include text-x;
	}
    .maincontent{
        margin-left: $margin-question;
        margin-right: $margin-question;
    }
    .content{
        @include text-x
    }
    .title {
        @include text-xx
    }
</style>