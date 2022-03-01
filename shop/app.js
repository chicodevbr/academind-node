const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const URL = require('./util/user');
const app = express();

const errorController = require('./controllers/error');
//const User = require('./models/user');

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

// app.use((req, res, next) => {
//   User.findById('62104b859e0192cfd20e4715')
//     .then((user) => {
//       req.user = new User(user.name, user.email, user.cart, user._id);
//       next();
//     })
//     .catch((err) => console.log(err));
// });

app.use(shopRoutes);
app.use('/admin', adminRoutes);

app.use(errorController.get404);

const PORT = 3000;

mongoose
  .connect(URL)
  .then(
    app.listen(PORT, () => {
      console.log(`Server running at ${PORT}...`);
    })
  )
  .catch((err) => console.log(err));
