import React, { Component } from 'react'
import axios from 'axios'

export class Canvas extends Component {
    constructor() {
        super();
        this.state = {
          width: window.innerWidth,
          height: window.innerHeight,
          rooms:[],
        }
      }
    
    componentDidMount = () => {
        this.canvasResize()
        // this.updateDimensions()
        this.getRooms()
        this.dotSetup()    
    }
    componentDidUpdate = (prevProps, prevState) => {
        if(prevState.rooms.length != this.state.rooms.length){
            this.dotSetup()
        }
    }
    
    componentWillUnmount() {
        window.removeEventListener("resize", this.canvasResize);
    }

    // updateDimensions = () => {
    //     console.log("Width is:"+this.state.width);
    //     console.log("Height is:"+this.state.height);
    //     let width = this.refs.canvas.width;
    //     let height= this.refs.canvas.height;
    //     this.setState({width:width,height:height});
    //   }
    
    canvasResize = () => {
        this.setState({
            width: window.innerWidth * .7,
            height: window.innerHeight
        })
    }

    dotSetup = () => {
        const canvas = this.refs.canvas
        const c = canvas.getContext("2d")
        window.addEventListener('resize', this.canvasResize())
        this.state.rooms.forEach(room => {
            room.coords.y = 120 - room.coords.y
            this.dotRoom(c, room.coords.x, room.coords.y)
        });
           
    }

    getRooms = () => {
        axios.get(`https://treasure-hunt-legend.herokuapp.com/rooms`,{},
            {headers:{
            'Authorization': `Token ${localStorage.token}`,
            }})
        .then(res => {
            console.log(res.data[0])
            this.setState({
                rooms: res.data
            })
        })
        .catch(err => {
            console.log(err)
        })
    }

    dotRoom = (c, x, y) => {
        let roomHeight = this.state.height / 35
        let roomWidth = this.state.width / 35
        let roomX = x * roomWidth - roomWidth*42
        let roomY = y * roomHeight - roomHeight*42
        let colorArray = ['blue', 'grey', 'green']
        c.beginPath()
        c.arc(roomX, roomY, 4, 0, Math.PI * 2, false)
        if(x === 59 && y === 60){
            c.fillStyle = colorArray[0]
        }
        else if(1){
            c.fillStyle = colorArray[1]
        }
        else if(2){
            c.fillStyle = colorArray[2]
        }
        c.fill()
    }

    render() {
        return (
            <div className="canvasWrapper">
                <canvas ref="canvas" width={this.state.width} height={this.state.height} style={{ width: '70%', height: '100%' }}/>
            </div>
        )
    }
}

export default Canvas
