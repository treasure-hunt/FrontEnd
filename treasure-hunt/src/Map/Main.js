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
    // moving: false,
    currentPos: [],
    currentRoom: [],
    playerStatus: [],
    name: '',
  }

  componentDidMount = () => {
    this.playerRoom()
    // setTimeout(() => {
    //   this.playerStats()
    // }, 1100)
  }

  playerRoom = () => {   
    
        axios.get('https://lambda-treasure-hunt.herokuapp.com/api/adv/init/',
        {headers:{
        'Authorization': `Token ${localStorage.token}`,
        }})
        .then(res => {
            // console.log(res.data)
            this.setState({
            exitList:res.data.exits,
            coolDown:res.data.cooldown,
            roomData: res.data,
            players: res.data.players,
            items: res.data.items,
            currentRoom: res.data
            })
        })
        .catch(err => {
            console.log(err)
        })

  }

  takeItem = (item) => {    
    axios.post('https://lambda-treasure-hunt.herokuapp.com/api/adv/take/',{
      "name": item,
    },
    {headers:{
      'Authorization': `Token ${localStorage.token}`,
    }})
      .then(res => {
        console.log(res.data)
        this.setState({
          exitList:res.data.exits,
          roomData: res.data,
          coolDown:res.data.cooldown,
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
          roomData: res.data,
          coolDown:res.data.cooldown,
          currentRoom: res.data,
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
          playerStatus: res.data,
          coolDown:res.data.cooldown,
        })
      })
      .catch(err => {
        console.log(err.response)
      })
  }

  // startTraverse = () => {   
    
  //   axios.post('https://treasure-hunt-legend.herokuapp.com/autotraverse',{},
  //   {headers:{
  //     'Authorization': `Token ${localStorage.token}`,
  //   }})
  //     .then(res => {
  //       console.log(res.data)
  //       this.setState({
  //         moving: true,
  //         coolDown:res.data.cooldown,
  //       })
  //     })
  //     .catch(err => {
  //       console.log(err)
  //     })
  // }

  // stopTraverse = () => {   
    
  //   axios.delete('https://treasure-hunt-legend.herokuapp.com/autotraverse',
  //   {headers:{
  //     'Authorization': `Token ${localStorage.token}`,
  //   }},{})
  //     .then(res => {
  //       console.log(res.data)
  //       this.setState({
  //         moving: false,
  //         coolDown:res.data.cooldown,
  //       })
  //       .catch(err => {
  //         console.log(err)
  //       })
  //     })
  // }

  // sellTreasure = (item) => {   
    
  //   axios.post('https://lambda-treasure-hunt.herokuapp.com/api/adv/sell/',{
  //     "name": item,
  //     "confirm": "yes"
  //   },
  //   {headers:{
  //     'Authorization': `Token ${localStorage.token}`,
  //   }})
  //     .then(res => {
  //       console.log(res.data)
  //     })
  //     .catch(err => {
  //       console.log(err)
  //     })
  // }

  nameChange = (name) => {   
    
    axios.post('https://lambda-treasure-hunt.herokuapp.com/api/adv/change_name/',{
      "name": name,
      "confirm": "aye"
    },
    {headers:{
      'Authorization': `Token ${localStorage.token}`,
    }})
      .then(res => {
        console.log(res.data)
        this.setState({
          coolDown:res.data.cooldown,
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  pray = () => {   
    
    axios.post('https://lambda-treasure-hunt.herokuapp.com/api/adv/pray/',{
    },
    {headers:{
      'Authorization': `Token ${localStorage.token}`,
    }})
      .then(res => {
        console.log(res.data)
        this.setState({
          coolDown:res.data.cooldown,
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  // dropItem = (item) => {
  //   axios.post('https://lambda-treasure-hunt.herokuapp.com/api/adv/drop/',{
  //     "name": item
  //   },
  //   {headers:{
  //     'Authorization': `Token ${localStorage.token}`,
  //   }})
  //     .then(res => {
  //       console.log(res.data)
  //     })
  //     .catch(err => {
  //       console.log(err)
  //     })
  // }

  handleNameChange = (event) => {
    this.setState({
      name: event.target.value
    })
  }

 

  render() {
    // console.log(this.state.playerStats)
    return (
      <div className="Main">
       <Canvas
       exitList = {this.state.exitList}
       currentRoom = {this.state.currentRoom}
       currentRoomId = {this.state.currentRoom.room_id}
       />
       <MapInfo
        signOut = {this.props.signOut}
        // moving = {this.state.moving}
        // startTraverse = {this.startTraverse}
        // stopTraverse = {this.stopTraverse}
        playerStats = {this.playerStats}
        playerStatus = {this.state.playerStatus}
        takeItem = {this.takeItem}
        // dropItem = {this.dropItem}
        coolDown = {this.state.coolDown}
        exitList = {this.state.exitList}
        roomData = {this.state.roomData}
        movePlayer={this.movePlayer}
        players={this.state.players}
        items={this.state.items}
        // sellTreasure = {this.sellTreasure}
        nameChange = {this.nameChange}
        // handleNameChange = {this.handleNameChange}
        pray = {this.pray}
        showPopUp = {this.state.showPopUp}
       />
      </div>
    )
  }
}

export default App

