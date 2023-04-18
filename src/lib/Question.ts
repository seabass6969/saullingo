export enum questionStatus {
	answer,
	forgot,
	wrong,
	correct
}
export enum pageType {
	question,
	home,
	starter,
	update
}
export enum questionTypes {
	LongQuestion = "long",
	SelectionQuestion = "select",
	MatchingQuestion = "match"
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
export interface MatchingQuestioning {
	index: number,
	question: string,
	answer: string[][],
	Type: questionTypes.MatchingQuestion,
	matchA: string[],
	matchB: string[]
}
export type DifferentQuestion = SelectionQuestioning | LongQuestioning | MatchingQuestioning
export interface courses {
	index: number,
	courseName: string,
	ListQuestion: DifferentQuestion[],
}
export type coursearr = courses[]