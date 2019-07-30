import React, { Component } from 'react'
import './App.scss'
import { withRouter, Switch } from "react-router-dom";
import MapView from "./Map/MapView"
import LoginView from "./Login/LoginView"
import authenticate from './Login/authenticate'


export class App extends Component {
 
  render() {
    return (
      <div className="App">
        <Switch>
          {/* <Main/> */}
          <Auth/>
        </Switch>
      </div>
    )
  }
}

const Auth = withRouter(authenticate(MapView)(LoginView));

export default App

