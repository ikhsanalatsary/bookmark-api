'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
	title: { type: String, required: true, default: '' },
	description: { type: String, default: '' },
	categories: [
		{
			type: Schema.ObjectId,
			ref: 'ArticleCategory'
		}
	],
	created: { type: Date, default: Date.now },
	updated: Date
});

ArticleSchema.pre('save', function pre(next) {
	if (this.isNew) return next();
	this.updated = Date.now();
	return next();
});

const Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;
