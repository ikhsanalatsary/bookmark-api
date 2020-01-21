'use strict';

const bodyParser = require('body-parser');
const compression = require('compression');
const cors = require('cors');
// const path = require('path');
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const errorhandler = require('errorhandler');
const Model = require('./model/init');

const corsConfig = {
  // origin: process.env.NODE_ENV === 'production' ? ['https://kontakplus.herokuapp.com', 'https://kontakplus.now.sh'] : '*',
  origin: '*'
};

Model.init();

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
app.use('/api/articles', require('./routes/article.route'));
app.use('/api/article-categories', require('./routes/article-category.route'));
app.use('/api/categories', require('./routes/bookmark-category.route'));
app.use('/api/quotes', require('./routes/quote.route'));

app.listen(app.get('PORT'), () => {
  console.log(`Our app listening on port ${app.get('PORT')}!`); // eslint-disable-line no-console
});

module.exports = app;
