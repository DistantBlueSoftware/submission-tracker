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
  dateOpenMonth2: String,
  dateOpenDay2: Number,
  dateCloseMonth2: String,
  dateCloseDay2: Number,
  alwaysOpen: Boolean,
  fee: Number,
  pay: Number,
  payType: String
});

module.exports = mongoose.model('Publication', PublicationSchema);
