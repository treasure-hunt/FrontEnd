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
            this.linePath(c, room.coords.x, room.coords.y, room.exits.n,room.exits.s,room.exits.w,room.exits.e)
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
        console.log("x",Math.floor(roomX), "y",Math.floor(roomY))
        let colorArray = ['blue', 'grey', 'green']
        c.beginPath()
        c.arc(Math.floor(roomX), Math.floor(roomY), 4, 0, Math.PI * 2, false)
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
        console.log(this.props.exitList)
        console.log(this.state.rooms)
        return (
            <div className="canvasWrapper">
                <canvas ref="canvas" width={this.state.width} height={this.state.height} style={{ width: '70%', height: '100%' }}/>
            </div>
        )
    }
}

export default Canvas
