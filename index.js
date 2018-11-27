'use strict';

const bodyParser = require('body-parser');
const compression = require('compression');
const cors = require('cors');
// const path = require('path');
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const mongoose = require('mongoose');
const errorhandler = require('errorhandler');
const config = require('./config');

const corsConfig = {
	// origin: process.env.NODE_ENV === 'production' ? ['https://kontakplus.herokuapp.com', 'https://kontakplus.now.sh'] : '*',
	origin: '*'
};

// Mongodb Connection
mongoose.Promise = global.Promise;
mongoose
	.connect(config.db.uri, { useNewUrlParser: true })
	.then(() => console.info('Connected to database')) // eslint-disable-line no-console
	.catch((err) => console.error(err)); // eslint-disable-line no-console

// Application setup.
const app = express();
app.use(helmet());
app.use(cors(corsConfig));
app.use(morgan(process.env.NODE_ENV === 'development' ? 'dev' : 'tiny'));
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('PORT', process.env.PORT || 3000);

if (process.env.NODE_ENV === 'development') app.use(errorhandler());
// const clientPath = path.join(__dirname, '/../client');
// app.use(express.static(clientPath));
app.get('/', (req, res) => res.send('It works'));
app.use('/api/bookmarks', require('./routes/bookmark.route'));
app.use('/api/categories', require('./routes/bookmark-category.route'));

app.listen(app.get('PORT'), () => {
	console.log(`Our app listening on port ${app.get('PORT')}!`); // eslint-disable-line no-console
});

module.exports = app;
