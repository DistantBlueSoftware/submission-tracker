const mongoose = require('mongoose');

const SubmissionSchema = new mongoose.Schema({
  userId: {type: String},
  user: {type: String, default: 'anonymous'},
  title: {type: String},
  wordCount: {type: Number, optional: true},
  publication: {type: String},
  dateSubmitted: {type: Date, default: Date.now},
  dateHeard: {type: Date, optional: true},
  status: {type: String, default: 'Sent'},
  notes: {type: String, optional: true}
});

module.exports = mongoose.model('Submission', SubmissionSchema);
