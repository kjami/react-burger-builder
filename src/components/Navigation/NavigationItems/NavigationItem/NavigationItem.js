import React from 'react';
import classes from './NavigationItem.module.css';
import { NavLink } from 'react-router-dom';

const navigationitem = (props) => (
    <li className={classes.NavigationItem}>
        <NavLink exact
            to={props.link}
            activeClassName={classes.active}
            >
            {props.children}
        </NavLink>
    </li>
)

export default navigationitem;