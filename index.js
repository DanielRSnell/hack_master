const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/users');
require('./services/passport');

mongoose.connect(keys.mongoURI);

// Function that calls expres - Express is running!
const app = express();

// Establish cookies within the application
app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000,
		keys: [keys.cookieKey]
	})
);

// Let Passport know about the cookies
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes.js')(app);

// Setting up heroku - Dynamic Binding
const PORT = process.env.PORT || 5000;
app.listen(PORT);
