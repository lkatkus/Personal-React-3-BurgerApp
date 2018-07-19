import React, {Component} from 'react';
import axios from '../../axios-orders';
import {connect} from 'react-redux';

import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import Input from '../../components/UI/Input/Input';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

import * as actions from '../../store/actions/index';

import classes from './ContactData.css';

class ContactData extends Component{
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 10
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'email',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your E-Mail'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: 'fastest',
                validation: {},
                valid: true
            }
        }
    };

    orderHandler = (event) => {
        event.preventDefault();

        const formData = {};

        for(let formElement in this.state.orderForm){
            formData[formElement] = this.state.orderForm[formElement].value;
        };

        const order = {
            ingredients: this.props.ings,
            price: this.props.totalPrice,
            orderData: formData,
            userId: this.props.userId
        };

        this.props.onOrderBurger(order, this.props.token);
    }

    inputChangedHandler = (event, inputId) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = {
            ...updatedOrderForm[inputId]
        };

        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputId] = updatedFormElement;

        // Setting global form validity
        let formIsValid = true;
        for(let inputId in updatedOrderForm){
            formIsValid = updatedOrderForm[inputId].valid && formIsValid;
        };

        this.setState({
            orderForm: updatedOrderForm,
            formIsValid
        });
    }

    checkValidity = (value, rules) => {
        let isValid = true;

        if(rules.required){
            isValid = value.trim() !== '' && isValid;
        }

        if(rules.minLength){
            isValid = value.length >= rules.minLength && isValid;
        }

        if(rules.maxLength){
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
    }

    render(){
        const formElements = [];

        for(let key in this.state.orderForm){
            formElements.push({
                id: key,
                config: this.state.orderForm[key]
            })
        };

        let form = (
            <form onSubmit={this.orderHandler}>
                {formElements.map((element) => (
                    <Input
                        key={element.id}
                        changed={(event) => { this.inputChangedHandler(event, element.id) }}
                        elementType={element.config.elementType}
                        shouldValidate={element.config.validation}
                        touched={element.config.touched}
                        invalid={!element.config.valid}
                        elementConfig={element.config.elementConfig}
                        value={element.config.value}/>
                ))}
                <Button btnType="Success" disabled={!this.state.formIsValid}>Order</Button>
            </form>            
        );

        if(this.props.loading){
            form = <Spinner/>
        };
        
        return(
            <div className={classes.ContactData}>
                <h4>Enter your contact data</h4>
                {form}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        ings: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onOrderBurger: (orderData, token) => {dispatch(actions.purchaseBurger(orderData, token))}
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));