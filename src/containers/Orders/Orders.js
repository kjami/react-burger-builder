import React from 'react';
import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import Modal from '../../components/UI/Modal/Modal';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';

class Orders extends React.Component {
    componentDidMount () {
        this.props.getOrders(this.props.token, this.props.userId);
    }

    modalClosedHandler = () => {
        this.props.getOrdersRemoveError();
    }

    render () {
        let orders = null;

        if (this.props.error) {
            orders = <p>Unable to load resources. Error: {this.props.error.message}</p>;
        } else if (!this.props.orders) {
            orders = <Spinner />;
        } else {
            orders = this.props.orders.map(order => {
                return <Order key={order.id} ingredients={order.ingredients} price={order.price}/>
            });
        }

        // let error = null;
        // if (this.props.error) {
        //     error = <Modal show="true" modalClosed={this.modalClosedHandler}>{this.props.error.message}</Modal>
        // }

        return (
            <div>
                {/* {error} */}
                {orders}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        orders: state.ordersNS.orders,
        error: state.ordersNS.error,
        token: state.authNS.token,
        userId: state.authNS.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getOrders: (token, userId) => dispatch(actions.getOrders({ token: token, userId: userId })),
        getOrdersRemoveError: () => dispatch(actions.getOrdersRemoveError())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders);