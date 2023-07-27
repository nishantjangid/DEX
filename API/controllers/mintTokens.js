const { Web3 } = require("web3");
const { TokenAabi, TokenA, TokenBabi, TokenB } = require("../contracts");
const HDWalletProvider = require("@truffle/hdwallet-provider");
require("dotenv").config();

const mintTokens = (address,tokens) => {
    return new Promise(async(resolve,reject)=>{
        try{
            let provider = new  HDWalletProvider([process.env.PRIVATE_KEY],process.env.RPC_URL)
            let web3 = new Web3(provider);            
            let tokenAContract = new web3.eth.Contract(TokenAabi,TokenA);
            let tokenBContract = new web3.eth.Contract(TokenBabi,TokenB);                        
            let tokensToBeMint = web3.utils.toWei(tokens.toString(),'ether');                
            let mintA = await tokenAContract.methods.mint(address,tokensToBeMint).send({from:process.env.ADDRESS});                        
            let mintB = await tokenBContract.methods.mint(address,tokensToBeMint).send({from:process.env.ADDRESS});
            
            resolve(mintB);
        }catch(err){
            reject(err);
        }

    })
}

module.exports = mintTokens;