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
            <NavigationItem link="/" active>Burder Builder</NavigationItem>
            <NavigationItem link="/">Checkout</NavigationItem>
        </ul>
    )
};

export default navigationItems;