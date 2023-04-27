import { writable } from "svelte/store";
//@ts-ignore
import { pageType, questionStatus} from "./Question.ts";

export const page = writable(pageType.home)
export const questionStats = writable(questionStatus.answer)
export const questionCouldAsked = writable([])
export const questionOn = writable()
export const questionOnbyID = writable([0,0])
export const flashcardIndexOn = writable(0)
export const flashcardOn = writable(0)
export const LearnIndexOn = writable(0)
export const DialogOpen = writable(false)
export const DialogText = writable("")