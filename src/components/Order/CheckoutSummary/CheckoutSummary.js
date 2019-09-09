import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './checkoutSummary.module.css';

const checkoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>Thats a delicious burger!!</h1>
            <div style={{width: '100%', height: '300px', margin: 'auto', overflow: 'auto'}}>
                <Burger ingredients={props.ingredients} />
            </div>
            <Button
                btnType="Danger"
                clicked={props.onCheckoutCancelled}>Cancel</Button>
            <Button
                btnType="Success"
                clicked={props.onCheckoutContinued}>Continue</Button>
        </div>
    );
}

export default checkoutSummary;