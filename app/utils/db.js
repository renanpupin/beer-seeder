const mongoose = require('mongoose');

const initializeDb = (uri) => {
	return mongoose.connect(uri, { useMongoClient: true });
};

module.exports = {
	initializeDb: initializeDb
};