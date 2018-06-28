// Dependency imports
import React from 'react';

// Asset imports
import classes from './NavigationItem.css';

// Component
const navigationItem = (props) => {
    return(
        <li className={classes.NavigationItem}>
            <a href={props.link} className={props.active ? classes.active : null}>
                {props.children}
            </a>
        </li>
    )
};

export default navigationItem;