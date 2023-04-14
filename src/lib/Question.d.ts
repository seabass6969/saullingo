export enum questionStatus {
	answer,
	forgot,
	wrong,
	correct
}
export enum pageType {
	question,
	home,
	starter
}
export enum questionTypes {
	LongQuestion = "long",
	SelectionQuestion = "select"
}
export interface QuestionSample {
	index: number,
	question: string,
	answer: string
}

export interface SelectionQuestioning extends QuestionSample{
	Type: questionTypes.SelectionQuestion,
	selection: string[],
}
export interface LongQuestioning extends QuestionSample{
	Type: questionTypes.LongQuestion
}
export type DifferentQuestion = SelectionQuestioning | LongQuestioning
export interface courses {
	index: number,
	courseName: string,
	ListQuestion: DifferentQuestion[],
	progressFloat: number
}
export type coursearr = courses[]