'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ArticleCategorySchema = new Schema({
	title: { type: String, default: '' },
	created: { type: Date, default: Date.now },
	updated: Date
});

ArticleCategorySchema.pre('save', function pre(next) {
	if (this.isNew) return next();
	this.updated = Date.now();
	return next();
});

module.exports = mongoose.model('ArticleCategory', ArticleCategorySchema);
