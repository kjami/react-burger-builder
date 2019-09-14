import * as actionTypes from './actionTypes';
import axios from 'axios';

const API_KEY = "AIzaSyBjrWlqGRKVI3AOm-LOY6ypIikKfEaFhbE";

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (payload) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        payload: payload
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expirationDate');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const logoutAfterExpiration = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const getAuthToken = (payload) => {
    return dispatch => {
        let url = null;
        if (payload.method && payload.method.toLowerCase() === "signin") {
            url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" + API_KEY;
        } else if (payload.method && payload.method.toLowerCase() === "signup") {
            url = " https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + API_KEY;
        }
        dispatch(authStart());
        axios.post(url, {
            email: payload.email,
            password: payload.password,
            returnSecureToken: true
        }).then(response => {
            const expiryDate = new Date(new Date().getTime() + (response.data.expiresIn * 1000));
            //To store token and expiration time in to local storage for persistance on reload
            localStorage.setItem('token', response.data.idToken);
            localStorage.setItem('userId', response.data.localId);
            localStorage.setItem('expirationDate', expiryDate);
            dispatch(authSuccess({
                token: response.data.idToken,
                userId: response.data.localId
            }));
            dispatch(logoutAfterExpiration(response.data.expiresIn));
        })
        .catch(error => {
            dispatch(authFail(error.response.data.error));
            // return Promise.reject(error);
        });
    }
}

export const authCheckState = (payload) => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            const userId = localStorage.getItem('userId');
            if (expirationDate > new Date()) {
                dispatch(authSuccess({
                    token: token,
                    userId: userId
                }));
                dispatch(logoutAfterExpiration((expirationDate - (new Date()).getTime())/1000));
            } else {
                dispatch(logout());
            }
        }
    }
}