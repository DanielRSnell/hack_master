const express = require('express');

// Function that calls expres - Express is running!
const app = express();

// Desniate app is runing
app.get('/', (req, res) => {
	res.send({ sup: 'niggah - we live' });
});

// Setting up heroku - Dynamic Binding
const PORT = process.env.PORT || 5000;
app.listen(PORT);
