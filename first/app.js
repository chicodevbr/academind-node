const express = require('express');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(shopRoutes);
app.use(adminRoutes);

app.use('/', (req, res, next) => {
  res.status(404).send('<h1>Page Not Found</h1>');
});

app.listen(3000);
