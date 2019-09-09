import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    let ingredients = Object.keys(props.ingredients).map(ingredientName => {
        return [...Array(props.ingredients[ingredientName])].map((n, i) => {
            return <BurgerIngredient key={ingredientName+i} type={ingredientName} />;
        });
    }).reduce((arr, el) => {
        return arr.concat(el);
    }, []);

    if (!ingredients.length) {
        ingredients = <p>Please add ingredients to your burger!</p>;
    }
    
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {ingredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
}

export default burger;