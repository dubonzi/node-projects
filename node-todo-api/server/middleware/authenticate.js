const { User } = require('../models/user');

const authenticate = (req, res, next) => {
  let token = req.header('x-auth');

  User.findByToken(token).then((user) => {
    if (!user) {
      return Promise.reject();
    }
    //Adiciona o usuario e o token à requisição o que torna
    //a informação disponível para todos que usarem o middleware 'authenticate'
    req.user = user;
    req.token = token;
    next();
  }).catch((err) => {
    res.status(401).send();
  });
};

module.exports = { authenticate };