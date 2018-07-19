import axios from '../../axios-orders';

import * as actionTypes from '../actions/actionTypes';

export const addIngredient = (ingredientName) => { 
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName
    }
};

export const removeIngredient = (ingredientName) => { 
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName
    }
};

export const setIngredients = (ingredients) => {
    return{
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    }
};

export const setIngredientsFailed = () => {
    return{
        type: actionTypes.SET_INGREDIENTS_FAILED
    }
};

export const initIngredients = () => {
    return (dispatch) => {
        axios.get('https://burgerapp-3a4d3.firebaseio.com/ingredients.json')
        .then((res) => {           
            dispatch(setIngredients(res.data));
        })
        .catch((err) => {
            dispatch(setIngredientsFailed());
        });
    }
};