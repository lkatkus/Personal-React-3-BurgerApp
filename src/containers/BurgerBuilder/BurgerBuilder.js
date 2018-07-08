import React, {Component} from 'react';
import axios from 'axios';

import {connect} from 'react-redux';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'; /* Global error handler as a wrapping component */
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as burgerBuilderActions from '../../store/actions/index';

class BurgerBuilder extends Component{

    state = {
        purchasing: false
    }

    componentDidMount(){
        this.props.onInitIngredients();
    };

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
        this.props.onPurchaseInit();
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

        if(this.props.error){
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
        ings: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onIngredientAdded: (ingredientName) => dispatch(burgerBuilderActions.addIngredient(ingredientName)),
        onIngredientRemoved: (ingredientName) => dispatch(burgerBuilderActions.removeIngredient(ingredientName)),
        onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients()),
        onPurchaseInit: () => dispatch(burgerBuilderActions.purchaseInit())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));