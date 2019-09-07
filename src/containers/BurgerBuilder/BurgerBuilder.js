/* eslint-disable no-undef */
import React from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

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
        totalPrice: 4,
        purchasable: false,
        showOrderSummary: false,
        isOrderPosting: false
    };

    updatePurchaseState(ingredients)  {
        for (let key in ingredients) {
            if (ingredients[key] > 0) {
                this.setState({
                    purchasable: true
                });
                return;
            }
        }
         
        this.setState({
            purchasable: false
        });
    }
 
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
        this.updatePurchaseState(ingredients);
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
        this.updatePurchaseState(ingredients);
    }

    orderNowHandler = () => {
        this.setState({
            showOrderSummary: true
        });
    }

    closeOrderNowHandler = () => {
        this.setState({
            showOrderSummary: false
        });
    }

    continueOrderNowHandler = () => {
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Kishor Jami',
                address: {
                    building: 'ABC Residence',
                    street: 'XYZ Street',
                    city: 'ABC Cuty'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'express'
        };
        this.setState({
            isOrderPosting: true
        });
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({
                    isOrderPosting: false,
                    showOrderSummary: false
                });
            })
            .catch(error => {
                console.log(error);
                this.setState({
                    isOrderPosting: false,
                    showOrderSummary: false
                });
            });
    }

    render () {
        const disabledInfo = {
            ...this.state.ingredients
        }

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = <OrderSummary
            ingredients={this.state.ingredients}
            continued={this.continueOrderNowHandler}
            cancelled={this.closeOrderNowHandler}
            totalPrice={this.state.totalPrice.toFixed(2)}
        />;

        if (this.state.isOrderPosting) {
            orderSummary = <Spinner />;
        }

        return (
            <React.Fragment>
                <Modal 
                    show={this.state.showOrderSummary}
                    modalClosed={this.closeOrderNowHandler}>
                    {orderSummary}
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    added={this.addIngredientHandler}
                    removed={this.removeIngredientHandler}
                    disabledInfo={disabledInfo}
                    totalPrice={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    orderNow={this.orderNowHandler}
                    />
            </React.Fragment>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);