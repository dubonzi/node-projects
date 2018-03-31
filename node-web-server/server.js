const express = require('express')

const app = express();

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.send({nome: 'Eduardo', linguagens: ['JS', 'C#', 'JAVA']});
});

app.get('/about', (req, res) => {
  res.send('About page');
});

app.get('/bad', (req, res) => { 
  res.json({
    success: false,
    message: 'Unable to process request'
  });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});