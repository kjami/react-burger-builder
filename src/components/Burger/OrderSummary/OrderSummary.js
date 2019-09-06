import React from 'react';

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
            <p>Want to Checkout?</p>
        </React.Fragment>
    )
}

export default orderSummary;