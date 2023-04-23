// l1q=["","Which of these is How are you: teni al neə (te-nee arl nair), neəni (nair-nee) or neə nɛlaweɪ (nair nel-ar-way)","Match up the words: 1-Hello, 2-Goodbye, 3-How are you  A-nɪneɪ (ni-nay), B-teni al neə (te-nee arl nair), C- neəni (nair-nee) Give your answer in this form (1A,2B,3C).","Match up the words: 1-How are you, 2-Good night, 3-Good Morning  A-neə nɛlaweɪ (nair nel-ar-way), B-teni al neə (te-nee arl nair), C- neə ɛɹæʒweɪ (nair e-raj-way) Give your answer in this form (1A,2B,3C).","How would you write How are you Kynan? (write your answer phonetically)","How would you write Good Morning Cyll (write your answer phonetically)","How would you write Hello Kynan, Goodbye Mimiër. (you may write your answer in IPA or phonetically)"]
import { questionTypes, type coursearr} from "./Question";
export const courseItemVersion = "v3"
export const courseItem: coursearr = [
	{
		index: 0,
		LessonName: "SOV and other structure",
		courseName: "Grammar/Structure of hɛɾɪnəʊ",
		course:0,
		lesson: 0,
		themeColor: "#cb7676",
		ListQuestion: [
			{
				index: 0,
				question: "Which of the following is the correct Subject Object Verb order for hɛɾɪnəʊ?",
				Type: questionTypes.SelectionQuestion,
				selection: ["SOV", "OSV", "VSO"],
				answer: "VSO",
			},
			{
				index: 1,
				question: "What does VSO stand for?",
				Type: questionTypes.SelectionQuestion,
				selection: ["Verb Sentence Order", "Verb Subject Object", "Volatile Subject Order"],
				answer: "Verb Subject Object",
			},
			{
				index: 2,
				question: "Reorder the words in the sentence “The man walked” as if it were written in hɛɾɪnəʊ:",
				Type: questionTypes.ReorderQuestion,
				selection: ["The", "man", "walked"],
				answer: ["walked", "man"]
			},
			{
				index: 3,
				question: "Reorder the words in the sentence “Kynan can swim and he is good” as if it were written in hɛɾɪnəʊ:",
				Type: questionTypes.ReorderQuestion,
				selection: ["Bob", "can", "swim", "and", "he", "is", "good."],
				answer: ["can","swim", "Bob" ,"and", "is", "he", "good."]
			},
			{
				index: 4,
				question: "Rewrite the following sentence as if it were written in hɛɾɪnəʊ. “Mimiër likes eating bread but she hates mushrooms”",
				answer: "likes eating Mimiër bread but hates she mushrooms",
				Type: questionTypes.LongQuestion,
			}
		],
	},
	{
		index: 1,
		LessonName: "Conjugating regular verbs",
		courseName: "Grammar/Structure of hɛɾɪnəʊ",
		course:0,
		lesson: 1,
		themeColor: "#cb7676",
		ListQuestion: [
			{
				index: 0,
				question: "How to spell def",
				answer: "DEF",
				Type: questionTypes.LongQuestion,
			}
		],
	},
	{
		index: 2,
		LessonName: "GHI",
		courseName: "Script and Writing",
		course:1,
		lesson: 0,
		themeColor: "#e0a25c",
		ListQuestion: [
			{
				index: 0,
				question: "How to spell ghi",
				Type: questionTypes.LongQuestion,
				answer: "GHI",
			}
		],
	},
	{
		index: 3,
		LessonName: "JKLsa",
		courseName: "Script and Writing",
		course:1,
		lesson: 1,
		themeColor: "#e0a25c",
		ListQuestion: [
			{
				index: 0,
				question: "How to spell jkl",
				Type: questionTypes.LongQuestion,
				answer: "JKL",
			},
		],
	},
	{
		index: 4,
		LessonName: "JKL",
		courseName: "JJ singer",
		course:2,
		lesson: 0,
		themeColor: "#e500f9",
		ListQuestion: [
			{
				index: 0,
				question: "How to spell jkl",
				Type: questionTypes.LongQuestion,
				answer: "JKL",
			},
		],
	},
	{
		index: 5,
		LessonName: "JKLL",
		courseName: "JJ singer",
		course:2,
		lesson: 1,
		themeColor: "#e500f9",
		ListQuestion: [
			{
				index: 0,
				question: "How to spell jkll",
				Type: questionTypes.LongQuestion,
				answer: "JKL",
			},
		],
	},
];
