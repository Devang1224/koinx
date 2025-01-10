const getCurrencyData = require("./getCurrencyData")
const Crypto = require('../models/cryptoCurrency');
const cron = require('node-cron');

async function fetchCurrencyData(){
    try{
 
     const bitcoinData = await getCurrencyData('bitcoin','usd')
     const maticData = await getCurrencyData('matic-network','usd')
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
     if(maticData.length){
         await Crypto.create(matic)
     }
     if(ethereumData.length){
         await Crypto.create(ethereum)
     }
 
 }catch(err){
     console.log("ann errror occeure",err);
    }
 }
 


cron.schedule('0 */2 * * *', () => {
    console.log('Running a task every 2 hours');
    fetchCurrencyData();
  });


module.exports = fetchCurrencyData