import * as actionTypes from '../actions/actionTypes';

const initialState = {
    ingredients: null,
    price: 0,
    ingredientsError: false,
    ingredientPricesError: false,
    loaded: 0
}

const reducer = (state = initialState, action) => {
    let ingredients = null;
    switch (action.type) {
        case actionTypes.GET_INGREDIENTS:
            return {
                ...state,
                ingredients: action.payload.ingredients,
                price: updateBurgerPrice(action.payload.ingredients, state.ingredientPrices),
                ingredientsError: false
            };
        case actionTypes.GET_INGREDIENTS_ERROR:
            return {
                ...state,
                ingredientsError: true
            }
        case actionTypes.GET_INGREDIENT_PRICES:
            return {
                ...state,
                ingredientPrices: action.payload.ingredientPrices,
                price: updateBurgerPrice(state.ingredients, action.payload.ingredientPrices),
                ingredientPricesError: false
            };
        case actionTypes.GET_INGREDIENT_PRICES_ERROR:
            return {
                ...state,
                ingredientPricesError: true
            }
        case actionTypes.CLOSE_INGREDIENTS_ERROR_MODAL:
            return {
                ...state,
                ingredients: {},
                ingredientPrices: {},
                ingredientsError: false,
                ingredientPricesError: false
            }
        case actionTypes.ADD_INGREDIENT:
            ingredients = {
                ...state.ingredients,
                [action.payload.name]: state.ingredients[action.payload.name] + 1
            };
            return {
                ...state,
                ingredients: ingredients,
                price: updateBurgerPrice(ingredients, state.ingredientPrices)
            };
        case actionTypes.REMOVE_INGREDIENT:
            ingredients = {
                ...state.ingredients,
                [action.payload.name]: state.ingredients[action.payload.name] - 1
            };
            return {
                ...state,
                ingredients: ingredients,
                price: updateBurgerPrice(ingredients, state.ingredientPrices)
            };
        case actionTypes.INCREASE_INGREDIENTS_LOADER:
            return {
                ...state,
                loaded: state.loaded + 1
            }
        case actionTypes.RESET_INGREDIENTS_LOADER:
            return {
                ...state,
                loaded: 0
            }
        default:
            return state;
    }
}

const updateBurgerPrice = (ingredients, ingredientPrices) => {
    if (!ingredients || !ingredientPrices) {
        return 0;
    }
    let price = Object.keys(ingredients)
        .map(name => {
            return ingredients[name] * ingredientPrices[name];
        })
        .reduce((sum, num) => {
            return sum + num;
        }, 0);

    price += 4;

    return price;
}

export default reducer;