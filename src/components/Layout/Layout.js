/* eslint-disable no-undef */
import React from 'react';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import classes from './Layout.module.css';

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
            <Toolbar clicked={this.toggleSideDrawerHandler}/>
            <SideDrawer show={this.state.showSideDrawer} closed={this.closeSideDrawerHandler}/>
            <main className={classes.Content}>
                {this.props.children}
            </main>
        </React.Fragment>
    }
};

export default Layout;