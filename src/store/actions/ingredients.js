import * as actionTypes from './actionTypes';

import axios from '../../axios-orders';

export const addIngredient = (payload) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        payload: payload
    }
}

export const removeIngredient = (payload) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        payload: payload
    }
}

export const getIngredientsSync = (payload) => {
    return {
        type: actionTypes.GET_INGREDIENTS,
        payload: payload
    }
}

export const getIngredients = () => {
    let payload = null;
    return dispatch => {
        axios.get('/ingredients.json')
            .then(response => {
                payload = { ingredients: response.data };
                dispatch(getIngredientsSync(payload));
            })
            .catch(error => {
                console.log(error);
                payload = { ingredients: null };
                dispatch(getIngredientsSync(payload));
            });
    }
}

export const getIngredientPricesSync = (payload) => {
    return {
        type: actionTypes.GET_INGREDIENT_PRICES,
        payload: payload
    }
}

export const getIngredientPrices = () => {
    let payload = null;
    return dispatch => {
        axios.get('/ingredientPrice.json')
            .then(response => {
                payload = { ingredientPrices: response.data };
                dispatch(getIngredientPricesSync(payload));
            })
            .catch(error => {
                console.log(error);
                payload = { ingredientPrices: null };
                dispatch(getIngredientPricesSync(payload));
            });
    }
}