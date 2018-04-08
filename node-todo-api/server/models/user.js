const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

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
  return _.pick(user, ['id', 'email']);
};

UserSchema.methods.generateAuthToken = function() { // Está usando function() para ter acesso ao 'this', 
  let user = this;                                 //que é o valor do usuario que está chamando a função
  let access = 'auth';
  let token = jwt.sign({ _id: user._id.toHexString(), access }, 'secret').toString();

  //user.tokens = user.tokens.concat([{ access, token }]);
  user.tokens.push({ access, token });

  return user.save().then(() => {
    return token;
  });
};

const User = mongoose.model('User', UserSchema);

module.exports = {
  User
};