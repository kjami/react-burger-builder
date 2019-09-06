/* eslint-disable no-undef */
import React from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends React.Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0, 
            cheese: 0,
            meat: 0
        },
        totalPrice: 4
    };

    addIngredientHandler = (type) => {
        const ingredients = {
            ...this.state.ingredients
        };
        ingredients[type] += 1;

        let price = this.state.totalPrice;
        let ingredientPrice = INGREDIENT_PRICES[type];
        price += ingredientPrice;
        this.setState({
            ingredients: ingredients,
            totalPrice: price
        });
    }

    removeIngredientHandler = (type) => {
        const ingredients = {
            ...this.state.ingredients
        };
        ingredients[type] -= 1;
        ingredients[type]= ingredients[type] < 0 ? 0 : ingredients[type];

        let price = this.state.totalPrice;
        let ingredientPrice = INGREDIENT_PRICES[type];
        price -= ingredientPrice;
        this.setState({
            ingredients: ingredients,
            totalPrice: price
        });
    }

    render () {
        const disabledInfo = {
            ...this.state.ingredients
        }

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        return (
            <React.Fragment>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    added={this.addIngredientHandler}
                    removed={this.removeIngredientHandler}
                    disabledInfo={disabledInfo}
                    totalPrice={this.state.totalPrice}
                    />
            </React.Fragment>
        );
    }
}

export default BurgerBuilder;