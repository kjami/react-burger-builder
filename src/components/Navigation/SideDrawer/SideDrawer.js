import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import classes from './SideDrawer.module.css';

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
                    <NavigationItems/>
                </nav>
            </div>
        </React.Fragment>
    );
}

export default sideDrawer;