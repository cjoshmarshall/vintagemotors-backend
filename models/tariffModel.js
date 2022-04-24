const mongoose=require('mongoose');

const tariffSchema=new mongoose.Schema({
    name:{type:String},
    image:{type:String},
    model:{type:String},
    kmLimit:{type:String},
    excessKmCharges:{type:String},
    bookingTime:{type:String},
    bookedTimeSlot:[{
        from:{type:String},
        to:{type:String}
    }]
},{
    collection:'tariff'
})

const tariffModel=mongoose.model('tariff',tariffSchema)

module.exports=tariffModel;