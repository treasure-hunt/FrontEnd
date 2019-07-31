import React from 'react';
import SHA256 from 'crypto-js/sha256'
import axios from 'axios'
class Transaction {

    constructor(from,to,amount){
        this.from = from
        this.to = to
        this.amount = amount
    }
}

class Block {
    calculateHash(){
        return SHA256(this.previousHash + this.timestamp + JSON.stringify(this.data)+ this.nonce).toString();
    }

    mineBlock = (difficulty) => {
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')){
        this.nonce++;
        this.hash = this.calculateHash()
    }
    console.log(`Block Mined: ${this.hash}`)
}
    
    
    constructor(timestamp, data, previousHash = ''){
        this.timestamp = timestamp
        this.previousHash = previousHash
        this.data = data

        this.hash = this.calculateHash();
        this.nonce = 0
    }
}

class Blockchain {
    //Creates genesis block
    createGenesisBlock(){
        return new Block(new Date(), "Genesis block", "0")
    }

    //Gets latest Block of the chain
    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    //Adds new block to chain
    addBlock(newBlock){
        // The new block needs to point to the hash of the latest block on the chain.
        newBlock.previousHash = this.getLatestBlock().hash
        // Calculate the hash of the new block
        newBlock.hash = newBlock.calculateHash();
        
        newBlock.mineBlock(this.difficulty)
        // Now the block is ready and can be added to chain!
        this.chain.push(newBlock)
    }

    isChainValid(){
        for (let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

        if(currentBlock.hash !== currentBlock.calculateHash()){
            return false
        }
        if (currentBlock.previousHash !== previousBlock.hash){
            return false;
        }
    }
        return true
}


    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 3
    }
}



class BlockchainComponent extends React.Component {
    state = {
        proof: 0,
        difficulty: 0,

    }

    getProof = () => {
        axios.get('https://lambda-treasure-hunt.herokuapp.com/api/bc/last_proof/',
        {headers:{
          'Authorization': `Token ${localStorage.token}`,
        }})
          .then(res => {
            console.log(res.data)
            this.setState({
                proof: res.data.proof,
                difficulty: res.data.difficulty
            })
            
          })
          .catch(err => {
            console.log(err)
          })
    }

    mineCoin = () => {
        let blockchain = new Blockchain();
        blockchain.difficulty = this.state.difficulty;
        console.log(blockchain)
        axios.post('https://lambda-treasure-hunt.herokuapp.com/api/bc/mine/',
        {
            "proof": `${blockchain.chain.nonce}`
        },
        {headers:{
          'Authorization': `Token ${localStorage.token}`,
        }})
          .then(res => {
            console.log(res.data)
            
          })
          .catch(err => {
            console.log(err.message)
          })
    }


    render(){
    let terrellsBlock = new Blockchain()
    terrellsBlock.addBlock(new Block(new Date(), {amount : 1}))
    terrellsBlock.addBlock(new Block(new Date(), {amount : 2}))
    console.log(JSON.stringify(terrellsBlock, null, 4));
    console.log(`Blockchain valid? ${terrellsBlock.isChainValid()}`)
    console.log(terrellsBlock)
        return(
        <div>
            <h1>Blockchain</h1>
            <button onClick={this.getProof}>Get Proof</button>
            <button onClick={this.mineCoin}>MINEEE</button>
        </div>
    )
        }
}

export default BlockchainComponent