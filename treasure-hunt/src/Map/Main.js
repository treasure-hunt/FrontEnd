import React, { Component } from 'react'
import Canvas from "./Canvas/Canvas"
import MapInfo from "./MapInfo"
import axios from 'axios'
import token from "../tokens"

export class App extends Component {
  state = {
    exitList:[],
    coolDown:0,
    roomData: {items:[]},
    players: [],
    items: [],
    currentPos: []
  }

  componentDidMount = () => {
    this.playerRoom()
    // this.playerPos()
  }

  // playerPos = (id) => {   
    
  //   axios.get(`https://treasure-hunt-legend.herokuapp.com/rooms/${63}`,
  //   {headers:{
  //     'Authorization': `Token ${localStorage.token}`,
  //   }})
  //     .then(res => {
  //       console.log(res.data)
  //       this.setState({
  //         currentPos:res.data
  //       })
  //     })
  //     .catch(err => {
  //       console.log(err)
  //     })
  // }

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
            coolDown:res.data.cooldown,
            roomData: res.data,
            players: res.data.players,
            items: res.data.items
            })
        })
        .catch(err => {
            console.log(err)
            
        })
    },1010)
  }

  takeItem = (item) => {    
    axios.post('https://lambda-treasure-hunt.herokuapp.com/api/adv/take/',{
      "name": item
    },
    {headers:{
      'Authorization': `Token ${localStorage.token}`,
    }})
      .then(res => {
        console.log(res.data)
        this.setState({
          exitList:res.data.exits,
          roomData: res.data
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  movePlayer = (direction) => {   
    
    axios.post(`https://treasure-hunt-legend.herokuapp.com/traverse/${direction}`,{},
    {headers:{
      'Authorization': `Token ${localStorage.token}`,
    }})
      .then(res => {
        console.log(res.data)
        this.setState({
          exitList:res.data.exits,
          roomData: res.data
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
        takeItem = {this.takeItem}
        coolDown = {this.state.coolDown}
        exitList = {this.state.exitList}
        roomData = {this.state.roomData}
        movePlayer={this.movePlayer}
        players={this.state.players}
        items={this.state.items}
       />
      </div>
    )
  }
}

export default App

