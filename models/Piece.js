const mongoose = require('mongoose');

const PieceSchema = new mongoose.Schema({
  user: {type: String},
  title: {type: String},
  wordCount: {type: Number},
  dateCreated: {type: Date, default: new Date()}
});

module.exports = mongoose.model('Piece', PieceSchema);
