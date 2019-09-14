/* eslint-disable no-undef */
import React from 'react';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import classes from './Layout.module.css';
import { connect } from 'react-redux';

class Layout extends React.Component {
    state = {
        showSideDrawer: false
    }

    closeSideDrawerHandler = () => {
        this.setState({
            showSideDrawer: false
        });
    }

    toggleSideDrawerHandler = () => {
        this.setState((prevState) => {
            return { showSideDrawer: !prevState.showSideDrawer };
        });
    }

    render () {
        return <React.Fragment>
            <Toolbar 
                isAuthenticated={this.props.isAuthenticated}
                clicked={this.toggleSideDrawerHandler}/>
            <SideDrawer
                isAuthenticated={this.props.isAuthenticated}
                show={this.state.showSideDrawer} closed={this.closeSideDrawerHandler}/>
            <main className={classes.Content}>
                {this.props.children}
            </main>
        </React.Fragment>
    }
};

const mapStateToProps = state => {
    return {
        isAuthenticated: state.authNS.token !== null
    }
}

export default connect(mapStateToProps)(Layout);