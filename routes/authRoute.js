const express=require('express');
const router=express.Router();
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const User=require('../models/userModel')
const { verifyToken,verifyTokenAndAuth,verifyTokenAndAdmin }=require('./verifyToken');


router.post('/login',async(req,res)=>{
    const{phone,password}=req.body

    try{
        const user=await User.findOne({phone})
        const match=await bcrypt.compare(req.body.password,user.password)
        const accessToken=jwt.sign(
            {
                id:user._id,
                isAdmin:user.isAdmin
            },
            process.env.JWT,
            {expiresIn:"3d"}
        )
        const { password,...others }=user._doc
        if(user && match){
            res.status(200).json({...others,accessToken})
        }
        else{
            return res.status(400).json(error);
        }
    }
    catch(error){
        return res.status(400).json(error);
    }
})

router.post('/signup',async(req,res)=>{
    const{name,phone,password}=req.body

    const salt=await bcrypt.genSalt();
    req.body.password=await bcrypt.hash(password,salt)

    try{
        const newuser=await new User(req.body)
        await newuser.save()
        res.status(200).json(newuser)
    }
    catch(error){
        return res.status(400).json(error);
    }
})

module.exports=router;