const mongoose = require('mongoose');

const initializeDb = (uri) => {
	return mongoose.connect(uri, { useMongoClient: true });
};

const dropDb = (uri) => {
	return mongoose.createConnection(uri, function(err) {
        if(!err){
        	mongoose.connection.db.dropDatabase();
        }
    }); 
};

module.exports = {
	initializeDb: initializeDb,
	dropDb: dropDb,
};