import React from 'react';

import classes from './Layout.module.css';

const layout = (props) => (
    <React.Fragment>
        <div className={classes.Content}>Toolbar, Sidebar, Backdrop</div>
        <main>
            {props.children}
        </main>
    </React.Fragment>
);

export default layout;