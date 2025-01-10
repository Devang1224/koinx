const currencyData = require("../lib/axiosInstance");



async function fetchData() {
    try {
      console.log("/////////////////////// Fetching data //////////////////////////////");
  
      const bitcoinData = await getCurrencyData('bitcoin', 'usd');
      const maticData = await getCurrencyData('matic', 'usd');
      const ethereumData = await getCurrencyData('ethereum', 'usd');
  
      const cryptoData = [];
  
      if (bitcoinData && bitcoinData.length > 0) {
        cryptoData.push({
          name: bitcoinData[0]?.name,
          symbol: bitcoinData[0]?.symbol,
          priceInUSD: bitcoinData[0]?.current_price,
          marketCapUSD: bitcoinData[0]?.market_cap,
          change24hr: bitcoinData[0]?.price_change_24h,
          fetchedAt: new Date(),
        });
      }
  
      if (maticData && maticData.length > 0) {
        cryptoData.push({
          name: maticData[0]?.name,
          symbol: maticData[0]?.symbol,
          priceInUSD: maticData[0]?.current_price,
          marketCapUSD: maticData[0]?.market_cap,
          change24hr: maticData[0]?.price_change_24h,
          fetchedAt: new Date(),
        });
      }
  
      if (ethereumData && ethereumData.length > 0) {
        cryptoData.push({
          name: ethereumData[0]?.name,
          symbol: ethereumData[0]?.symbol,
          priceInUSD: ethereumData[0]?.current_price,
          marketCapUSD: ethereumData[0]?.market_cap,
          change24hr: ethereumData[0]?.price_change_24h,
          fetchedAt: new Date(),
        });
      }

      if (cryptoData.length > 0) {
        await Crypto.insertMany(cryptoData);
        console.log('Crypto data saved in MongoDB');
      } else {
        console.log('No valid data to save');
      }
    } catch (err) {
      console.error('An error occurred while fetching or saving data:', err);
    }
  }

module.exports = getCurrencyData