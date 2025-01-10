const currencyData = require("../lib/axiosInstance");



async function getCurrencyData(coin,currency){
  try{
    const res = await currencyData.get(`?vs_currency=${currency}&ids=${coin}`);
    return res?.data;
  }catch(err){
    console.log("error while fetching currency data",err)
  }

}

module.exports = getCurrencyData