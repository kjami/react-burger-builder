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

export const getIngredientsErrorSync = () => {
    return {
        type: actionTypes.GET_INGREDIENTS_ERROR
    }
}

export const getIngredients = () => {
    let payload = null;
    return dispatch => {
        axios.get('/ingredients.json')
            .then(response => {
                payload = { ingredients: response.data };
                dispatch(getIngredientsSync(payload));
                dispatch(increaseIngredientsLoader());
            })
            .catch(error => {
                console.log(error);
                dispatch(getIngredientsErrorSync());
                dispatch(increaseIngredientsLoader());
            });
    }
}

export const getIngredientPricesSync = (payload) => {
    return {
        type: actionTypes.GET_INGREDIENT_PRICES,
        payload: payload
    }
}

export const getIngredientPricesErrorSync = () => {
    return {
        type: actionTypes.GET_INGREDIENT_PRICES_ERROR
    }
}

export const getIngredientPrices = () => {
    let payload = null;
    return dispatch => {
        axios.get('/ingredientPrice.json')
            .then(response => {
                payload = { ingredientPrices: response.data };
                dispatch(getIngredientPricesSync(payload));
                dispatch(increaseIngredientsLoader());
            })
            .catch(error => {
                console.log(error);
                dispatch(getIngredientPricesErrorSync());
                dispatch(increaseIngredientsLoader());
            });
    }
}

export const closeIngredientsErrorModal = () => {
    return {
        type: actionTypes.CLOSE_INGREDIENTS_ERROR_MODAL
    }
}

export const increaseIngredientsLoader = () => {
    return {
        type: actionTypes.INCREASE_INGREDIENTS_LOADER
    }
}

export const resetIngredientsLoader = () => {
    return {
        type: actionTypes.RESET_INGREDIENTS_LOADER
    }
}