import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' }
];

const buildControls = (props) => {

    const controlElems = controls.map((control) => {
        return <BuildControl 
                    key={control.type} 
                    label={control.label}
                    added={() => props.added(control.type)}
                    removed={() => props.removed(control.type)}
                    disabled={props.disabledInfo[control.type]}
                    />
    })

    return <div className={classes.BuildControls}>
        <p>Current Price: <strong>{props.totalPrice.toFixed(2)}</strong></p>
        {controlElems}
        <button disabled={!props.purchasable} className={classes.OrderButton} onClick={props.orderNow}>Order Now!</button>
    </div>
}

export default buildControls;