import React, { Component } from 'react'
import Canvas from "./Canvas/Canvas"
import MapInfo from "./MapInfo"
import axios from 'axios'


export class App extends Component {
  state = {
    exitList:[],
    coolDown:0,
    roomData: {items:[]},
    players: [],
    items: [],

    currentPos: [],

    playerStats: []
  }

  componentDidMount = () => {
    this.playerRoom()
    // this.playerStats()
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

  // changeName = () => {   
    
  //       axios.get('https://lambda-treasure-hunt.herokuapp.com/api/adv/change_name/',
  //       {headers:{
  //       'Authorization': `Token ${localStorage.token}`,
  //       }})
  //       .then(res => {
  //           console.log(res.data)
  //           this.setState({
            
  //           })
  //       })
  //       .catch(err => {
  //           console.log(err)
            
  //       })
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

  playerStats = () => {   
    
    axios.post('https://lambda-treasure-hunt.herokuapp.com/api/adv/status/',{},
    {headers:{
      'Authorization': `Token ${localStorage.token}`,
    }})
      .then(res => {
        console.log(res.data)
        this.setState({
          playerStats: res.data
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    // console.log(this.state.playerStats)
    return (
      <div className="App">
       <Canvas/>
       <MapInfo
        playerStats = {this.playerStats}
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

