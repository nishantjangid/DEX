const { Web3 } = require("web3");
const { DEX, DexABI,  TokenA,  TokenB } = require("../contracts");
const HDWalletProvider = require("@truffle/hdwallet-provider");
require("dotenv").config();

const removeLiquidity = () => {
    return new Promise(async(resolve,reject)=>{
        try{
            let provider = new  HDWalletProvider([process.env.PRIVATE_KEY],process.env.RPC_URL)
            let web3 = new Web3(provider);
            let contract = new web3.eth.Contract(DexABI,DEX);                        
            let gasPrice = await web3.eth.getGasPrice();
            let gasLimit = await contract.methods.removeLiquidity(TokenA,TokenB).estimateGas({from:process.env.ADDRESS})
            let removeLiquidity = await contract.methods.removeLiquidity(TokenA,TokenB).send({from:process.env.ADDRESS,gasPrice,gasLimit})

            resolve(removeLiquidity);
        }catch(err){
            reject(err);
        }

    })
}

module.exports = removeLiquidity;