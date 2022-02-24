const express=require('express');
const router=express.Router();
const User=require('./modelUser')

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
        const newuser=await new User(req.body)
        await newuser.save()
        console.log(newuser)
        res.send('User Registered Successfully')
    }
    catch(error){
        return res.status(400).json(error);
    }
})

module.exports=router;