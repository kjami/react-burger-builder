import * as actionTypes from '../actions/actionTypes';

const initialState = {
    orders: null,
    error: null
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.GET_ORDERS:
            return {
                ...state,
                orders: action.payload.orders,
                error: false
            }
        case actionTypes.GET_ORDERS_ERROR:
            return {
                ...state, 
                error: action.error
            }
        case actionTypes.GET_ORDERS_REMOVE_ERROR:
            return {
                ...state, 
                error: null
            }
        default:
            return state;
    }
}

export default reducer;