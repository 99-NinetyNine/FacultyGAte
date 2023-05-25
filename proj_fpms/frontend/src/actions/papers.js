import axios from 'axios'
import { createMessages, returnErrors } from './messages'

import { GET_PAPERS, DELETE_PAPERS, ADD_PAPERS, SEARCH_PAPERS, GET_PAPER, PUT_PAPERS } from './types'

import { tokenConfig } from './auth'


export const getPapers = (id) => (dispatch, getState) => {
    axios.get(`/api/papers/${id}/get_user_posts`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_PAPERS,
                payload: res.data
            });
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

export const getPaper = (id) => (dispatch, getState) => {
    axios.get(`/api/papers/${id}`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_PAPER,
                payload: res.data
            });
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}



export const searchPapers = (value) => (dispatch, getState) => {
    axios.get(`/api/search/?search=${value}`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: SEARCH_PAPERS,
                payload: res.data
            });
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

export const searchPapersAuthors = (value) => (dispatch, getState) => {
    axios.get(`/api/search/authors/?search=${value}`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: SEARCH_PAPERS,
                payload: res.data
            });
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

export const searchPapersTitle = (value) => (dispatch, getState) => {
    axios.get(`/api/search/title/?search=${value}`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: SEARCH_PAPERS,
                payload: res.data
            });
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}
export const searchAllField = (value) => (dispatch, getState) => {
    axios.get(`/api/search/any/?search=${value}`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: SEARCH_PAPERS,
                payload: res.data
            });
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}



// export const getPapers = () => (dispatch, getState) => {
//     axios.get(`/api/papers/`, tokenConfig(getState))
//         .then(res => {
//             dispatch({
//                 type: GET_PAPERS,
//                 payload: res.data
//             });
//         })
//         .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
// }


export const deletePapers = (id) => (dispatch, getState) => {
    axios
        .delete(`/api/papers/${id}`, tokenConfig(getState))
        .then(res => {
            dispatch(createMessages({ deletePaper: "Paper Deleted" }))
            dispatch({
                type: DELETE_PAPERS,
                payload: id
            });
        })
        .catch(err => console.log(err));



}


export const putPapers = (id, paper) => (dispatch, getState) => {

    const body = JSON.stringify(paper)
    console.log("The body is ", body)

    axios
        .put(`/api/papers/${id}/`, body, tokenConfig(getState))
        .then((res) => {
            dispatch(createMessages({ editPaper: "Paper Edited" }))
            dispatch({
                type: PUT_PAPERS,
                payload: res.data
            });
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));

}


export const addPapers = (paper) => (dispatch, getState) => {

    const body = JSON.stringify(paper)
    console.log("The body is ", body)

    axios
        .post(`/api/papers/`, body, tokenConfig(getState))
        .then((res) => {
            dispatch(createMessages({ addPaper: "Paper Added" }))
            dispatch({
                type: ADD_PAPERS,
                payload: res.data
            });
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));



}