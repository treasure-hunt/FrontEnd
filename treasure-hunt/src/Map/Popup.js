import React from 'react';   

class Popup extends React.Component { 
    
    
  render() {  
      console.log(this.props.playerStatus)
    return (  
    <div className='popup'>  
        <h2 onClick={() => this.props.togglePopup()}>X</h2>  
        <h1 className="name">{this.props.playerStatus.name}</h1>
        <div className="innerPopup">
            <h2 className="stats encumbrance">Encumbrance: {this.props.playerStatus.encumbrance}</h2>
            <h2 className="stats speed">Speed: {this.props.playerStatus.speed}</h2>
            <h2 className="stats strength">Strength: {this.props.playerStatus.strength}</h2>
            <h2 className="stats gold">Gold: {this.props.playerStatus.gold}</h2>
            <h2 className="stats inventory">Inventory: {this.props.playerStatus.inventory}</h2>
        </div>
    </div>  
    );  
  }  
}  

export default Popup;