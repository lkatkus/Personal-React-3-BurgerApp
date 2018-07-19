import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';

import classes from './Auth.css';

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            },
        },
        isSignup: true
    }

    componentDidMount(){
        if(!this.props.buildingBurger && this.props.authRedirectPath !== '/'){
            this.props.onSetAuthRedirectPath();
        };
    }

    swithAuthModeHandler = () => {
        this.setState(prevState => {
            return {isSignup: !prevState.isSignup};
        });
    };

    inputChangedHandler = (event, inputId) => {

        const updatedControls = {
            ...this.state.controls,
            [inputId]: {
                ...this.state.controls[inputId],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[inputId].validation),
                touched: true
            }
        };

        this.setState({
            controls: updatedControls
        });
    };

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

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
    }

    render(){
        const formElements = [];

        for(let key in this.state.controls){
            formElements.push({
                id: key,
                config: this.state.controls[key]
            })
        };

        let form = (
            <form onSubmit={this.submitHandler}>
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
                <Button btnType="Success">{this.state.isSignup ? 'SIGN-UP' : 'SIGN-IN'}</Button>
            </form>            
        );

        if(this.props.loading){
            form = <Spinner/>;
        };

        let authRedirect = null;
        if(this.props.isAuthenticated){
            authRedirect = <Redirect to={this.props.authRedirectPath}/>
        }

        let errorMessage = null;
        if(this.props.error){
            errorMessage = (
                <p>{this.props.error.message}</p>
            );
        };

        return(
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                {form}
                <Button clicked={this.swithAuthModeHandler} btnType="Danger">SWITCH TO {this.state.isSignup ? 'SIGN-IN' : 'SIGN-UP'}</Button>
            </div>
        );
    };
};

const mapStateToProps = (state) => {
    return{
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    };
};

const mapDispatchToProps = (dispatch) => {
    return{
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);