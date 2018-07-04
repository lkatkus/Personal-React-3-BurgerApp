import React, {Component} from 'react';
import axios from '../../axios-orders';
import {connect} from 'react-redux';

import * as actionTypes from '../../store/actions';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'; /* Global error handler as a wrapping component */
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';

class BurgerBuilder extends Component{

    state = {
        purchasing: false,
        loading: false,
        error: false
    }

    // componentDidMount(){
    //     axios.get('https://burgerapp-3a4d3.firebaseio.com/ingredients.json')
    //         .then((res) => {
    //             this.setState({
    //                 ingredients: res.data
    //             })
    //         })
    //         .catch((err) => {
    //             this.setState({error: true});
    //         });
    // };

    // For displaying order summary in Modal
    purchaseHandler = () => {
        this.setState({
            purchasing: true
        });
    };

    updatePurchasable = (ingredients) => {
        // Current ingredients should be passed, because setState is async
        // Creates array with keys from ingredients and then maps ingredient amounts based on keys
        const sum = Object.keys(ingredients)
            .map((ingredient) => {
                return ingredients[ingredient]
            })
            .reduce((sum, element) => {
                return sum + element;
            }, 0);

            return sum > 0;
    };

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        this.props.history.push('checkout');
    }

    render(){
        const disabledInfo = {
            ...this.props.ings
        };
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;
        let burger = <Spinner/>;

        if(this.state.error){
            burger = <p>Ingredients cannot be loaded</p>
        }

        if(this.props.ings){
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls
                        price = {this.props.totalPrice}
                        purchasable = {this.updatePurchasable(this.props.ings)}
                        ordered = {this.purchaseHandler}
                        disabled = {disabledInfo}
                        ingredientAdded = {this.props.onIngredientAdded}
                        ingredientRemoved = {this.props.onIngredientRemoved}/>
                </Aux>
            );

            orderSummary = (
                <OrderSummary
                    price={this.props.totalPrice}
                    ingredients={this.props.ings}
                    purchaceCanceled={this.purchaseCancelHandler}
                    purchaceContinued={this.purchaseContinueHandler}/>
            );
        };

        if(this.state.loading){
            orderSummary = <Spinner/>
        };

        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return{
        ings: state.ingredients,
        totalPrice: state.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onIngredientAdded: (ingredientName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName}),
        onIngredientRemoved: (ingredientName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));