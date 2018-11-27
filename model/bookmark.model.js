'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BookmarkSchema = new Schema({
	url: { type: String, required: true, default: '' },
	description: { type: String, default: '' },
	categories: [
		{
			type: Schema.ObjectId,
			ref: 'BookmarkCategory'
		}
	],
	created: { type: Date, default: Date.now },
	updated: Date
});

BookmarkSchema.pre('save', function pre(next) {
	if (this.isNew) return next();
	this.updated = Date.now();
	return next();
});

const Bookmark = mongoose.model('Bookmark', BookmarkSchema);

module.exports = Bookmark;
