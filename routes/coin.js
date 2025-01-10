const express = require('express');
const Crypto = require('../models/cryptoCurrency'); 
const Route = express.Router();

Route.get('/stats/:coin', async (req, res) => {  
    try {
        const { coin } = req.params;  
        const coinData = await Crypto.findOne({ name: coin });
        if (!coinData) {
            return res.status(404).json({ error: `Coin ${coin} not found` });
        }
        res.json({
            message:'Coin data fetched successfully',
            data:coinData
        });
    } catch (err) {
        console.log("Error while fetching coin data:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

function calculateStandardDeviation(prices) {
    const N = prices.length;
    const mean = prices.reduce((acc, price) => acc + price, 0) / N;  
    const squaredDifferences = prices.map(price => Math.pow(price - mean, 2));
    const variance = squaredDifferences.reduce((acc, diff) => acc + diff, 0) / N;
    return Math.sqrt(variance);

}
Route.get('/deviation/:coin', async (req, res) => {
    try {
        const { coin } = req.params; 

        const coinData = await Crypto.find({ name: coin })
            .sort({ fetchedAt: -1 })
            .limit(100);

        if (coinData.length === 0) {
            return res.status(404).json({ error: `No data found for ${coin}` });
        }

        const prices = coinData.map(record => record.priceInUSD);
        const stdDev = calculateStandardDeviation(prices);
        res.json({ coin, deviation:stdDev });
    } catch (err) {
        console.log("Error while calculating deviation:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = Route;  