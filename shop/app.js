const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const URL = require('./util/user');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const app = express();

const errorController = require('./controllers/error');
const User = require('./models/user');

const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions',
});

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.static(path.join(__dirname, 'public')));

app.use(
  session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

app.use((req, res, next) => {
  User.findById(req.session.user._id)
    .then((user) => {
      req.user = user;

      next();
    })
    .catch((err) => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

const PORT = 3000;

mongoose
  .connect(URL)
  .then((result) => {
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          name: 'Artie',
          email: 'artie@email.com',
          cart: {
            items: [],
          },
        });
        user.save();
      }
    });
    app.listen(PORT, () => {
      console.log(`Server running at ${PORT}...`);
    });
  })
  .catch((err) => console.log(err));
