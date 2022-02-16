const path = require('path');
const express = require('express');
const app = express();

const errorController = require('./controllers/error');
const mongoConnect = require('./util/database').mongoConnect;

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  // User.findByPk(1)
  //   .then((user) => {
  //     req.user = user;
  //     next();
  //   })
  //   .catch((err) => console.log(err));
  next();
});

app.use(shopRoutes);
app.use('/admin', adminRoutes);

app.use(errorController.get404);

const PORT = 3000;

mongoConnect(() => {
  app.listen(PORT, () => {
    console.log(`Server Running at port ${PORT}`);
  });
});
