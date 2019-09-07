/* eslint-disable no-undef */
import React from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

class BurgerBuilder extends React.Component {
    state = {
        ingredientPrices: null,
        ingredients:null,
        totalPrice: 4,
        purchasable: false,
        showOrderSummary: false,
        isOrderPosting: false
    };

    updatePurchaseState(ingredients) {
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

    componentDidMount() {
        axios.get('/ingredientPrice.json')
            .then(priceResponse => {
                this.setState({
                    ingredientPrices: priceResponse.data
                });
                axios.get('/ingredients.json')
                    .then(response => {
                        this.setState({
                            ingredients: response.data,
                            totalPrice: this.updateBurgerPrice(response.data)
                        });
                    })
                    .catch(error => {
                        console.log(error);
                    });
            })
            .catch(error => {
                console.log(error);
            });
    }

    updateBurgerPrice = (ingredients) => {
        const ingredientPrices = this.state.ingredientPrices;

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
 
    addIngredientHandler = (type) => {
        const ingredients = {
            ...this.state.ingredients 
        };
        ingredients[type] += 1;

        // let price = this.state.totalPrice;
        // let ingredientPrice = this.state.ingredientPrices[type];
        // price += ingredientPrice;
        this.setState({
            ingredients: ingredients,
            totalPrice: this.updateBurgerPrice(ingredients)
        });
        this.updatePurchaseState(ingredients);
    }

    removeIngredientHandler = (type) => {
        const ingredients = {
            ...this.state.ingredients
        };
        ingredients[type] -= 1;
        ingredients[type]= ingredients[type] < 0 ? 0 : ingredients[type];

        // let price = this.state.totalPrice;
        // let ingredientPrice = this.state.ingredientPrices[type];
        // price -= ingredientPrice;
        this.setState({
            ingredients: ingredients,
            // totalPrice: price
            totalPrice: this.updateBurgerPrice(ingredients)
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

        let orderSummary = (<p></p>);
        
        if (this.state.ingredients && this.state.ingredientPrices) {
            orderSummary = <OrderSummary
                ingredients={this.state.ingredients}
                continued={this.continueOrderNowHandler}
                cancelled={this.closeOrderNowHandler}
                totalPrice={this.state.totalPrice.toFixed(2)}
            />;

            if (this.state.isOrderPosting) {
                orderSummary = <Spinner />;
            }
        }

        let burger = (<Spinner/>);

        if (this.state.ingredients && this.state.ingredientPrices) {
            burger = (<React.Fragment>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    added={this.addIngredientHandler}
                    removed={this.removeIngredientHandler}
                    disabledInfo={disabledInfo}
                    totalPrice={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    orderNow={this.orderNowHandler}
                />
            </React.Fragment>);
        }

        return (
            <React.Fragment>
                <Modal 
                    show={this.state.showOrderSummary}
                    modalClosed={this.closeOrderNowHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </React.Fragment>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);