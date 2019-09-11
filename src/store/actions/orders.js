import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const getOrdersSync = (payload) => {
    return {
        type: actionTypes.GET_ORDERS,
        payload: payload
    }
}

export const getOrders = () => {
    let payload = null;
    return dispatch => {
        axios.get("/orders.json")
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
                console.log(error);
                payload = { orders: null };
                dispatch(getOrdersSync(payload));
            });
    }
}