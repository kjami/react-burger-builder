import React from 'react';
import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';

const modal = (props) => {
    return <React.Fragment>
        {props.show ? <Backdrop clicked={props.modalClosed}/> : null}
        <div className={classes.Modal}
            style={{
                transform: props.show ? 'translateY(0)' : 'transalateY(-100vh)',
                opacity: props.show ? '1' : '0',
                width: props.show ? 'auto' : '0',
                height: props.show ? 'auto' : '0'
            }}>
            {props.children}
        </div>
    </React.Fragment>
}

export default modal;