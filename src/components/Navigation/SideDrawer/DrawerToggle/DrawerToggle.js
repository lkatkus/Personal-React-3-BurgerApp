// Dependency imports
import React from 'react';

// Component imports

// Asset imports
import classes from './DrawerToggle.css';

// Component
const drawerToggle = (props) => {
    return(
        <div className={classes.DrawerToggle} onClick={props.clicked}>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
};

export default drawerToggle;