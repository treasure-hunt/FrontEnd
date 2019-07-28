import React, { Component } from 'react'
import './App.scss'
import Canvas from "./Canvas/Canvas"
import MapInfo from "./Map/MapInfo"

export class App extends Component {
  state = {

  }

  
  
  render() {
    return (
      <div className="App">
       <Canvas/>
       <MapInfo/>
      </div>
    )
  }
}

export default App

