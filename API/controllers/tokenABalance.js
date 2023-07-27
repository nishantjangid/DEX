const { Web3 } = require("web3");
const { TokenAabi, TokenA } = require("../contracts");
require("dotenv").config();

const tokenABalance = (address) => {
    return new Promise(async(resolve,reject)=>{
        try{
            let web3 = new Web3(process.env.QUICKNODE_URL);
            let contract = new web3.eth.Contract(TokenAabi,TokenA);
            console.log(await contract.methods.balanceOf(address).call());
            let balance = parseInt(await contract.methods.balanceOf(address).call()) / 10 ** parseInt(await contract.methods.decimals().call());
            resolve(balance);
        }catch(err){
            reject(err);
        }

    })
}

module.exports = tokenABalance;