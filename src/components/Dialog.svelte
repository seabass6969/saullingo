<script>
	import { dropDown } from "../lib/animation";
    
    export let open = false
    const closer = () => {
        open = false
    }
</script>
{#if open == true}
    <dialog class="dialogbox" in:dropDown={{duration: 1000}} out:fade> 
        <slot></slot>
        <button class="continu" on:click={closer}>OK</button>
    </dialog>
{/if}
<style lang="scss">
    .dialogbox {
        background: rgb(42,100,192);
        background: radial-gradient(circle, rgba(42,100,192,1) 0%, rgba(255,255,243,1) 0%, rgba(246,255,240,1) 48%, rgba(255,239,254,1) 100%); 
        border-color: dimgrey;
        transform: translateY(50px);
        // animation: forwards 400ms moveopen;
        width: 80vw;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    @keyframes moveopen {
        0%{
            transform: translateY(-200px);
        }
        100%{
            transform: translateY(0px);
        }
    }
    .continu {
		@include bigbutton-style;
		@include bigbutton-font;
		@include boxshadow-btn;
		background-color: $alert-color;
        width: 75vw;
        margin: 0;
    }
</style>