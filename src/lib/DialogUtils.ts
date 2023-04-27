import { alertType, alertconfirmType } from "./Question"
import { DialogConform, DialogOpen, DialogText, AlertBoxType} from "./stores"

function waitChange(){
    return new Promise(resolver => {
        DialogConform.subscribe((val)=> {
            if(val != alertconfirmType.waiting){
                resolver(val)
            }
        })
        
    })
}
export async function OpenDialogConform(text:string){
    AlertBoxType.set(alertType.confirm)
    DialogText.set(text)
    DialogOpen.set(true)
    let changes = await waitChange()
    return changes
}
export function OpenDialog(text:string, TypeAlert: alertType = alertType.simple){
    AlertBoxType.set(TypeAlert)
    DialogText.set(text)
    DialogOpen.set(true)
}