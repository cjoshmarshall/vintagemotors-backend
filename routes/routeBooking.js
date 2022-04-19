const express=require('express');
const router=express.Router();
const stripe=require('stripe')(process.env.STRIPE_SECRET_KEY)
const booking=require('../models/modelBooking')
const tariff=require('../models/modelTariff')
const { v4: uuidv4 } = require('uuid');

router.post('/bookbike',async(req,res)=>{
    const {token}=req.body
    try{
        const customer=await stripe.customers.create({
            email:token.email,
            source:token.id
        })

        const payment=await stripe.paymentIntents.create({
            amount:req.body.totalAmount*100,
            currency:'inr',
            customer:customer.id,
            receipt_email:token.email
        },{
            idempotencyKey:uuidv4()
        })

        if(payment)
        {
            req.body.transactionId=payment.id
            const newBooking=new booking(req.body)
            await newBooking.save()
            const bike=await tariff.findOne({_id:req.body.bike})
            bike.bookedTimeSlot.push(req.body.bookedTimeSlot)
            await bike.save()
            res.send("Your booking is successful")
        }else{
            return res.status(400).json(error)  
        }        
    }
    catch(error){
        return res.status(400).json(error)  
    }
})

router.get("/getallbookings",async(req,res)=>{
    try{
        const bookings=await booking.find().populate("bike")
        res.send(bookings)
    }catch(error){
        res.status(400).json(error)
    }
})

module.exports=router