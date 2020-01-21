'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const QuoteSchema = new Schema({
    text: String,
    author: String,
	created: { type: Date, default: Date.now },
	updated: Date
});

QuoteSchema.pre('save', function pre(next) {
	if (this.isNew) return next();
	this.updated = Date.now();
	return next();
});

const Quote = mongoose.model('Quote', QuoteSchema);

module.exports = Quote;
