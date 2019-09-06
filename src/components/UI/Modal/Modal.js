import React from 'react';
import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends React.Component {
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.show === !this.props.show;
    }
    
    render () {
        return <React.Fragment>
            {this.props.show ? <Backdrop clicked={this.props.modalClosed}/> : null}
            <div className={classes.Modal}
                style={{
                    transform: this.props.show ? 'translateY(0)' : 'transalateY(-100vh)',
                    opacity: this.props.show ? '1' : '0',
                    width: this.props.show ? 'auto' : '0',
                    height: this.props.show ? 'auto' : '0'
                }}>
                {this.props.children}
            </div>
        </React.Fragment>
    }
}

export default Modal;