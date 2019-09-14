import React from 'react';
import axios from '../../../axios-orders';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import Spinner from '../../../components/UI/Spinner/Spinner'
import { withRouter } from 'react-router-dom';
import Input from '../../../components/UI/Input/Input';
import Modal from '../../../components/UI/Modal/Modal';
import { connect } from 'react-redux';

class ContactData extends React.Component {
    state = {
        orderForm: [{
            label: 'Name',
            property: 'name',
            elementType: 'input',
            elementProps: {
                type: 'text',
                placeholder: 'Your full name'
            },
            valudationRules: {
                required: true
            },
            valid: false,
            touched: false,
            shouldValidate: true,
            value: '',
            changed: (ev) => this.changeEventHandler(ev, 'name')
        }, {
            label: 'Street',
            property: 'street',
            elementType: 'input',
            elementProps: {
                type: 'text',
                placeholder: 'Your street'
            },
            valudationRules: {
                required: true
            },
            valid: false,
            touched: false,
            shouldValidate: true,
            value: '',
            changed: (ev) => this.changeEventHandler(ev, 'street')
        }, {
            label: 'City',
            property: 'city',
            elementType: 'input',
            elementProps: {
                type: 'text',
                placeholder: 'Your city'
            },
            valudationRules: {
                required: true
            },
            valid: false,
            touched: false,
            shouldValidate: true,
            value: '',
            changed: (ev) => this.changeEventHandler(ev, 'city')
        }, {
            label: 'Zip Code',
            property: 'zipcode',
            elementType: 'input',
            elementProps: {
                type: 'text',
                placeholder: 'Your post code'
            },
            valudationRules: {
                required: true,
                minLength: 5,
                maxLength: 5
            },
            valid: false,
            touched: false,
            shouldValidate: true,
            value: '',
            changed: (ev) => this.changeEventHandler(ev, 'zipcode')
        }, {
            label: 'Email',
            property: 'email',
            elementType: 'input',
            elementProps: {
                type: 'email',
                placeholder: 'Your email address'
            },
            valudationRules: {
                required: true
            },
            valid: false,
            touched: false,
            shouldValidate: true,
            value: '',
            changed: (ev) => this.changeEventHandler(ev, 'email')
        }, {
            label: 'Delivery Method',
            property: 'deliveryMethod',
            elementType: 'select',
            elementProps: {
            },
            elementOptions: [
                { value: 'express', name: 'Express' },
                { value: 'standard', name: 'Standard' },
                { value: 'economy', name: 'Economy' }
            ],
            valudationRules: {
                required: true,
                excludeValues: ["-1"]
            },
            valid: false,
            touched: false,
            shouldValidate: true,
            value: '',
            changed: (ev) => this.changeEventHandler(ev, 'deliveryMethod')
        }],
        isFormValid: true,
        isOrderPosting: false
    }

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
        const orderForm = this.state.orderForm.slice();
        const index = orderForm.findIndex(c => c.property === property);
        const config = orderForm[index];
        config.value = value;
        config.touched = true;
        config.valid = this.checkValidity(value, config.valudationRules);
        this.setState({ orderForm: orderForm });
    }

    orderHandler = (event) => {
        event.preventDefault();
        const orderData = {};
        let isFormValid = true;
        this.state.orderForm.forEach(c => {
            if (!c.valid) isFormValid = false;
            orderData[c.property] = c.value;
        })

        if (!isFormValid) {
            this.setState({
                isFormValid: isFormValid
            });
            // alert("Data is invalid");
            return null;
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            orderData: orderData
        };
        this.setState({
            isOrderPosting: true
        });
        if (this.props.token) {
            axios.post('/orders.json?auth=' + this.props.token, { ...order, userId: this.props.userId })
                .then(response => {
                    this.setState({
                        isOrderPosting: false
                    });
                    this.props.history.push("/");
                })
                .catch(error => {
                    this.setState({
                        isOrderPosting: false
                    });
                });
        }
    }

    modalClosedHandler = () => {
        this.setState({
            isFormValid: true
        });
    }

    render () {
        const formElements = this.state.orderForm.map(elem => {
            return <Input key={elem.property} {...elem} />
        });

        let modal = null;
        if (!this.state.isFormValid) {
            modal = <Modal show="true" modalClosed={this.modalClosedHandler}>Incorrect data entered!!</Modal>
        }

        let form = <Spinner />;
        if (!this.state.isOrderPosting) {
            form = <form onSubmit={this.orderHandler}>
                {formElements}
                <Button btnType="Success">Order!!</Button>
            </form>;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact details:</h4>
                {form}
                {modal}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.authNS.token,
        userId: state.authNS.userId
    }
}

export default connect(mapStateToProps)(withRouter(ContactData));