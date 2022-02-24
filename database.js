const mongoose=require("mongoose");

function connectDB(){
    mongoose.connect(process.env.MONGODB_URL,{useUnifiedTopology:true,useNewUrlParser:true});

    const connection=mongoose.connection

    connection.on('connected',()=>{
        console.log('MongoDB connected')
    })
    connection.on('error',()=>{
        console.log('MongoDB error')
    })
}

connectDB()

module.exports = mongoose