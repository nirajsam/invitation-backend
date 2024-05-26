const express=require('express')

const config= require('./config')
const dotenv = require('dotenv')
const bodyParser= require('body-parser')
const mongoose = require('mongoose')
const guestRoute = require('./routes/guestRoute');
const reminderRoute = require('./routes/reminderRoute');
const port=process.env.PORT || 5001;

dotenv.config();

const mongodbUrl = config.MONGODB_URL
mongoose.connect(mongodbUrl, {
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
}).catch(error=>console.log("mongo error",error))

const cors=require('cors')
const app=express();

app.use(bodyParser.json())
app.use(cors())

app.use("/api", guestRoute);
app.use("/api", reminderRoute);

app.listen(port,'0.0.0.0', ()=>{
    console.log("server started")
})