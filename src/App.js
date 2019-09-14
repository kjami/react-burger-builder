import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders'
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';

import * as actions from './store/actions/index';
import { connect } from 'react-redux';

class App extends React.Component {
  componentDidMount() {
    this.props.tryAutoSignup();
  }

  render () {
    let routes = (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/" component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path="/auth" component={Auth} />
          <Route path="/logout" component={Logout} />
          <Route path="/" component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      );
    }

    return (
      <BrowserRouter>
        <div>
          <Layout>
            {/* <BurgerBuilder />
            <Checkout/> */}
            {routes}
          </Layout>
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.authNS.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    tryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
