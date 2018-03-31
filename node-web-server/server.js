const express = require('express')
const hbs = require('hbs');
const fs = require('fs');

const app = express();
const port = process.env.PORT || '3000'

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/resources'));

app.use((req, res, next) => {
  let now = new Date().toString();
  let log = `${now}: ${req.method} - ${req.path}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) console.log('Erro ao salvar o server.log')
  });
  next();
});

app.use((req, res, next) => {
  res.render('maintenance.hbs');
});

app.use(express.static(__dirname + '/public'));
hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());
hbs.registerHelper('screamIt', text => text.toUpperCase());

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageName: 'Página Inicial',
    welcomeMessage: 'Bem vindo',
  })
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageName: 'Sobre',
  });
});

app.get('/bad', (req, res) => {
  res.json({
    success: false,
    message: 'Não foi possível processar a requisição'
  });
});

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});