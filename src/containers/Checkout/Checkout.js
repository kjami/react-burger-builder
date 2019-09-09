import React from 'react';
import { Route } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends React.Component {
    state = {
        ingredients: null,
        totalPrice: 0
    }

    componentDidMount() {
        const queryParams = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let totalPrice = 0;
        for (let param of queryParams.entries()) {
            const paramName = param[0].toString();
            if (paramName != "price") {
                ingredients[paramName] = Number(param[1]);
            } else {
                totalPrice = Number(param[1]);
            }
        }
        this.setState({
            ingredients: ingredients,
            totalPrice: totalPrice
        });
    }

    onCheckoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    onCheckoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render () {
        let checkoutSummary = <p>Loading..</p>;
        if (this.state.ingredients) {
            checkoutSummary = <CheckoutSummary
                ingredients={this.state.ingredients}
                onCheckoutCancelled={this.onCheckoutCancelledHandler}
                onCheckoutContinued={this.onCheckoutContinuedHandler}
            />;
        }
        return (
            <div>
                {checkoutSummary}
                <Route path={this.props.match.path + "/contact-data"} render={() => <ContactData ingredients={this.state.ingredients} totalPrice={this.state.totalPrice}/>} />
            </div>
        );
    }
}

export default Checkout;