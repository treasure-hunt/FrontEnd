import React, { Component } from 'react'
import Canvas from "./Canvas/Canvas"
import MapInfo from "./MapInfo"
import axios from 'axios'
import token from "../tokens"

export class App extends Component {
  state = {
    exitList:[],
    coolDown:0
  }

  componentDidMount = () => {
    this.playerRoom()
  }

  playerRoom = () => {   
    setTimeout(() => {
        axios.get('https://lambda-treasure-hunt.herokuapp.com/api/adv/init/',
        {headers:{
        'Authorization': `Token ${localStorage.token}`,
        }})
        .then(res => {
            console.log(res.data)
            this.setState({
            exitList:res.data.exits,
            coolDown:res.data.cooldown
            })
        })
        .catch(err => {
            console.log(err)
            
        })
    },1010)
  }

  movePlayer = (direction) => {   
    
    axios.post(`https://treasure-hunt-legend.herokuapp.com/traverse/${direction}`,{},
    {headers:{
      'Authorization': `Token ${localStorage.token}`,
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
    return (
      <div className="App">
       <Canvas/>
       <MapInfo
        coolDown = {this.state.coolDown}
        exitList = {this.state.exitList}
        movePlayer={this.movePlayer}
       />
      </div>
    )
  }
}

export default App

