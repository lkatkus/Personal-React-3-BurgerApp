// Dependency import
import React from 'react';

// Asset imports
import burgerLogo from '../../assets/images/burger-logo.png';
import classes from './Logo.css';

// Component
const logo = () => {
    return(
        <div className={classes.Logo}>
            <img src={burgerLogo} alt="MyBurger Logo"/>
        </div>
    )
}

export default logo;