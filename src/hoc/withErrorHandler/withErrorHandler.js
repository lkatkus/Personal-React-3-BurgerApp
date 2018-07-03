// Dependency imports
import React, {Component} from 'react';

// Component imports
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';

// Component
const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        }

        componentWillMount(){
            this.reqInterceptor = axios.interceptors.request.use((req) => {
                this.setState({error: null});
                return req;
            });

            this.resInterceptor = axios.interceptors.response.use((res) => res, (err) => {
                this.setState({error: err});
            });
        }

        componentWillUnmount(){
            // Removing interceptors to prevent memory leaks
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.request.eject(this.resInterceptor);
        }

        errorConfirmedHandler = () => {
            this.setState({error: null})
        }

        render(){
            return(
                <Aux>
                    <Modal show={this.state.error} modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </Aux>
            );
        }
    };
};

export default withErrorHandler;