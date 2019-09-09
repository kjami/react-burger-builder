import React from 'react';
import classes from './Input.module.css';

const input = (props) => {
    let inputElement = null;
    let classesString = [classes.InputElement];
    if (!props.valid && props.shouldValidate && props.touched) {
        classesString.push(classes.Invalid);
    }
    classesString = classesString.join(' ');
    switch (props.elementType) {
        case 'input':
            inputElement = <input className={classesString} {...props.elementProps} onChange={props.changed} value={props.value}/>;
            break;
        case 'textarea':
            inputElement = <textarea className={classesString} {...props.elementProps} onChange={props.changed}>{props.value}</textarea>;
            break;
        case 'select':
            let options = props.elementOptions.map(option => {
                return <option key={option.value} value={option.value}>{option.name}</option>;
            });
            inputElement = <select className={classesString} {...props.elementProps} onChange={props.changed} value={props.value}>
                <option value="-1">Select</option>
                {options}
            </select>;
            break;
        default:
            inputElement = <input className={classesString} {...props.elementProps} onChange={props.changed} value={props.value}/>;
    }
    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    );
}

export default input;