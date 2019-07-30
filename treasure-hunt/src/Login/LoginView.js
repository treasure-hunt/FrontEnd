import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom';
import Login from './Login';

export class loginView extends Component {
    render() {
        return (
            <div>
                <Route exact path='/login' component = {Login}/>
            </div>
        )
    }
}

export default loginView
