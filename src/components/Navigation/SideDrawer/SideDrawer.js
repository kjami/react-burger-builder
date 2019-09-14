import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import classes from './SideDrawer.module.css';
import PropTypes from 'prop-types';

const sideDrawer = (props) => {
    const attachedClasses = [classes.SideDrawer, props.show ? classes.Open : classes.Close];

    return (
        <React.Fragment>
            {props.show ?
                <Backdrop clicked={props.closed}/>
                :
                null
            }
            <div className={attachedClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo/>
                </div>
                <nav>
                    <NavigationItems isAuthenticated={props.isAuthenticated}/>
                </nav>
            </div>
        </React.Fragment>
    );
}

sideDrawer.propTypes = {
    show: PropTypes.bool.isRequired
}

export default sideDrawer;