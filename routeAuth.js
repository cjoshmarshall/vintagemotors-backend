const express=require('express');
const router=express.Router();
const User=require('./modelUser')

const bcrypt=require('bcrypt')

router.post('/login',async(req,res)=>{
    const{phone,password}=req.body

    try{
        const user=await User.findOne({phone,password})
        if(user){
            res.send(user)
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
    const{name,phone,password,password2}=req.body

    try{
        const user=await new User.findOne({phone})
        if(user) return res.sendStatus(400)

        const salt=await bcrypt.genSalt();
        console.log(salt)
        password=await bcrypt.hash({password},salt)

        await newuser.save()
        res.send('User Registered Successfully')
    }
    catch(error){
        return res.status(400).json(error);
    }
})

module.exports=router;