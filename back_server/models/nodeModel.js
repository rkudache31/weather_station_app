const mongoose = require('mongoose');

const nodeSchema = new mongoose.Schema(
  {
    uid: {
      type: String,
      required: [true, 'Please tell us UID!']
    },
    user: {
      type: mongoose.Schema.Types.String,
      ref: 'User'
    },
    emailId: {
      type: mongoose.Schema.Types.String,
      ref: 'User'
    },
    location: {
      type: String,
      required: [true, 'Please provides location']
    },
    sublocation: {
      type: String,
      required: [true, 'Please provide Sub - Locations']
    },
    templow: Number,
    temphigh: Number,
    humilow: Number,
    humihigh: Number,
    windlow: Number,
    windhigh: Number,
    baromelow: Number,
    baromehigh: Number,
    globallow: Number,
    globalhigh: Number,
    rainlow: Number,
    rainhigh: Number,
    isDeleted: {
      type: Boolean,
      default: false
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    data: [
      {
        temperature: {
          type: Number,
          default: 0.0
          // min: [1, 'Rating must be above 1.0'],
          // max: [100, 'Rating must be below 100']
        },
        humidity: {
          type: Number,
          default: 0.0
          // min: [1, 'Rating must be above 1.0'],
          // max: [100, 'Rating must be below 100']
        },
        windSpeed: {
          type: Number,
          default: 0.0
          // min: [1, 'Rating must be above 1.0'],
          // max: [100, 'Rating must be below 100']
        },
        barometric: {
          type: Number,
          default: 0.0
          // min: [1, 'Rating must be above 1.0'],
          // max: [100, 'Rating must be below 100']
        },
        globalRadiation: {
          type: Number,
          default: 0.0
          // min: [1, 'Rating must be above 1.0'],
          // max: [100, 'Rating must be below 100']
        },
        rain: {
          type: Number,
          default: 0.0
          // min: [1, 'Rating must be above 1.0'],
          // max: [100, 'Rating must be below 100']
        },
        Date: {
          type: Date,
          default: Date.now
        }
      }
    ]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Node', nodeSchema);
