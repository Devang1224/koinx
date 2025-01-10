const axios  = require("axios");
const connectDB = require('./db');
const express = require('express')
const currencyData  = require("./lib/axiosInstance");
const getCurrencyData = require("./services/getCurrencyData");
const fetchCurrencyData = require("./services/fetchCurrenyDataCronJob");
const coinRoutes = require('./routes/coin')

 const app = express();
 app.use(express.json());

require('dotenv').config();

connectDB();
fetchCurrencyData();


app.use('/',coinRoutes)

  app.listen(process.env.PORT,()=>{
    console.log(`server running on PORT: ${process.env.PORT}`)
  })