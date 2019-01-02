const mongoose = require('mongoose');

const PublicationSchema = new mongoose.Schema({
  name: {type: String, required: true},
  slug: {type: String, required: true},
  description: {type: String},
  website: {type: String},
  genre: {type: [String]},
  wordCount: Number,
  fee: {type: Number},
  dateCreated: {type: Date, default: Date.now},
  lastUpdatedBy: {type: String, default: 'anonymous'},
  lastUpdatedDate: {type: Date, default: Date.now},
  dateOpenMonth1: String,
  dateOpenDay1: Number,
  dateCloseMonth1: String,
  dateCloseDay1: Number,
  openDates: [{
    openMonth: String,
    openDay: Number,
    closeMonth: String,
    closeDay: Number
  }],
  alwaysOpen: Boolean,
  fee: Number,
  pay: Number,
  payType: String
});

module.exports = mongoose.model('Publication', PublicationSchema);
