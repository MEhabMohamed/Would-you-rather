import { ADD_QUESTION, ANSWER_QUESTION } from '../actions/questions'
import { RECEIVE_USERS } from '../actions/users'

export default function users (state = {}, action) {
    switch(action.type) {
       case RECEIVE_USERS:
            return {
                ...state,
                ...action.users
            }
        case ANSWER_QUESTION:
            const user = action.authedUser
            return {
                ...state,
                [user]: {
                    ...state[user],
                    answers: {
                        ...state[user].answers,
                        [action.id]: action.value
                    },
                },
            }
        case ADD_QUESTION:
            return {
                ...state,
                [action.question.author]: {
                    ...state[action.question.author],
                    questions: state[action.question.author].questions.concat([action.question.id])
                        }
                    }
        default:
            return state
    }
}