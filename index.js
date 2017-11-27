const express = require('express');
const expressGraphQL = require('express-graphql');
const schema = require('./Schema/schema.js');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
require('./models/users');
require('./services/passport');
const binance = require('node-binance-api');
require('./wrappers/binance');

// Database connect and auth
mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI);

// Function that calls expres - Express is running!
const app = express();

// Establish the GraphQL Server
app.use(
	'/graphql',
	expressGraphQL({
		schema: schema,
		graphiql: true
	})
);
// Binance Test
binance.options({
	APIKEY: keys.binanceS_public,
	APISECRET: keys.binanceKey_public
});
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

require('./routes/authRoutes')(app);

if (process.env.NODE_ENV === 'production') {
	//This will serve production React Enviroment

	app.use(express.static('client/build'));

	const path = require('path');
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

// Setting up heroku - Dynamic Binding
const PORT = process.env.PORT || 5000;
app.listen(PORT);
