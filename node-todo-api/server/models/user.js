const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
});

UserSchema.methods.toJSON = function() {
  let user = this;
  let userObject = user.toObject();
  return _.pick(user, ['_id', 'email']);
};

/* Está usando function() para ter acesso ao 'this', 
  que é o valor do usuario que está chamando a função */
UserSchema.methods.generateAuthToken = function() {
  let user = this;
  let access = 'auth';
  let token = jwt.sign({ _id: user._id.toHexString(), access }, 'secret').toString();

  //user.tokens = user.tokens.concat([{ access, token }]);
  user.tokens.push({ access, token });

  return user.save().then(() => {
    return token;
  });
};

UserSchema.statics.findByToken = function(token) {
  let User = this;
  let decoded;
  try {
    decoded = jwt.verify(token, 'secret');
  } catch (err) {
    return Promise.reject();
  }

  return User.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
};

//Mongoose Middleware
UserSchema.pre('save', function(next) {
  let user = this;

  if (user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hashedPassword) => {
        user.password = hashedPassword;
        next();
      });
    });
  } else {
    next();
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = {
  User
};