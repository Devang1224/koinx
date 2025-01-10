const mongoose = require('mongoose');

const cryptoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  symbol: { type: String, required: true },
  priceInUSD: { type: Number, required: true },
  marketCapUSD: { type: Number, required: true },
  change24hr: { type: Number, required: true },
  fetchedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Crypto', cryptoSchema);
