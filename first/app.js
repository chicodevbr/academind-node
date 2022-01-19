const express = require('express');

const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use('/add-product', (req, res) => {
  res.send(
    '<form action="/product" method="POST"><input type="text" name="title" /><button type="submit">Add Product</button></form>'
  );
});

app.post('/product', (req, res) => {
  console.log(req.body);
  res.redirect('/');
});

app.use('/', (req, res) => {
  console.log('In another middleware...');
  res.send('<h1>Hello from  Express!</h1>');
});

app.listen(3000);
