import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const getOrdersSync = (payload) => {
    return {
        type: actionTypes.GET_ORDERS,
        payload: payload
    }
}

export const getOrdersErrorSync = (error) => {
    return {
        type: actionTypes.GET_ORDERS_ERROR,
        error: error
    }
}

export const getOrdersRemoveError = () => {
    return {
        type: actionTypes.GET_ORDERS_REMOVE_ERROR
    }
}

export const getOrders = (payload) => {
    return dispatch => {
        if (payload.token && payload.userId) {
            axios.get('/orders.json?auth=' + payload.token + '&orderBy="userId"&equalTo="' + payload.userId + '"')
                .then(response => {
                    let orders = response.data;
                    if (orders) {
                        orders = Object.keys(orders).map(id => {
                            return {
                                ...orders[id],
                                id: id,
                            };
                        });
                    }
                    payload = { orders: orders || [] };
                    dispatch(getOrdersSync(payload));
                })
                .catch(error => {
                    dispatch(getOrdersErrorSync(error));
                });
        } else {
            dispatch(getOrdersErrorSync(new Error("No token")));
        }
    }
}