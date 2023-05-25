import axios from 'axios'
import { returnErrors, createMessages } from './messages';

import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    PASSWORD_RESET,
    RESET_FAIL,
    PASSWORD_RESET_CONFIRM
} from './types'




export const loadUser = () => (dispatch, getState) => {
    // User Loading
    dispatch({ type: USER_LOADING });

    axios
        .get('/api/auth/user', tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: USER_LOADED,
                payload: res.data,
            });
        })
        .catch((err) => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: AUTH_ERROR,
            });
        });
};


export const login = (username, password) => (dispatch) => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ username, password });


    axios.post('/api/auth/login', body, config)
        .then(res => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            })
        }).catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status))
            dispatch({
                type: LOGIN_FAIL,
                payload: err.response.data
            })
        })

}

export const logout = () => (dispatch, getState) => {
    axios
        .post('/api/auth/logout/', null, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: LOGOUT_SUCCESS,
            });
        })
        .catch((err) => {
            dispatch(returnErrors(err.response.data, err.response.status));
        });
};


export const register = ({ username, password, email, profile }) => (dispatch) => {
    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    // Request Body
    const body = JSON.stringify({ username, email, password, profile });

    axios
        .post('/api/auth/register', body, config)
        .then((res) => {
            dispatch(createMessages({ verifyEmail: 'Please verify your email.' }));
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data,
            });
        })
        .catch((err) => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: REGISTER_FAIL,
            });
        });
};




export const resetPassword = (email) => (dispatch) => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ email });


    axios.post('/api/auth/reset-pass', body, config)
        .then(res => {
            dispatch(createMessages({ otpSent: "OTP sent to your email." }))
            dispatch({
                type: PASSWORD_RESET,
                payload: res.data
            })
        }).catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status))
            dispatch({
                type: RESET_FAIL,
                payload: err.response.data
            })
        })

}

export const resetConfirm = (username, otp, newPass) => (dispatch) => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ username, otp, newPass });
    console.log(body)

    axios.post('/api/auth/resetpassconfirm', body, config)
        .then(res => {
            dispatch(createMessages({ passwordReset: "Your password has been reset." }))
            dispatch({
                type: PASSWORD_RESET_CONFIRM,
                payload: res.data
            })
        }).catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status))
            dispatch({
                type: RESET_FAIL,
                payload: err.response.data
            })
        })

}

export const tokenConfig = (getState) => {

    const token = getState().auth.token;

    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    if (token) {
        config.headers['Authorization'] = `Token ${token}`;
    }

    return config;
};