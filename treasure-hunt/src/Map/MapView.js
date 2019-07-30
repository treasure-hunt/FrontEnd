import React, { Component } from 'react'
import Main from "./Main";
import { Route, Switch } from 'react-router-dom';


export class MapView extends Component {
    render() {
        return (
            <div>
                <Route path="/"
                exact
                render={(...props) => <Main logOff={this.props.logOff} {...props} />} />
            </div>
        )
    }
}

export default MapView
