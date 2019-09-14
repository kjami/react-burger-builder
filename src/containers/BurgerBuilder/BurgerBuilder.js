/* eslint-disable no-undef, no-unused-vars */
import React from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

class BurgerBuilder extends React.Component {
    state = {
        showOrderSummary: false,
        isOrderPosting: false
    };

    updatePurchaseState(ingredients) {
        for (let key in ingredients) {
            if (ingredients[key] > 0) {
                return true;
            }
        }
        return false;
    }

    componentDidMount() {
        this.props.resetIngredientsLoader();
        this.props.getIngredients();
        this.props.getIngredientPrices();
    }

    orderNowHandler = () => {
        if (this.props.isAuthenticated) {
            this.setState({ showOrderSummary: true });
        } else {
            this.props.history.push({
                pathname: '/auth',
                state: {
                    redirect: "checkout"
                }
            });
        }
    }

    closeOrderNowHandler = () => {
        this.setState({ showOrderSummary: false });
    }

    continueOrderNowHandler = () => {
        this.props.history.push('/checkout');
    }

    closeIngredientsErrorModal = () => {
        this.props.closeIngredientsErrorModal();
    }

    render () {
        const disabledInfo = {
            ...this.props.ingredients
        }

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = (<p></p>);
        
        if (this.props.ingredients && this.props.ingredientPrices) {
            orderSummary = <OrderSummary
                ingredients={this.props.ingredients}
                continued={this.continueOrderNowHandler}
                cancelled={this.closeOrderNowHandler}
                totalPrice={this.props.totalPrice.toFixed(2)}
            />;

            if (this.state.isOrderPosting) {
                orderSummary = <Spinner />;
            }
        }

        let burger = (<Spinner/>);

        if (this.props.loaded === 2 || this.props.loaded === "2") {
            burger = (<React.Fragment>
                <Burger ingredients={this.props.ingredients} />
                <BuildControls
                    added={this.props.addIngredient}
                    removed={this.props.removeIngredient}
                    disabledInfo={disabledInfo}
                    totalPrice={this.props.totalPrice}
                    purchasable={this.updatePurchaseState(this.props.ingredients)}
                    orderNow={this.orderNowHandler}
                    isAuthenticated={this.props.isAuthenticated}
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
                <Modal
                    show={this.props.ingredientsError || this.props.ingredientPricesError}
                    modalClosed={this.props.closeIngredientsErrorModal}>
                    Unable to fetch {this.props.ingredientsError ? 'ingredients' : 'ingredient prices'}. Some features may not work. Please reload the page or contact administrator, if problem persists.
                </Modal>
                {burger}
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.ingredientsNS.ingredients,
        ingredientPrices: state.ingredientsNS.ingredientPrices,
        totalPrice: state.ingredientsNS.price,
        ingredientsError: state.ingredientsNS.ingredientsError,
        ingredientPricesError: state.ingredientsNS.ingredientPricesError,
        loaded: state.ingredientsNS.loaded,
        isAuthenticated: state.authNS.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getIngredients: () => dispatch(actions.getIngredients()),
        getIngredientPrices: () => dispatch(actions.getIngredientPrices()),
        addIngredient: (name) => dispatch(actions.addIngredient({ name: name })),
        removeIngredient: (name) => dispatch(actions.removeIngredient({ name: name })),
        closeIngredientsErrorModal: () => dispatch(actions.closeIngredientsErrorModal()),
        resetIngredientsLoader: () => dispatch(actions.resetIngredientsLoader())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));