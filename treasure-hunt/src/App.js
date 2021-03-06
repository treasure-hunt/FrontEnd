import React, { Component } from 'react'
import './App.scss'
import { withRouter, Switch } from "react-router-dom";
// import MapView from "./Map/MapView"
// import LoginView from "./Login/LoginView"
import Main from "./Map/Main"
import Title from "./Map/Title"
import Login from "./Login/Login"
import authenticate from './Login/authenticate'


export class App extends Component {
 
  render() {
    return (
      <div className="app">
          <Auth/>
      </div>
    )
  }
}

const Auth = withRouter(authenticate(Main)(Login));

export default App

