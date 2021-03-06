import React, { Component } from 'react'
import axios from 'axios'
var colorArray = ['rgb(0,206,237)','tomato', 'rgb(255,255,255)', 'grey']
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
        this.getRooms()  
        this.dotSetup()  
    }
    componentDidUpdate = (prevProps, prevState) => {
        if(prevState.rooms.length != this.state.rooms.length){
            this.state.rooms.forEach(room => {
                room.coords.y = 120 - room.coords.y
            });
            this.dotSetup()
        }
        if(prevProps.currentRoomId != this.props.currentRoomId){
            this.dotSetup()
        }
    }
    
    componentWillUnmount() {
        window.removeEventListener("resize", this.canvasResize);
    }
    
    canvasResize = () => {
        this.setState({
            width: window.innerWidth * .7,
            height: window.innerHeight
        })
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

    dotSetup = () => {
        // console.log(this.state.rooms)
        const canvas = this.refs.canvas
        const c = canvas.getContext("2d")
        window.addEventListener('resize', this.canvasResize())
        this.state.rooms.forEach(room => {
            this.linePath(c, room.coords.x, room.coords.y, room.exits.n,room.exits.s,room.exits.w,room.exits.e)
        });
        this.state.rooms.forEach(room => {
            this.dotRoom(c, room.coords.x, room.coords.y, room.id)
        });
    }


    dotRoom = (c, x, y, id) => {
        let roomHeight = this.state.height / 35
        let roomWidth = this.state.width / 35
        let roomX = x * roomWidth - roomWidth*42
        let roomY = y * roomHeight - roomHeight*42
       
        c.beginPath()
        c.arc(Math.floor(roomX), Math.floor(roomY), 4, 0, Math.PI * 2, false)
        if(this.props.currentRoomId === id){
            c.fillStyle = colorArray[0]
        }else{
            c.fillStyle = colorArray[1]
        }
        c.fill()
    }

    linePath = (c, x, y, n, s, w, e) => {
        let roomHeight = this.state.height / 35
        let roomWidth = this.state.width / 35
        let roomX = x * roomWidth - roomWidth*42
        let roomY = y * roomHeight - roomHeight*42
        let lastX = Math.floor(roomX)
        let lastY = Math.floor(roomY)
        let shiftX = 21
        let shiftY = 27
            if(n != null){
                c.beginPath()
                c.moveTo(lastX, lastY)
                c.lineTo(lastX, lastY - shiftY)
                c.strokeStyle = colorArray[3]
                c.stroke()
            }
            if(s != null){
                c.beginPath()
                c.moveTo(lastX, lastY)
                c.lineTo(lastX, lastY + shiftY)
                c.stroke()
            }
            if(w != null){
                c.beginPath()
                c.moveTo(lastX, lastY)
                c.lineTo(lastX - shiftX, lastY)
                c.stroke()
            }
            if(e != null){
                c.beginPath()
                c.moveTo(lastX, lastY)
                c.lineTo(lastX + shiftX, lastY)
                c.stroke()
            }
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
