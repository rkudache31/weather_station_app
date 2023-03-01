const mongoose = require('mongoose');

const nodeVerification = new mongoose.Schema({
  nodeID: String,
  temperature: Number,
  humidity: Number,
  windSpeed: Number,
  barometric: Number,
  globalRadiation: Number,
  rain: Number,
  creatdAt: Date,
  expiresAt: Date
});
module.exports = mongoose.model('nodeVerification', nodeVerification);
