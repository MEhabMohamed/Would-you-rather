import { ANSWER_QUESTION, RECEIVE_QUESTIONS, ADD_QUESTION } from '../actions/questions'


export default function questions (state = {}, action) {
    switch(action.type) {
       case RECEIVE_QUESTIONS:
            return {
                ...state,
                ...action.questions
            }
        case ANSWER_QUESTION:
            return {
                ...state,
                [action.id]: {
                    ...state[action.id],
                    [action.value]: {
                        ...state[action.id][action.value],
                        votes: state[action.id][action.value].votes.includes(action.authedUser) 
                        ? state[action.id][action.value].votes 
                        : state[action.id][action.value].votes.concat([action.authedUser])
                                }
                        },
                }
            case ADD_QUESTION:
                return {
                    ...state,
                    [action.question.id]: action.question
                }
        default:
            return state
    }
}