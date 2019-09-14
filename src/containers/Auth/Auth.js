import React from 'react';
import { Redirect } from 'react-router';
import classes from './Auth.module.css';

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import Modal from "../../components/UI/Modal/Modal";
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

class Auth extends React.Component {
    state = {
        controls: [{
            label: 'Email',
            property: 'email',
            elementType: 'input',
            elementProps: {
                type: 'email',
                placeholder: 'Your Email'
            },
            valudationRules: {
                required: true,
                email: true
            },
            valid: false,
            touched: false,
            shouldValidate: true,
            value: '',
            changed: (ev) => this.changeEventHandler(ev, 'email')
        }, {
            label: 'Password',
            property: 'password',
            elementType: 'input',
            elementProps: {
                type: 'password',
                placeholder: 'Your password'
            },
            valudationRules: {
                required: true,
                minLength: 6
            },
            valid: false,
            touched: false,
            shouldValidate: true,
            value: '',
            changed: (ev) => this.changeEventHandler(ev, 'password')
        }],
        method: 'signin',
        isFormValid: true
    };

    checkValidity = (value, rules) => {
        let isValid = true;

        if (rules.required) {
            isValid = value.trim() !== '';
        }

        if (isValid && rules.minLength) {
            isValid = value.length >= rules.minLength;
        }

        if (isValid && rules.maxLength) {
            isValid = value.length <= rules.maxLength;
        }

        if (isValid && rules.email) {
            const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            isValid = regex.test(String(value).toLowerCase());
        }

        if (isValid && rules.excludeValues) {
            isValid = rules.excludeValues.indexOf(value) < 0;
        }

        return isValid;
    }

    changeEventHandler = (ev, property) => {
        const value = ev.target.value;
        const controls = this.state.controls.slice();
        const index = controls.findIndex(c => c.property === property);
        const config = controls[index];
        config.value = value;
        config.touched = true;
        config.valid = this.checkValidity(value, config.valudationRules);
        this.setState({ controls: controls });
    }

    authStart = (method) => {
        const email = this.state.controls.find(x => x.property === "email");
        const password = this.state.controls.find(x => x.property === "password");
        if (email && password && email.valid && password.valid) {
            this.setState({
                isFormValid: true
            });
            this.props.onAuthStart({
                method: method,
                email: email.value,
                password: password.value
            });
        } else {
            this.setState({
                isFormValid: false
            });
        }
    }

    modalClosedHandler = () => {
        this.setState({
            isFormValid: true
        });
    }

    onSubmitHandler = (event) => {
        event.preventDefault();
        this.authStart('signin');
    }

    signupHandler = (event) => {
        event.preventDefault();
        event.stopPropagation();
        this.authStart('signup');
    }

    render() {
        let redirect = null;
        if (this.props.token) {
            const path = "/" + ((this.props.location.state && this.props.location.state.redirect) || "")
            redirect = <Redirect to={path}></Redirect>;
        }
        const formElements = this.state.controls.map(elem => {
            return <Input key={elem.property} {...elem} />
        });

        let auth = (
            <form onSubmit={this.onSubmitHandler}>
                {formElements}
                <Button btnType="Success">LOGIN</Button>
                <Button btnType="Success" clicked={this.signupHandler}>SIGNUP</Button>
            </form>
        );

        if (this.props.loading) {
            auth = <Spinner />;
        }

        let errorMessage = null;
        if (this.props.error) {
            errorMessage = <p>{this.props.error.message}</p>;
        }

        let modal = null;
        if (!this.state.isFormValid) {
            modal = <Modal show="true" modalClosed={this.modalClosedHandler}>Incorrect data entered!!</Modal>
        }

        return (
            <div className={classes.Auth}>
                {redirect}
                {modal}
                {errorMessage}
                {auth}
            </div>
        );;
    }
}

const mapStateToProps = state => {
    return {
        token: state.authNS.token,
        userId: state.authNS.userId,
        error: state.authNS.error,
        loading: state.authNS.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuthStart: (payload) => dispatch(actions.getAuthToken(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);