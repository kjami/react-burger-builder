import * as actionTypes from '../actions/actionTypes';

const initialState = {
    token: null,
    userId: null,
    loading: false,
    error: false
}

const authStart = (state, action) => {
    const updatedState = {
        ...state,
        loading: true
    }
    return updatedState;
}

const authSuccess = (state, action) => {
    const updatedState = {
        ...state,
        token: action.payload.token,
        userId: action.payload.userId,
        error: false,
        loading: false
    }
    return updatedState;
}

const authFail = (state, action) => {
    const updatedState = {
        ...state, 
        error: action.error,
        loading: false
    }
    return updatedState;
}

const authLogout = (state, action) => {
    const updatedState = {
        ...state,
        token: null,
        userId: null
    };
    return updatedState;
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return authStart(state, action);
        case actionTypes.AUTH_SUCCESS:
            return authSuccess(state, action);
        case actionTypes.AUTH_FAIL:
            return authFail(state, action);
        case actionTypes.AUTH_LOGOUT:
            return authLogout(state, action);
        default:
            return state;
    }
}

export default reducer;