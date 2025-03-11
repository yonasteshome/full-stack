const express=require('express')
const dotenv=require('dotenv').config()
const mongoose=require('mongoose')
const bodyParser=require('body-parser')
const app=express()
const port=process.env.PORT
const MongoDB_URL=process.env.MONGO_URL
const cors = require("cors");


app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
mongoose.connect(MongoDB_URL)
.then((result)=>{
    console.log(`the connection with database is succesful`)
    app.listen(port,()=>{
        console.log(`the server is run on port ${port}`)
    })
})
.catch((err)=>console.log(err));
app.use('/list',require('./routes/toDOListRoute'))
app.use('/',require('./routes/registerRoute'))





