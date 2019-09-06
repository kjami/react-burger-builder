import React from 'react';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    const ingredients = Object.keys(props.ingredients).map(ingredient => {
        return <li key={ingredient}>
            <span style={{textTransform: 'capitalize'}}>{ingredient}</span>: {props.ingredients[ingredient]}
        </li>
    });

    return (
        <React.Fragment>
            <h3>Your Order</h3>
            <p>Your delicious burger has the following ingredients:</p>
            <ul>
                {ingredients}
            </ul>
            <p><strong>Total Price: {props.totalPrice}</strong></p>
            <p>Want to Checkout?</p>
            <Button btnType="Danger" clicked={props.cancelled}>Cancel</Button>
            <Button btnType="Success" clicked={props.continued}>Continue</Button>
        </React.Fragment>
    )
}

export default orderSummary;