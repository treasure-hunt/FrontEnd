import React, { Component } from 'react'

export class Canvas extends Component {
    constructor() {
        super();
        this.state = {
          width: window.innerWidth * .7,
          height: window.innerHeight
        }
      }
    
    componentDidMount() {

        const canvas = this.refs.canvas
        const c = canvas.getContext("2d")
        window.addEventListener('resize', this.canvasResize())
        for(let i = 7; i < this.state.width -1; i+=15){
            for(let j = 12; j < this.state.height; j+=15){
                this.circleRoom(c, i, j)
            }    
         }   
      }
    
    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }
    
    canvasResize = () => {
        this.setState({
            width: window.innerWidth * .7,
            height: window.innerHeight
        })
    }

    circleRoom = (c, x, y) => {
        c.beginPath()
        c.arc(x, y, 5, 0, Math.PI * 2, false)
        c.fill()
    }
    render() {
        return (
            <div className="canvasWrapper">
                <canvas ref="canvas" width={this.state.width} height={this.state.height}/>
            </div>
        )
    }
}

export default Canvas
