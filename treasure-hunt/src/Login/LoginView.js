import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom';
import Login from './Login';

export class loginView extends Component {
    render() {
        return (
            <div>
            <Route exact path='/login' render = {(...props) => (<Login
                handleChanges = {this.props.handleChanges}
                signIn = {this.props.signIn}
                token = {this.props.token}
                name = {this.props.name}
                {...props}
            />)}/>
            </div>
        )
    }
}

export default loginView
