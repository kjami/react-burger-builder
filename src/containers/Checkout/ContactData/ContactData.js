import React from 'react';
import axios from '../../../axios-orders';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import Spinner from '../../../components/UI/Spinner/Spinner'
import { withRouter } from 'react-router-dom';

class ContactData extends React.Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        isOrderPosting: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            customer: {
                name: 'Kishor Jami',
                address: {
                    building: 'ABC Residence',
                    street: 'XYZ Street',
                    city: 'ABC Cuty'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'express'
        };
        this.setState({
            isOrderPosting: true
        });
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({
                    isOrderPosting: false
                });
                this.props.history.push("/");
            })
            .catch(error => {
                console.log(error);
                this.setState({
                    isOrderPosting: false
                });
            });
    }

    render () {
        let form = <Spinner />;
        if (!this.state.isOrderPosting) {
            form = <form>
                <input className={classes.Input} type="text" name="name" placeholder="your name" />
                <input className={classes.Input} type="text" name="email" placeholder="your email" />
                <input className={classes.Input} type="text" name="street" placeholder="your street" />
                <input className={classes.Input} type="text" name="postalCode" placeholder="your postal code" />
                <Button btnType="Success" clicked={this.orderHandler}>Order!!</Button>
            </form>;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact details:</h4>
                {form}
            </div>
        );
    }
}

export default withRouter(ContactData);