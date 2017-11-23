// Access Control for DEV - vs - PROD

if (process.env.NODE_ENV === 'production') {
	module.exports = require('./prod.js');
} else {
	module.exports = require('./dev.js');
}
