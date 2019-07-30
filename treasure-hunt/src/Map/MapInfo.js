import React, { Component } from 'react'
import Timer from "react-compound-timer"

export class MapInfo extends Component {
    
    // componentDidMount() {
    //     this.interval = setInterval(() => this.setState({ coolDown: this.props.coolDown }), 1000);
    // }
    // componentWillUnmount() {
    //     clearInterval(this.interval);
    // }
    render() {
        const dir = ["n","s","e","w"]
        // let items = this.props.roomData.items; 
        let players = this.props.players;
        console.log(players)
        return (
            <div className="mapInfoWrapper">
                    {/* {console.log(players.players)} */}
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
                        </div>
                        <div className='roomData-players'>
                            <h3>Players</h3>
                            <p>There are {this.props.players.length} players in this room</p>
                        </div>
                    </div>
             
                <button className={this.props.exitList.includes('n') ? 'availableButton' : 'regularButton'} onClick={() =>{this.props.movePlayer(dir[0])}}>N</button>
                <button className={this.props.exitList.includes('s') ? 'availableButton' : 'regularButton'} onClick={() =>{this.props.movePlayer(dir[1])}}>S</button>
                <button className={this.props.exitList.includes('e') ? 'availableButton' : 'regularButton'} onClick={() =>{this.props.movePlayer(dir[2])}}>E</button>
                <button className={this.props.exitList.includes('w') ? 'availableButton' : 'regularButton'} onClick={() =>{this.props.movePlayer(dir[3])}}>W</button>
                <h1>Pathways: {this.props.exitList}</h1>
                <h1>Cool Down: {this.props.coolDown}</h1>
        {/* <Timer
            initialTime={65000}
            direction="backward"
        >
        {({ start, resume, pause, stop, reset }) => (
            <React.Fragment>
                <div>
                    <Timer.Minutes /> minutes
                    <Timer.Seconds /> seconds
                </div>
                <div>
                    <button onClick={start}>Start</button>
                    <button onClick={pause}>Pause</button>
                    <button onClick={resume}>Resume</button>
                    <button onClick={stop}>Stop</button>
                    <button onClick={reset}>Reset</button>
                </div>
            </React.Fragment>
        )}
        </Timer> */}
            </div>
        )
    }
}

export default MapInfo
