import React, { Component } from 'react'
import Blockchain from '../Blockchain/Blockchain.js'

export class MapInfo extends Component {
    
    // componentDidMount() {
    //     this.interval = setInterval(() => this.setState({ coolDown: this.props.coolDown }), 1000);
    // }
    // componentWillUnmount() {
    //     clearInterval(this.interval);
    // }

    alert = () => {
        alert("You are not in the shop")
    }

    alertName = () => {
        alert("You are not at Pirate Ry's")
    }

    alertPray = () => {
        alert("You are not at the Shrine")
    }
    


    render() {
        const dir = ["n","s","e","w"]
        return (
            <div className="mapInfoWrapper">
                <div>
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
                        return <>
                        <button onClick = {() => this.props.takeItem(item)}>Grab: {item}</button> 
                         <button onClick = {() => this.props.dropItem(item)}>Drop: {item}</button>
                        </>
                        })
                    }
                    </div>
                    <div className='roomData-players'>
                        <h3>Players</h3>
                        <p>There are {this.props.players.length} players in this room</p>
                    </div>
                </div>
                <div>
                    <Blockchain /> 
                </div>
                <div className="directionButtons">
                    <button className={this.props.exitList.includes(dir[0]) ? 'button availableButton' : 'button regularButton'} onClick={() =>{this.props.movePlayer(dir[0])}}>N</button>
                    <button className={this.props.exitList.includes(dir[1]) ? 'button availableButton' : 'button regularButton'} onClick={() =>{this.props.movePlayer(dir[1])}}>S</button>
                    <button className={this.props.exitList.includes(dir[2]) ? 'button availableButton' : 'button regularButton'} onClick={() =>{this.props.movePlayer(dir[2])}}>E</button>
                    <button className={this.props.exitList.includes(dir[3]) ? 'button availableButton' : 'button regularButton'} onClick={() =>{this.props.movePlayer(dir[3])}}>W</button>
                </div>
                <button onClick={() => this.props.playerStats()}>Stats</button>
                {this.props.roomData.title === "Shop" ? <button onClick={() => this.props.sellTreasure()}>Sell Treasure</button> : <button onClick={this.alert}>Sell Treasure</button>}
                {this.props.roomData.title === "Pirate Ry's" ? 
                <form> 
                    <input
                    type = "text"
                    name = "name"
                    onChange = {this.props.handleChanges}
                    placeholder = "Enter a Name..."
                    />
                <button onClick={() => this.props.changeName()}>Change Name</button> 
                </form>
                : <button onClick={this.alertName}>Change Name</button>}
                {this.props.roomData.title === "Peak of Mt. Holloway" ? <button onClick={() => this.props.pray()}>Pray</button> : <button onClick={this.alertPray}>Pray</button>}
            </div>
        )
    }
}

export default MapInfo
