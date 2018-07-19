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

            {props.isAuthenticated
                ? <NavigationItem link="/orders">Orders</NavigationItem>
                : null
            }

            {props.isAuthenticated
                ? <NavigationItem link="/logout">Logout</NavigationItem>
                : <NavigationItem link="/auth">Authenticate</NavigationItem>
            }
        </ul>
    )
};

export default navigationItems;