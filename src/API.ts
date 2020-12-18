import {shuffleArray} from './utils';

export type Question = {
    category: string;
    type: string;
    correct_answer: string;
    difficulty: string;
    incorrect_answers: string[];
    question: string
}

export type QuestionsState = Question & {answers: string[]}; 


export enum Difficulty {
    EASY = 'easy',
    MEDIUM = 'medium',
    HARD = 'hard',
}

export const fetchQuizQuestions = async (amount: number, difficulty: Difficulty) => {
    const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`
    console.log(endpoint);
    const resp = await fetch(endpoint);
    const data = await resp.json();
    return data.results.map( (questionObj: Question) => {
        return {
            // ...questionObj,// деструктурируем все данные объекта, что бы не описывать каждый
            category: questionObj.category,
            type: questionObj.type,
            correct_answer: questionObj.correct_answer,
            difficulty: questionObj.difficulty,
            incorrect_answers: questionObj.incorrect_answers,
            question: questionObj.question,
            answers: shuffleArray([...questionObj.incorrect_answers, questionObj.correct_answer]) //новое поле со всеми возможными ответами
        }
    } )
}