<script>
	import { fade } from "svelte/transition";
	import { dropDown } from "../lib/animation";
	import { AlertBoxType, DialogConform } from "../lib/stores";
	import { alertType, alertconfirmType } from "../lib/TQuestion";
    
    export let open = false
    const closer = () => {
        open = false
    }
    const OK= () => {
        DialogConform.set(alertconfirmType.yes)
        open = false
        DialogConform.set(alertconfirmType.waiting)
    }
    const No= () => {
        DialogConform.set(alertconfirmType.no)
        open = false
        DialogConform.set(alertconfirmType.waiting)
    }
</script>
{#if open == true}
    <dialog class="dialogbox" in:dropDown={{duration: 1000}} out:fade> 
        {#if $AlertBoxType == alertType.simple}
            <slot></slot>
            <button class="continu" on:click={closer}>OK</button>
        {:else if $AlertBoxType == alertType.confirm}
            <slot></slot>
            <div class="OKYES">
                <button class="continu" on:click={OK}>Yes</button>
                <button class="continu" on:click={No}>No</button>
            </div>
        {/if}
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
        display: grid;
        grid-template-columns: 70% 30%;
        align-items: center;
        justify-content: center;
        z-index: 13;
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
        width: 20vw;
        margin: 1vw;
    }
    .OKYES {
        display: grid;
        grid-template-rows: auto auto;
    }
</style>