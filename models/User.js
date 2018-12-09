const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const userSchema = new Schema({
  username: {type: String, unique: true},
  name: String,
  email: {type: String, unique: true, lowercase: true, required: [true, 'can\'t be blank'], match: [/\S+@\S+\.\S+/, 'is invalid'], index: true},
  password: String,
  favorites: [String], 
  role: {type: Number, default: 0},
}, {timestamps: true});

userSchema.pre('save', function(next) {
  const user = this;
  ModelClass.findById(this._id)
      .exec()
      .then(userExists => {
        //TODO: only salts pw if user is new, will have to update logic for pw reset
        if (!userExists) {
          bcrypt.genSalt(10, function(err, salt) {
            if (err) return next(err);
            bcrypt.hash(user.password, salt, null, function(err, hash) {
              if (err) return next(err);
              user.password = hash;
              next();
            });
          });
        } else next();
      })
      .catch(err => next(err))
});

userSchema.methods.comparePassword = function(candidate, callback) {
  bcrypt.compare(candidate, this.password, function(err, isMatch) {
    if (err) return callback(err);
    callback(null, isMatch);
  });
}

const ModelClass = mongoose.model('user', userSchema);

module.exports = ModelClass;
