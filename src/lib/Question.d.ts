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
	LongQuestion,
	Selection
}
export interface QuestionSample {
	index: number,
	question: string,
	answer: string
}
export interface SelectionQuestion extends QuestionSample{
	questionType: questionTypes.Selection,
	selection: string[],
}
export interface LongQuestion extends QuestionSample{
	questionType: questionTypes.LongQuestion,
}
export type DifferentQuestion = SelectionQuestion | LongQuestion
export interface courses {
	index: number,
	courseName: string,
	ListQuestion: DifferentQuestion[],
	progressFloat: number
}