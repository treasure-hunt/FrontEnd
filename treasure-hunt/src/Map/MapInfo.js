import React, { Component } from 'react'
import Blockchain from '../Blockchain/Blockchain.js'
import Title from './Title'
import Popup from "./Popup"

export class MapInfo extends Component {

    state = {
        showPopup:false,
        coolDown: 0
    }
    componentDidMount(){
        this.setState({
            coolDown:this.props.coolDown
        })
        this.myInterval = setInterval(() => {
            if(this.state.coolDown > 0.5 ){
            this.setState({
                coolDown:this.state.coolDown - 1
            })
        } 
        if(this.state.coolDown === 0.5){
            this.setState({
                coolDown:this.state.coolDown - .5
            })
        }
        }, 1000)  
    }

    componentDidUpdate(prevProps){
        if (this.props.coolDown !== prevProps.coolDown) {
            this.setState({
                coolDown: this.props.coolDown
            })
          }
    }

    // componentWillUnmount(){
    //     clearInterval(this.myInterval)
    // }

    togglePopup = () => {  
        this.setState({  
             showPopup: !this.state.showPopup  
        });  
      }  

    popUpClick = () => {
        this.togglePopup()
        this.props.playerStats()
    }

    render() {
        const dir = ["n","s","e","w"]
        return (
            <div className="mapInfoWrapper">
                <Title />
                <div className='roomAndCoords'>
                    <h1>Room {this.props.roomData.room_id}</h1>
                    <h1>{this.props.roomData.coordinates}</h1>
                </div>
                <div className='title-description'>
                    <h3>{this.props.roomData.title}</h3>
                    <p>{this.props.roomData.description}</p>
                    <div className='roomData-items'>
                    <h3>Items</h3>
                    <p>There are {this.props.items.length} items in this room</p>
                    {this.props.items.map(item => {
                        return <button className='grab-button' onClick = {() => this.props.takeItem(item)}>Grab: {item}</button> 
                    })}
                    {/* <button onClick = {() => this.props.dropItem(item)}>Drop: {item}</button> */}
                    </div>
                    <div className='roomData-players'>
                        <h3>Players</h3>
                        <p>There are {this.props.players.length} players in this room</p>
                    </div>
                </div>
                
                <div className='game-buttons'>
                    <button onClick={() => this.popUpClick()}>Stats</button>
                
                    {this.state.showPopup ?  
                        <Popup 
                        togglePopup= {this.togglePopup}
                        playerStatus = {this.props.playerStatus}
                        />  
                        : null  
                    }  

                {/* {this.props.moving 
                    ? <button onClick={this.props.stopTraverse}>Stop Traverse</button> 
                : <button onClick={this.props.startTraverse}>Start Traverse</button>} */}
                
                {/* {this.props.roomData.title === "Shop" 
                    ? <button 
                    onClick={() => this.props.sellTreasure()}>Sell Treasure</button> 
                    : <button 
                onClick={this.alert}>Sell Treasure</button>} */}
                {this.props.roomData.title === "Pirate Ry's" ? 
                <form> 
                    <input
                    type = "text"
                    name = "name"
                    onChange = {this.props.handleChanges}
                    placeholder = "Enter a Name..."
                    />
                <button onClick={() => this.props.nameChange()}>Change Name</button> 
                </form>
                : <button onClick={this.alertName}>Change Name</button>}
                {this.props.roomData.title === "The Peak of Mt. Holloway" || 
                this.props.roomData.title === "Linh's Shrine" 
                ? <button onClick={() => this.props.pray()}>Pray</button> 
                : <button onClick={this.alertPray}>Pray</button>}
                </div>
                
                
                {/* Sell Treasure needs work
                
                {this.props.playerStatus && this.props.playerStatus.inventory.map(item => {
                    return <button onClick={()=> this.props.sellTreasure(item)}>Sell {item}</button>
                })
            } */}

                <h3 className='player-message'>{this.props.roomData.messages}</h3>
                <h3>{this.props.roomData.errors}</h3>
                <h2 id="timer">Cool Down: {this.state.coolDown}</h2>
                
                <div className="directionButtons">
                    <button className={this.props.exitList.includes(dir[0]) 
                        ? 'button availableButton' : 'button regularButton'} 
                        onClick={() =>{this.props.movePlayer(dir[0])}}>N</button>
                    <button className={this.props.exitList.includes(dir[1]) 
                        ? 'button availableButton' : 'button regularButton'} 
                        onClick={() =>{this.props.movePlayer(dir[1])}}>S</button>
                    <button className={this.props.exitList.includes(dir[2]) 
                        ? 'button availableButton' : 'button regularButton'} 
                        onClick={() =>{this.props.movePlayer(dir[2])}}>E</button>
                    <button className={this.props.exitList.includes(dir[3]) 
                        ? 'button availableButton' : 'button regularButton'} 
                        onClick={() =>{this.props.movePlayer(dir[3])}}>W</button>
                </div>
                {/* <div>
                    <Blockchain /> 
                </div> */}
                <div className='logout'>
                    <button onClick={this.props.signOut}>Log Out</button>
                </div>
            </div>
        )
    }

    alert = () => {
        alert("You are not in the shop")
    }

    alertName = () => {
        alert("You are not at Pirate Ry's")
    }

    alertPray = () => {
        alert("You are not at the Shrine")
    }
   
}

export default MapInfo
