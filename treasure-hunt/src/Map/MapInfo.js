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
        return (
            <div className="mapInfoWrapper">
                <h1>Pathways: {this.props.exitList}</h1>
                <h1>Cool Down: {this.props.coolDown}</h1>
             
                <button className={this.props.exitList.includes('n') ? 'availableButton' : 'regularButton'} onClick={() =>{this.props.movePlayer(dir[0])}}>N</button>
                <button className={this.props.exitList.includes('s') ? 'availableButton' : 'regularButton'} onClick={() =>{this.props.movePlayer(dir[1])}}>S</button>
                <button className={this.props.exitList.includes('e') ? 'availableButton' : 'regularButton'} onClick={() =>{this.props.movePlayer(dir[2])}}>E</button>
                <button className={this.props.exitList.includes('w') ? 'availableButton' : 'regularButton'} onClick={() =>{this.props.movePlayer(dir[3])}}>W</button>
            
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
