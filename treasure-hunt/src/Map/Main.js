import React, { Component } from 'react'
import Canvas from "./Canvas/Canvas"
import MapInfo from "./MapInfo"
import axios from 'axios'

export class App extends Component {
  state = {
    roomData: [],
    players: [],
    exits:[],
    items: [],
    currentRoom: [],
    playerStatus: [],
    // name: '',
  }

  componentDidMount = () => {
    this.playerRoom()
  }

  playerRoom = () => {   
    
        axios.get('https://lambda-treasure-hunt.herokuapp.com/api/adv/init/',
        {headers:{
        'Authorization': `Token ${localStorage.token}`,
        }})
        .then(res => {
            // console.log(res.data)
            this.setState({
            exits:res.data.exits,
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
          exits:res.data.exits,
          roomData: res.data,
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
          exits:res.data.exits,
          roomData: res.data,
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
          roomData: res.data,
          // name:res.data.name
        })
      })
      .catch(err => {
        console.log(err.response)
      })
  }

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


  // Needs Work
  nameChange = (name) => {   
    console.log(name)
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
          roomData: res.data,
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
          roomData: res.data,
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
       currentRoom = {this.state.currentRoom}
       currentRoomId = {this.state.currentRoom.room_id}
       />
       <MapInfo
        signOut = {this.props.signOut}
        playerStats = {this.playerStats} //function
        playerStatus = {this.state.playerStatus} // value from stats function
        takeItem = {this.takeItem}
        exits = {this.state.exits}
        roomData = {this.state.roomData}
        movePlayer={this.movePlayer}
        players={this.state.players}
        items={this.state.items}
        nameChange = {this.nameChange}
        name = {this.state.name}
        pray = {this.pray}
        showPopUp = {this.state.showPopUp}
        // dropItem = {this.dropItem}
        // sellTreasure = {this.sellTreasure}
        // handleNameChange = {this.handleNameChange}
       />
      </div>
    )
  }
}

export default App

