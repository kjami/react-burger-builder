import React from 'react';
import classes from './Order.module.css';

const order = (props) => {
    const ingredients = props.ingredients;
    const ingredientsElem = Object.keys(ingredients).map(name => {
        const val = ingredients[name];
        return val ? <span key={name} style={{ display: 'inline-block', margin: '0 8px', border: '1px solid #ccc', padding: '5px', textTransform: 'capitalize' }}>{name} ({val})</span> : <span key={name} ></span >;
    });
    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientsElem}</p>
            <p>Price: <strong>USD {props.price.toFixed(2)}</strong></p>
        </div>
    );
}

export default order;