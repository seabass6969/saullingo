//@ts-ignore
import { questionTypes, type courses } from "./Question.d.ts";

export const courseItem:courses[] = [
	{index: 1, "courseName": "ABC", ListQuestion: [{"question": "How to spell abc", "questionType": questionTypes.LongQuestion, "answer": "ABC"}], progressFloat: 0.75},
	{index: 2, "courseName": "DEF", ListQuestion: [{"question": "How to spell def", "questionType": questionTypes.LongQuestion, "answer": "DEF"}], progressFloat: 0.25},
	{index: 3, "courseName": "GHI", ListQuestion: [{"question": "How to spell ghi", "questionType": questionTypes.LongQuestion, "answer": "GHI"}], progressFloat: 1},
	{index: 4, "courseName": "JKL", ListQuestion: [{"question": "How to spell jkl", "questionType": questionTypes.LongQuestion, "answer": "JKL"}], progressFloat: 0.75}
]