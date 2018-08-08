const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport')

const keys = require('./config/keys');

require('./models/User')
require('./services/passport')

const authRoutes = require('./routes/authRoutes');


mongoose.connect(keys.mongoURI)
const app = express();
//Cookie Session
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
)
app.use(passport.initialize());
app.use(passport.session());

authRoutes(app);//require('./routes/authRoutes')(app); another way of doing this immediately invoke

const PORT = process.env.PORT || 3000;
app.listen(PORT);