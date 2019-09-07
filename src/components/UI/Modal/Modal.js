import React from 'react';
import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends React.Component {
    shouldComponentUpdate(nextProps, nextState) {
        return (nextProps.show === !this.props.show) || (nextProps.children !== this.props.children);
    }
    
    render () {
        let style = {
            transform: this.props.show ? 'translateY(0)' : 'transalateY(-100vh)',
            opacity: this.props.show ? '1' : '0'
        };

        if (!this.props.show) {
            style.width = 0;
            style.height = 0;
        }
        return <React.Fragment>
            {this.props.show ? <Backdrop clicked={this.props.modalClosed}/> : null}
            <div className={classes.Modal}
                style={style}>
                {this.props.children}
            </div>
        </React.Fragment>
    }
}

export default Modal;