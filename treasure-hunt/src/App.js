import React, { Component } from 'react'
import './App.scss'
import Canvas from "./Canvas/Canvas"
import MapInfo from "./Map/MapInfo"
import axios from 'axios'
import token from "./tokens"

export class App extends Component {
  state = {
    exitList:[]
  }

  componentDidMount = () => {
    // this.movePlayer()
  }


  movePlayer = (direction) => {   
    axios.post('https://lambda-treasure-hunt.herokuapp.com/api/adv/move/', {"direction" : `${direction}`},
    {headers:{
      'Authorization': `Token ${token.mike}`,
    }})
      .then(res => {
        console.log(res.data)
        this.setState({
          exitList:res.data.exits
        })
      })
      .catch(err => {
        console.log(err)
        
      })
  }

  render() {
    console.log(token.jake)
    return (
      <div className="App">
       <Canvas/>
       <MapInfo
        exitList = {this.state.exitList}
        movePlayer={this.movePlayer}
       />
      </div>
    )
  }
}

export default App

