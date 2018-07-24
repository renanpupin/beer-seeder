//libs
const http = require("http");
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const path = require('path');

//configs
const config = require('./app/config/env');

const dbUtils = require('./app/utils/db');
const socketUtils = require('./app/utils/socket');
const apiRoutes = require('./app/routes/index');

let app = express();
app.server = http.createServer(app);
const router = express.Router();

// logger
app.use(morgan(':method :status - :response-time ms - :url - HTTP/:http-version (:res[content-length] bytes)'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, PUT, DELETE');
    res.setHeader("Access-Control-Allow-Headers", 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
    next();
});
// app.use(express.static(path.join(__dirname, 'public')));
app.use('/style', express.static(path.join(__dirname, '/public')));
app.use('/script', express.static(path.join(__dirname, '/public')));

try{
    // configure socket and redis
    socketUtils.configure(app.server, config.redis);

	// connect to db
	dbUtils.initializeDb(config.db);

	// --------------- ROUTES ---------------
	app.get('/', (req, res) => {
		res.json({success: true, message: "Beer Seeder!"});
	});

    app.get('/home', function(req, res,next) {
        res.sendFile(path.join(__dirname, 'public/index.html'));
    });

	app.use('/api', apiRoutes);

	// --------------------------------------

	app.server.listen((process.env.PORT || config.port || 3000), () => {
		console.log(`Started on port ${process.env.PORT || config.port || 3000}`);
	});
}catch(e){
	console.log("Error while creating the server",e);
}

module.exports = app;