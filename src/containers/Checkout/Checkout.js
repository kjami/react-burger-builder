import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';

class Checkout extends React.Component {

    onCheckoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    onCheckoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render () {
        let checkoutSummary = <Redirect to="/" />;
        if (this.props.ingredients) {
            checkoutSummary = <CheckoutSummary
                ingredients={this.props.ingredients}
                onCheckoutCancelled={this.onCheckoutCancelledHandler}
                onCheckoutContinued={this.onCheckoutContinuedHandler}
            />;
        }
        return (
            <div>
                {checkoutSummary}
                <Route path={this.props.match.path + "/contact-data"} render={() => <ContactData ingredients={this.props.ingredients} totalPrice={this.props.totalPrice}/>} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.ingredientsNS.ingredients,
        totalPrice: state.ingredientsNS.price
    }
}

export default connect(mapStateToProps)(Checkout);