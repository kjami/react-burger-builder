import React from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends React.Component {
    state = {
        orders: [],
        loading: false
    }

    componentDidMount () {
        this.setState({ loading: true });
        axios.get("/orders.json")
            .then(response => {
                const orders = Object.keys(response.data).map(d => {
                    return {
                        id: d,
                        ...response.data[d]
                    }
                });
                this.setState({ loading: false, orders: orders });
            })
            .catch(error => {
                this.setState({ loading: false });
                console.log(error);
            });
    }

    render () {
        let orders = null;

        if (this.state.loading) {
            orders = <Spinner />;
        } else if (this.state.orders) {
            orders = this.state.orders.map(order => {
                return <Order key={order.id} ingredients={order.ingredients} price={order.price}/>
            });
        }
        return <div>
            {orders}
        </div>
    }
}

export default Orders;