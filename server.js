const express=require('express');
const cors=require('cors');
const app=express();
const port=process.env.PORT || 3006
const mongoose=require("mongoose");
const dotenv=require('dotenv')

dotenv.config();


mongoose
    .connect(process.env.MONGO_URL,{
        useUnifiedTopology:true,
        useNewUrlParser:true
    })
    .then(()=>console.log("DBConnected"))
    .catch((err)=>{
        console.log(err)
    })

app.use(express.json())
app.use(cors())

app.use('/api/auth/',require('./routes/routeAuth'))
app.use('/api/tariff/',require('./routes/routeTariff'))
app.use('/api/users/',require('./routes/routeUser'))
app.use('/api/comments/',require('./routes/routeComment'))
app.use('/api/orders/',require('./routes/routeBooking'))


app.get('/',(req,res)=>
    res.send('Connected')
)

app.listen(port,()=>{
    console.log(`App listening on port ${port}`)
})