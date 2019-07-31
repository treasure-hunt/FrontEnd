import React from 'react';
import SHA256 from 'crypto-js/sha256'
class Transaction {

    constructor(from,to,amount){
        this.from = from
        this.to = to
        this.amount = amount
    }
}

class Block {
    calculateHash(){
        return SHA256(this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
    
    constructor(timestamp, data, previousHash = ''){
        this.timestamp = timestamp
        this.previousHash = previousHash
        this.data = data

        this.hash = this.calculateHash();
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
    }
}



function BlockchainComponent(){
    let terrellsBlock = new Blockchain()
    terrellsBlock.addBlock(new Block(new Date(), {amount : 1}))
    terrellsBlock.addBlock(new Block(new Date(), {amount : 2}))
    console.log(JSON.stringify(terrellsBlock, null, 4));
    console.log(`Blockchain valid? ${terrellsBlock.isChainValid()}`)
    return(
        <div>
            <h1>Blockchain</h1>
        </div>
    )
}

export default BlockchainComponent