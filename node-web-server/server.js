const express = require('express')
const hbs = require('hbs');

const app = express();
const port = process.env.PORT || '3000'

let currentYear = new Date().getFullYear();

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageName: 'Página Inicial',
    welcomeMessage: 'Bem vindo',
    currentYear
  })
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageName: 'Sobre',
    currentYear
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