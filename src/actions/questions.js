import { saveQuestion, saveQuestionAnswer } from "../utils/api"
import { showLoading , hideLoading } from 'react-redux-loading'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ANSWER_QUESTION = 'ANSWER_QUESTION'
export const ADD_QUESTION = 'ADD_QUESTION'

function addQuestion (question) {
    return {
        type: ADD_QUESTION,
        question
    }
}

export function handleAddQuestion (optionOne, optionTwo) {
    return (dispatch, getState) => {
        const { authedUser } = getState()
        dispatch(showLoading())
        return saveQuestion({
            optionOneText: optionOne,
            optionTwoText: optionTwo,
            author: authedUser
        }).then((question) => dispatch(addQuestion(question)))
          .then(() => dispatch(hideLoading()))
    }
}

export function receiveQuestions (questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions
    }
}

function answerQuestion ({ authedUser , id , value }) {
    return {
        type: ANSWER_QUESTION,
        authedUser,
        id,
        value
    }
}

export function handleAnswerQuestion ({ authedUser , id , value }) {
    return (dispatch) => {
        dispatch(showLoading())
        return saveQuestionAnswer({
            authedUser,
            qid: id,
            answer: value
        })
        .then(() => dispatch(answerQuestion({ authedUser , id , value })))
        .then(() => dispatch(hideLoading()))
    }
}