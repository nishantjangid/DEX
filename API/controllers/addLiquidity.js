const { Web3 } = require("web3");
const { DEX, DexABI, TokenAabi, TokenA, TokenBabi, TokenB } = require("../contracts");
const HDWalletProvider = require("@truffle/hdwallet-provider");
require("dotenv").config();

const addLiquidity = (amounta,amountb) => {
    return new Promise(async(resolve,reject)=>{
        try{
            let provider = new  HDWalletProvider([process.env.PRIVATE_KEY],process.env.RPC_URL)
            let web3 = new Web3(provider);
            let contract = new web3.eth.Contract(DexABI,DEX);
            let tokenAContract = new web3.eth.Contract(TokenAabi,TokenA);
            let tokenBContract = new web3.eth.Contract(TokenBabi,TokenB);
            console.log(amounta);
            // let amountaPay = parseInt(amounta) * (10 ** parseInt(await tokenAContract.methods.decimals().call()));
            // let amountbPay = parseInt(amountb) * (10 ** parseInt(await tokenBContract.methods.decimals().call()));
            let amountaPay = web3.utils.toWei(amounta.toString(),'ether');
            let amountbPay = web3.utils.toWei(amountb.toString(),'ether');
            let gasPrice = await web3.eth.getGasPrice();
            // console.log(amountaPay," a")
            // let gasLimitA = await tokenAContract.methods.approve(DEX,amountaPay).estimateGas({from:process.env.ADDRESS});
            // let approveA = await tokenAContract.methods.approve(DEX,amountaPay).send({from:process.env.ADDRESS,gasLimit:gasLimitA,gasPrice});
            // console.log(amountbPay," b")
            // let gasLimitB = await tokenBContract.methods.approve(DEX,amountbPay).send({from:process.env.ADDRESS});
            // let approveB = await tokenBContract.methods.approve(DEX,amountbPay).send({from:process.env.ADDRESS,gasLimit:gasLimitB,gasPrice});
            // console.log("now liquidity providing")
            let gasLimit = await contract.methods.addLiquidity(TokenA,TokenB,amountaPay,amountbPay).estimateGas({from:process.env.ADDRESS})
            let addLiquidity = await contract.methods.addLiquidity(TokenA,TokenB,amountaPay,amountbPay).send({from:process.env.ADDRESS,gasLimit,gasPrice})

            resolve(addLiquidity);
        }catch(err){
            reject(err);
        }

    })
}

module.exports = addLiquidity;