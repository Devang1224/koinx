const axios  = require("axios");
const cron = require('node-cron');
const connectDB = require('./db');
const currencyData  = require("./lib/axiosInstance");
const getCurrencyData = require("./services/getCurrencyData");
const Crypto = require('./models/cryptoCurrency');

require('dotenv').config();

connectDB();


async function fetchData(){
   try{

    console.log("/////////////////////// data//////////////////////////////")
    const bitcoinData = await getCurrencyData('bitcoin','usd')
    const maticData = await getCurrencyData('matic','usd')
    const ethereumData = await getCurrencyData('ethereum','usd')
    

    const bitcoin = {
        marketCapUSD: bitcoinData[0]?.market_cap,
        change24hr: bitcoinData[0]?.price_change_24h,
        priceInUSD: bitcoinData[0]?.current_price,
        name:bitcoinData[0]?.name,
        symbol:bitcoinData[0]?.symbol
    }
    
    const matic = {
        marketCapUSD: maticData[0]?.market_cap,
        change24hr: maticData[0]?.price_change_24h,
        priceInUSD: maticData[0]?.current_price,
        name:maticData[0]?.name,
        symbol:maticData[0]?.symbol
    }

    const ethereum = {
        marketCapUSD: ethereumData[0]?.market_cap,
        change24hr: ethereumData[0]?.price_change_24h,
        priceInUSD: ethereumData[0]?.current_price,
        name:ethereumData[0]?.name,
        symbol:ethereumData[0]?.symbol
    }
   


    if(bitcoinData.length){
          await Crypto.create(bitcoin)
    }
    if(matic.length){
        await Crypto.create(matic)
    }
    if(ethereum.length){
        await Crypto.create(ethereum)
    }

}catch(err){
    console.log("ann errror occeure",err);

   }
}


fetchData();