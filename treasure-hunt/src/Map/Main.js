import React, { Component } from 'react'
import Canvas from "./Canvas/Canvas"
import MapInfo from "./MapInfo"
import axios from 'axios'
import token from "../tokens"

export class App extends Component {
  state = {
    exitList:[]
  }

  componentDidMount = () => {
    this.playerRoom()
  }


  playerRoom = () => {   
    axios.get('https://lambda-treasure-hunt.herokuapp.com/api/adv/init/',
    {headers:{
      'Authorization': `Token ${token.terrell}`,
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

  movePlayer = (direction) => {   
    axios.post('https://lambda-treasure-hunt.herokuapp.com/api/adv/move/', {"direction" : `${direction}`},
    {headers:{
      'Authorization': `Token ${token.terrell}`,
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
    console.log(token.terrell)
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

