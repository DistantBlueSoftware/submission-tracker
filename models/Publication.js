const mongoose = require('mongoose');

const PublicationSchema = new mongoose.Schema({
  name: {type: String},
  slug: {type: String},
  description: {type: String, optional: true},
  website: {type: String, optional: true},
  genre: {type: [String], optional: true},
  wordCount: {type: Number, optional: true},
  fee: {type: Number, optional: true},
  dateCreated: {type: Date, default: Date.now},
  lastUpdatedBy: {type: String, default: 'anonymous'},
  lastUpdatedDate: {type: Date, default: Date.now},
  dateOpenMonth1: {type: String, optional: true},
  dateOpenDay1: {type: Number, optional: true},
  dateCloseMonth1: {type: String, optional: true},
  dateCloseDay1: {type: Number, optional: true},
  dateOpenMonth2: {type: String, optional: true},
  dateOpenDay2: {type: Number, optional: true},
  dateCloseMonth2: {type: String, optional: true},
  dateCloseDay2: {type: Number, optional: true},
  fee: {type: Number, optional: true},
  pay: {type: Number, optional: true},
  payType: {type: String, optional: true}
});

module.exports = mongoose.model('Publication', PublicationSchema);
