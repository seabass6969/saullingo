// l1q=["","Which of these is How are you: teni al neə (te-nee arl nair), neəni (nair-nee) or neə nɛlaweɪ (nair nel-ar-way)","Match up the words: 1-Hello, 2-Goodbye, 3-How are you  A-nɪneɪ (ni-nay), B-teni al neə (te-nee arl nair), C- neəni (nair-nee) Give your answer in this form (1A,2B,3C).","Match up the words: 1-How are you, 2-Good night, 3-Good Morning  A-neə nɛlaweɪ (nair nel-ar-way), B-teni al neə (te-nee arl nair), C- neə ɛɹæʒweɪ (nair e-raj-way) Give your answer in this form (1A,2B,3C).","How would you write How are you Kynan? (write your answer phonetically)","How would you write Good Morning Cyll (write your answer phonetically)","How would you write Hello Kynan, Goodbye Mimiër. (you may write your answer in IPA or phonetically)"]
//@ts-nocheck
import { questionTypes, type coursearr} from "./Question.d.ts";
export const courseItemVersion = "v1"
export const EmptyProgressItem = [{"index":1,"data":[1,2],"completed":[]},{"index":2,"data":[1],"completed":[]},{"index":3,"data":[1],"completed":[]},{"index":4,"data":[1],"completed":[]}]
export const courseItem: coursearr = [
	{
		index: 0,
		courseName: "greeting",
		ListQuestion: [
			{
				index: 0,
				question: "Which of these is Hello: neə nɛlaweɪ (nair nel-ar-way),nɪneɪ (ni-nay) or neəni (nair-nee). Type 1,2 or 3.",
				Type: questionTypes.SelectionQuestion,
				selection: ["1", "2", "3"],
				answer: "3",
			},
			{
				index: 1,
				question: "Which of these is Good night: nɪneɪ (ni-nay),neə ɛɹæʒweɪ (nair e-raj-way) or neə nɛlaweɪ (nair nel-ar-way). Type 1,2 or 3.",
				Type: questionTypes.SelectionQuestion,
				selection: ["1", "2", "3"],
				answer: "2",
			}
		],
		progressFloat: 0.75,
	},
	{
		index: 1,
		courseName: "DEF",
		ListQuestion: [
			{
				index: 0,
				question: "How to spell def",
				answer: "DEF",
				Type: questionTypes.LongQuestion,
			}
		],
		progressFloat: 0.25,
	},
	{
		index: 2,
		courseName: "GHI",
		ListQuestion: [
			{
				index: 0,
				question: "How to spell ghi",
				Type: questionTypes.LongQuestion,
				answer: "GHI",
			}
		],
		progressFloat: 1,
	},
	{
		index: 3,
		courseName: "JKL",
		ListQuestion: [
			{
				index: 0,
				question: "How to spell jkl",
				Type: questionTypes.LongQuestion,
				answer: "JKL",
			},
		],
		progressFloat: 0.75,
	},
];
