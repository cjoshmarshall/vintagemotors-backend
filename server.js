const express=require('express');
const cors=require('cors');
const app=express();
const port=process.env.PORT || 3006

require('dotenv').config();

const dbconnection=require('./database')

app.use(express.json())
app.use(cors())

app.use('/api/auth/',require('./routes/routeAuth'))
app.use('/api/tariff/',require('./routes/routeTariff'))
app.use('/api/users/',require('./routes/routeUser'))
app.use('/api/comments/',require('./routes/routeComment'))
app.use('/api/orders/',require('./routes/routeBooking'))


app.get('/',(req,res)=>res.send('Connected'))

app.listen(port,()=>console.log(`App listening on port ${port}`))