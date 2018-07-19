// Dependency import
import React, {Component} from 'react';
import {connect} from 'react-redux'

// Component imports
import Aux from '../Aux/Aux';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

// Asset imports
import classes from './Layout.css';

// Component
class Layout extends Component {
    
    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({
            showSideDrawer: false
        });
    }

    sideDrawerToggleHandler = () => {
        // Setting state when it depends on old state
        this.setState((prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer}
        });
    }
    
    render(){
        return(
            <Aux>
                <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} isAuth={this.props.isAuthenticated}/>
                <SideDrawer closed={this.sideDrawerClosedHandler} open={this.state.showSideDrawer} isAuth={this.props.isAuthenticated}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        isAuthenticated: state.auth.token !== null
    };
};

export default connect(mapStateToProps)(Layout);