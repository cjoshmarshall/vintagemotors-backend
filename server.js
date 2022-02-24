const express=require('express');
const cors=require('cors');
const app=express();
const port=process.env.PORT || 3006

require('dotenv').config();

const dbconnection=require('./database')

app.use(express.json())
app.use(cors())

app.use('/api/auth/',require('./routeAuth'))
app.use('/api/tariff/',require('./routeTariff'))
app.use('/api/users/',require('./routeUser'))
app.use('/api/bookings/',require('./routeBooking'))

app.get('/',(req,res)=>res.send('Hello world'))

app.listen(port,()=>console.log(`App listening on port ${port}`))