export enum questionTypes {
	LongQuestion,
	Selection
}
export interface QuestionSample {
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