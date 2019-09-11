import React from 'react';
import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';

class Orders extends React.Component {
    componentDidMount () {
        this.props.getOrders();
    }

    render () {
        let orders = null;

        if (!this.props.orders) {
            orders = <Spinner />;
        } else {
            orders = this.props.orders.map(order => {
                return <Order key={order.id} ingredients={order.ingredients} price={order.price}/>
            });
        }
        return <div>
            {orders}
        </div>
    }
}

const mapStateToProps = state => {
    return {
        orders: state.ordersNS.orders
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getOrders: (orders) => dispatch(actions.getOrders({ orders: orders }))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders);