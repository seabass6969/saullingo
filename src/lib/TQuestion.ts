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
export enum questionTypes {
	LongQuestion = "long",
	SelectionQuestion = "select",
	MatchingQuestion = "match",
	ReorderQuestion = "reorder"
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
export type DifferentQuestion = SelectionQuestioning | LongQuestioning | MatchingQuestioning | ReorderQuestioning
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

export interface LearnSection{
	courseIndex: number,
	courseName: string
	ByLesson: {
		lessonIndex:number,
		lessonName:string,
		learn:string
	}[]
}
export interface Tab {
	courseIndex: number,
	closed: boolean
}
interface dictionary {
	english: string,
	result:string 
} 
export type dictionarys = dictionary[]