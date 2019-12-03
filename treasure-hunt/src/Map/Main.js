import React, { Component } from 'react'
import Canvas from "./Canvas/Canvas"
import MapInfo from "./MapInfo"
import axios from 'axios'


// roomData={
//   cooldown: 15
//   coordinates: "(68,50)"
//   description: "You are standing on grass and surrounded by a dense mist. You can barely make out the exits in any direction."
//   elevation: 0
//   errors: []
//   exits: (3) ["n", "s", "e"]
//   items: (2) ["amazing treasure", "amazing treasure"]
//   messages: (2) ["You have walked north.", "Wise Explorer: -50% CD"]
//   players: ["yung ill"]
//   room_id: 352
//   terrain: "NORMAL"
//   title: "A misty room"
// }

// playerStatus = {
//   cooldown: 1
//   encumbrance: 9
//   errors: []
//   gold: 8800
//   has_mined: true
//   inventory: (5) ["amazing treasure", "amazing treasure", "amazing treasure", "flower", "flower"]
//   messages: []
//   name: "G.O.A.T."
//   speed: 10
//   status: []
//   strength: 10
// }

export class App extends Component {
  state = {
    roomData: [],
    players: [],
    exits:[],
    items: [],
    currentRoom: [],
    playerStatus: [],
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
          items: res.data.items,
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
          items: res.data.items,
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
          playerStatus:this.state.playerStatus
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

