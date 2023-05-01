// l1q=["","Which of these is How are you: teni al neə (te-nee arl nair), neəni (nair-nee) or neə nɛlaweɪ (nair nel-ar-way)","Match up the words: 1-Hello, 2-Goodbye, 3-How are you  A-nɪneɪ (ni-nay), B-teni al neə (te-nee arl nair), C- neəni (nair-nee) Give your answer in this form (1A,2B,3C).","Match up the words: 1-How are you, 2-Good night, 3-Good Morning  A-neə nɛlaweɪ (nair nel-ar-way), B-teni al neə (te-nee arl nair), C- neə ɛɹæʒweɪ (nair e-raj-way) Give your answer in this form (1A,2B,3C).","How would you write How are you Kynan? (write your answer phonetically)","How would you write Good Morning Cyll (write your answer phonetically)","How would you write Hello Kynan, Goodbye Mimiër. (you may write your answer in IPA or phonetically)"]
import { questionTypes, type coursearr, type Flashcard, type LearnSection} from "./TQuestion";
export const courseItemVersion = "v3"
export const courseItem: coursearr = [
	{
		index: 0,
		LessonName: "SOV and other structure",
		courseName: "Grammar/Structure of <ipa>hɛɾɪnəʊ</ipa>",
		course:0,
		lesson: 0,
		themeColor: "#cb7676",
		optional: false,
		ListQuestion: [
			{
				index: 0,
				question: "Which of the following is the correct Subject Object Verb order for <ipa>hɛɾɪnəʊ</ipa>?",
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
				question: "Reorder the words in the sentence “The man walked” as if it were written in <ipa>hɛɾɪnəʊ</ipa>:",
				Type: questionTypes.ReorderQuestion,
				selection: ["The", "man", "walked"],
				answer: ["walked", "man"]
			},
			{
				index: 3,
				question: "Reorder the words in the sentence “Kynan can swim and he is good” as if it were written in <ipa>hɛɾɪnəʊ</ipa>:",
				Type: questionTypes.ReorderQuestion,
				selection: ["Bob", "can", "swim", "and", "he", "is", "good."],
				answer: ["can","swim", "Bob" ,"and", "is", "he", "good."]
			},
			{
				index: 4,
				question: "Rewrite the following sentence as if it were written in <ipa>hɛɾɪnəʊ</ipa>. “Mimiër likes eating bread but she hates mushrooms”",
				answer: "likes eating Mimiër bread but hates she mushrooms",
				Type: questionTypes.LongQuestion,
			}
		],
	},
	{
		index: 1,
		LessonName: "Conjugating regular verbs",
		courseName: "Grammar/Structure of <ipa>hɛɾɪnəʊ</ipa>",
		course:0,
		lesson: 1,
		themeColor: "#cb7676",
		optional: false,
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
		optional: true,
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
		optional: true,
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
		optional: false,
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
		optional: false,
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
export const courseFlashcard: Flashcard[] =[
	{
		courseIndex: 0,
		courseName: "Grammar/Structure of <ipa>hɛɾɪnəʊ</ipa>",
		listFlashcard: [
			{
				lessonBasedOn: 0,
				front: "correct Subject Object Verb order for <ipa>hɛɾɪnəʊ</ipa>?",
				back: "VSO"
			},
			{
				lessonBasedOn: 0,
				front: "VSO meaning",
				back: "verb subject object"
			},
		]
	},
	{
		courseIndex: 1,
		courseName: "Grammar/Structure of <ipa>hɛɾɪnəʊ</ipa>",
		listFlashcard: [
			{
				lessonBasedOn: 0,
				front: "abc",
				back: "ABC"
			},
			{
				lessonBasedOn: 0,
				front: "bbc",
				back: "BBC is media group"
			},
		]
	},
	{
		courseIndex: 2,
		courseName: "JJ singer",
		listFlashcard: [
			{
				lessonBasedOn: 0,
				front: "def",
				back: "ddd"
			},
			{
				lessonBasedOn: 0,
				front: "aaa",
				back: "aaa is just letter"
			},
		]
	},
]
export const CourseLearn: LearnSection[] = [
	{
		courseIndex: 0,
		courseName: "Grammar/Structure of <ipa>hɛɾɪnəʊ</ipa>",
		learn: "Before you get started learning any words you must first learn the structure of <ipa>hɛɾɪnəʊ</ipa>. This first lesson is on SOV and sentence structure.<br>SOV stands for Subject, Object, Verb and tells you in what order the sentence is written. In english we use SVO for example “I ate the apple” however in <ipa>hɛɾɪnəʊ</ipa> you would write “ate I the apple” as this is in VSO the order that <ipa>hɛɾɪnəʊ</ipa> uses.<br>When writing sentences in this order, split them into phrases, for example “I like eating bread and I like eating toast” is “like eating I bread and like eating I toast”. This sentence also shows that when using two verbs next to one another they both go at the beginning of the phrase.<br>One more thing to note <ipa>hɛɾɪnəʊ</ipa> has no words for “a” or “the” so make sure not to type these!<br>"
	}
]