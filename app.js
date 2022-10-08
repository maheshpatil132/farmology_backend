const express = require('express');
const dotenv = require('dotenv');
const connect = require('./config/database');
const error = require('./middleware/error');
const app = express()

dotenv.config({path:'./config/app.env'})

const PORT = process.env.PORT


app.use(error)
connect(app,PORT)