const axios  = require('axios')

const currencyData = axios.create({
    baseURL: 'https://api.coingecko.com/api/v3/coins/markets',
    headers: {
      'x-cg-demo-api-key': process.env.API_KEY,
    },
  });
  
// https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin

module.exports = currencyData;