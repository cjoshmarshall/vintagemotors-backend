// const express=require('express');
// const router=express.Router();
// const booking=require('./modelBooking')
// const tariff=require('./modelTariff')

// router.post('/bookbike',async(req,res)=>{
//     req.body.transactionId='1234'
//     console.log(req.body)
//     try{
//         const newBooking=new booking(req.body)
//         await newBooking.save()
//         const bike=await tariff.findOne({_id:req.body.bike.toString()})
//         bike.bookedTimeSlot.push(req.body.bookedTimeSlot)
//         await bike.save()
//         res.send("Your booking is successful")
//     }
//     catch(error){
//         return res.status(400).json(error)
//     }
// })

// module.exports=router


const express=require('express');
const router=express.Router();
const stripe=require('stripe')('sk_test_51KOGnISEywSRKpM0SoJ6BhLxJPxiHJyj8Ar3ky5ivVBvavEOgi9CFq7HDPTQBx3DlTqlrN4u7FCgsZnZBCZ498sR00TOwzanku')
const booking=require('./modelBooking')
const tariff=require('./modelTariff')
const { v4: uuidv4 } = require('uuid');

router.post('/bookbike',async(req,res)=>{
    const {token}=req.body
    console.log(req.body)
    try{
        const customer=await stripe.customer.create({
            email:token.email,
            source:token.id
        })

        const payment=await stripe.charges.create({
            amount:req.body.totalAomunt*100,
            currency:'INR',
            customer:customer.id,
            receipt_email:token.email
        },{
            idempotencyKey:uuidv4()
        })

        if(payment)
        {
            req.body.transactionId=payment.source.id
            const newBooking=new booking(req.body)
            await newBooking.save()
            const bike=await tariff.findOne({_id:req.body.bike.toString()})
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

module.exports=router