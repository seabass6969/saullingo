import { writable } from "svelte/store";
//@ts-ignore
import { pageType, questionStatus} from "./Question.d.ts";

export const page = writable(pageType.home)
export const questionStats = writable(questionStatus.answer)
export const questionCouldAsked = writable([])
export const questionOn = writable([])