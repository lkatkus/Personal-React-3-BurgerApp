// Dependency imports
import React from 'react';

// Component imports
import NavigationItem from './NavigationItem/NavigationItem';

// Asset imports
import classes from './NavigationItems.css';

// Component
const navigationItems = (props) => {
    return(
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/">Burder Builder</NavigationItem>
            <NavigationItem link="/orders">Orders</NavigationItem>
        </ul>
    )
};

export default navigationItems;