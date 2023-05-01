import { CourseLearn, courseFlashcard } from "./CourseItem"
import { OpenDialog } from "./DialogUtils"
import { pageType } from "./TQuestion"
import { LearnIndexOn, flashcardIndexOn, page } from "./stores"

export const PageSwitchFlashcard = (course:number) => {
    if(courseFlashcard.filter((value) => value.courseIndex == course).length != 0){
        flashcardIndexOn.set(course)
        page.set(pageType.flashcard)
    }else{
        OpenDialog("Oh no! Seems like this Flashcard section is not there yet! 🚧")
    }
}
export const PageSwitchLearnSection = (course:number) => {
    if(CourseLearn.filter((value) => value.courseIndex == course).length != 0){
        LearnIndexOn.set(course)
        page.set(pageType.learn)
    }else{
        OpenDialog("Oh no! Seems like this Learn section is not there yet! 🚧")
    }
}

export const home = () => page.set(pageType.home) 