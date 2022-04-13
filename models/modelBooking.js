const mongoose=require('mongoose');

const bookingSchema=new mongoose.Schema({
    
    user:{type:mongoose.Schema.Types.ObjectId,ref:"users"},
    bike:{type:mongoose.Schema.Types.ObjectId,ref:"tariff"},
    totalHours:{type:Number},
    gst:{type:Number},
    sgst:{type:Number},
    totalAmount:{type:Number},
    bookedTimeSlot:{from:{type:String},to:{type:String}},
    transactionId:{type:String},

},{timestamps:true})

const modelBooking=mongoose.model('booking',bookingSchema)

module.exports=modelBooking;