import * as actionTypes from '../actions/actionTypes';

const initialState = {
    orders: null
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.GET_ORDERS:
            return {
                ...state,
                orders: action.payload.orders
            }
        default:
            return state;
    }
}

export default reducer;