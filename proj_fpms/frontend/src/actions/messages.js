import { CREATE_MESSAGES, GET_ERRORS } from './types'

export const createMessages = msg => {
    return {
        type: CREATE_MESSAGES,
        payload: msg
    }
}

export const returnErrors = (msg, status) => {
    return {
        type: GET_ERRORS,
        payload: { msg, status }
    }
}