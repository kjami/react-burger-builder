import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import Spinner from '../../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router';

class Logout extends Component {

    componentDidMount() {
        this.props.authLogout();
    }

    render () {
        let logout =<Spinner/>;
        if (this.props.token) {
            logout = <Redirect to="/"></Redirect>;
        }
        return (
            <div>
                {logout}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.authNS.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        authLogout: () => dispatch(actions.logout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout);