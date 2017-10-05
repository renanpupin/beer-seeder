//libs
import http from 'http';
import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';

//configs
import config from './config.json';

//uses
import initializeDb from './db';
import middleware from './middleware';
import api from './api';

let app = express();
app.server = http.createServer(app);

// logger
app.use(morgan('dev'));


app.use(bodyParser.json({
	limit : config.bodyLimit
}));

// connect to db
initializeDb( db => {

	// internal middleware
	app.use(middleware({ config, db }));

	// api router
	app.use('/api', api({ config, db }));

	app.server.listen(process.env.PORT || config.port, () => {
		console.log(`Started on port ${app.server.address().port}`);
	});
});

export default app;