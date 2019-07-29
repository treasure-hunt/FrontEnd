import React, { Component } from 'react'
import Timer from "react-compound-timer"

export class MapInfo extends Component {
    
    render() {
        const dir = ["n","s","e","w"]
        return (
            <div className="mapInfoWrapper">
                <button onClick={() =>{this.props.movePlayer(dir[0])}}>Move North</button>
                <button onClick={() =>{this.props.movePlayer(dir[1])}}>Move South</button>
                <button onClick={() =>{this.props.movePlayer(dir[2])}}>Move East</button>
                <button onClick={() =>{this.props.movePlayer(dir[3])}}>Move West</button>
                <h1>{this.props.exitList}</h1>
                <Timer
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
        </Timer>
            </div>
        )
    }
}

export default MapInfo
