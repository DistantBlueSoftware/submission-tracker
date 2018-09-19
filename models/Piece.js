const mongoose = require('mongoose');

const PieceSchema = new mongoose.Schema({
  author: {type: String},
  title: {type: String},
  wordCount: {type: Number}
});

module.exports = mongoose.model('Piece', PieceSchema);
