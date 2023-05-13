
export enum questionStatus {
	answer,
	forgot,
	wrong,
	correct
}
export enum pageType {
	settings,
	learn,
	question,
	home,
	flashcard,
	starter,
	update,
	installhowto,
	dictionary,
	info
}
export enum alertType {
	simple,
	confirm
}
export enum alertconfirmType {
	no,
	yes,
	waiting
}
// Question Type start here
export enum questionTypes {
	LongQuestion = "long",
	SelectionQuestion = "select",
	MatchingQuestion = "match",
	ReorderQuestion = "reorder",
	TableMatchingQuestion = "tablematch",
}
export interface QuestionSample {
	index: number,
	question: string,
	answer: string
}

export interface ReorderQuestioning {
	index: number,
	question: string,
	answer: string[]
	Type: questionTypes.ReorderQuestion,
	selection: string[],
}
export interface SelectionQuestioning extends QuestionSample{
	Type: questionTypes.SelectionQuestion,
	selection: string[],
}
export interface LongQuestioning extends QuestionSample{
	Type: questionTypes.LongQuestion
}
export interface MatchingQuestioning {
	index: number,
	question: string,
	answer: string[][],
	Type: questionTypes.MatchingQuestion,
	matchA: string[],
	matchB: string[]
}
export interface TableMatching {
	index: number,
	question: string,
	answer: string[][],
	Type: questionTypes.TableMatchingQuestion,
	MatchQuestion: (string | undefined)[][],
	TopTable: string[],
	LeftTable: string[]
}
export type DifferentQuestion = SelectionQuestioning | LongQuestioning | MatchingQuestioning | ReorderQuestioning | TableMatching
export interface courses {
	index: number,
	LessonName: string,
	courseName: string,
	course: number,
	lesson: number
	ListQuestion: DifferentQuestion[],
	themeColor: string
	optional: boolean
}
export type coursearr = courses[]
// flashcard Types
export interface Flashcard {
	courseIndex: number,
	courseName: string,
	listFlashcard: FlashcardList[]
}
export interface FlashcardList {
	lessonBasedOn: number,
	front: string,
	back: string
}
// learn types
export interface BasicLearn {
	lessonIndex:number,
	lessonName:string,
}
export enum LearnType {
	simple = "simpleLearn",
	html = "HTMLLearn"
}
export interface LearnByLesson extends BasicLearn{
	learn:string,
	Type: LearnType.simple
}
export interface HTMLlearnByLesson extends BasicLearn{
	HTML: string,
	Type: LearnType.html
}
export interface LearnSection{
	courseIndex: number,
	courseName: string
	ByLesson: (LearnByLesson | HTMLlearnByLesson)[]
}
export const isLearnByLesson = (Learn: LearnByLesson | HTMLlearnByLesson):boolean => {
	if(Learn.Type == LearnType.simple){
		return true
	}else{
		return false 
	}
}
// Tabs Type
export interface Tab {
	courseIndex: number,
	closed: boolean
}
// dictionary type
interface dictionary {
	english: string,
	result:string 
} 
export type dictionarys = dictionary[]