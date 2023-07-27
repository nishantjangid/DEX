const addLiquidity = require("../controllers/addLiquidity");
const mintTokens = require("../controllers/mintTokens");
const removeLiquidity = require("../controllers/removeLiquidity");
const tokenABalance = require("../controllers/tokenAbalance");
const tokenBBalance = require("../controllers/tokenBBalance");

const router = require("express").Router();

router.post("/addLiquidity",async(req,res,next)=>{
    const {amounta,amountb} = req.body;
    if(!amounta || Number(amounta) <= 0) return res.status(400).json({error:"Please provide a valid amount token a"})
    if(!amountb || Number(amountb) <= 0) return res.status(400).json({error:"Please provide a valid amount token b"})
    try{
        let tokenABalances = await tokenABalance(process.env.ADDRESS);
        let tokenBBalances = await tokenBBalance(process.env.ADDRESS);
        if(Number(tokenABalances) <= Number(amounta)){
            return res.status(400).json({error:"Insufficient Amount for token a"});
        }
        if(Number(tokenBBalances) <= Number(amountb)){
            return res.status(400).json({error:"Insufficient Amount for token b"});
        }
        let result = await addLiquidity(amounta,amountb);
        if(result.status){
            return res.status(200).json({result:result})
        }else{
            return res.status(200).json({error:"Transaction failed"})
        }
    }catch(err){
        next(err);
    }
})

router.post("/mintTokens",async(req,res,next)=>{
    const {tokens} = req.body;
    if(!tokens || Number(tokens) <= 0) return res.status(400).json({error:"Please provide a valid token amount"})    
    try{
        let result = await mintTokens(process.env.ADDRESS,tokens);
        if(result.status){
            return res.status(200).json({result:result})
        }else{
            return res.status(200).json({error:"Transaction failed"})
        }
    }catch(err){
        next(err);
    }
})

router.post("/removeLiquidity",async(req,res,next)=>{        
    try{
        let result = await removeLiquidity();
        if(result.status){
            return res.status(200).json({result:result})
        }else{
            return res.status(200).json({error:"Transaction failed"})
        }
    }catch(err){
        console.log(err);
        next(err);
    }
})

module.exports = router;
