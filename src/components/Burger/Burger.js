import React from 'react';

import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.css';

const burger = (props) => {
    let transformedIngredients = Object.keys(props.ingredients)
        .map((ingredient) => {
            // Array() creates an emty array with the length of amount of the ingredient
            return [...Array(props.ingredients[ingredient])].map((_, i) => {
                return <BurgerIngredient key={ingredient + i} type={ingredient} />
            });
        })
        // Flattens the multiple array to one level array
        .reduce((arr, el) => {
            return arr.concat(el);
        }, []);

    if(transformedIngredients.length === 0){
        transformedIngredients = <p>Please start adding ingredients</p>
    }

    return(
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
};

export default burger;