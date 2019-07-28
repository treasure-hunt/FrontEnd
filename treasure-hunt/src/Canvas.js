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
        this.circleRoom(c)
        window.addEventListener('resize', this.canvasResize())
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

    circleRoom = c => {
        let x = Math.random() * this.state.width
        let y = Math.random() * this.state.height
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
