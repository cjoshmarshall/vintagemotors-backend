const express=require('express');
const router=express.Router();
const Comment=require('./modelComment')


router.post('/comments',async(req,res)=>{
    const{name,email,phone,comment}=req.body

    try{
        const comments=await new Comment(req.body)
        await comments.save()
        res.send('Submitted Successfully')
    }
    catch(error){
        return res.status(400).json(error);
    }
})

module.exports=router 