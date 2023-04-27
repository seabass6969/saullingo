import { DialogOpen, DialogText } from "./stores"

export function OpenDialog(text){
    DialogOpen.set(true)
    DialogText.set(text)
}