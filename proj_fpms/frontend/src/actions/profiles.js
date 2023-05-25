import axios from 'axios'
import { createMessages, returnErrors } from './messages'
import { GET_PROFILE } from './types'
import { tokenConfig } from './auth'

export const getProfile = (id) => (dispatch, getState) => {
    axios.get(`/api/user/${id}`, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            });
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}