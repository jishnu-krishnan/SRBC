const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const path = require('path')
const connectDB = require('./config/db')

// Load config
dotenv.config({ path: './config/config.env' })

connectDB();

//creating express object
const app = express();

const route = require('./routes/route')

app.use(cors())

app.use(express.json())

app.use('/api',route)
const port = process.env.PORT || 8080;

app.listen(port,()=>{
    console.log(`server is running on port:${port}`);
});