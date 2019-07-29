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
        this.dotSetup()    
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

    dotSetup = () => {
        let dotSpacing = 15
        const canvas = this.refs.canvas
        const c = canvas.getContext("2d")
        window.addEventListener('resize', this.canvasResize())
        for(let i = dotSpacing; i < this.state.width - dotSpacing; i+=dotSpacing){
            for(let j = dotSpacing; j < this.state.height - dotSpacing; j+=dotSpacing){
                this.dotRoom(c, i, j)
            }    
         }   
    }

    dotRoom = (c, x, y) => {
        let colorArray = ['blue', 'white', 'green']
        c.beginPath()
        c.arc(x, y, 5, 0, Math.PI * 2, false)
        if(0){
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
                <canvas ref="canvas" width={this.state.width} height={this.state.height}/>
            </div>
        )
    }
}

export default Canvas
