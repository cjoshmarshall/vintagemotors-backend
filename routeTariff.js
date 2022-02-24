const express=require('express');
const router=express.Router();
const tariff=require('./modelTariff')

router.get('/',async(req,res)=>{
    try{
        const bikes=await tariff.find({})
        if(bikes){
            res.json(bikes)
        }
        else{
            return res.status(400).json(error);
        }
    }
    catch(error){
        console.log(error)
        return res.status(400).json(error);
    }
})
module.exports=router;