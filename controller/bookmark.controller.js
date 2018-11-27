'use strict';

/* eslint-disable no-param-reassign */
const Bookmark = require('../model/bookmark.model');

exports.create = async (req, res) => {
	const { body } = req;
	const bookmark = new Bookmark(body);
	try {
		await bookmark.save();
		return res.status(200).json(bookmark);
	} catch (e) {
		return handleError(res, e);
	}
};

exports.show = async (req, res) => {
	const id = req.params.id;
	try {
		const bookmark = await Bookmark.findById(id);
		return res.status(200).json(bookmark);
	} catch (e) {
		return res.status(400).json(e);
	}
};

exports.index = async (req, res) => {
	try {
		const bookmarks = await Bookmark.find({}, null, { sort: { url: 1 } });
		if (bookmarks.length === 0) return res.sendStatus(404);
		return res.status(200).json(bookmarks);
	} catch (e) {
		return res.sendStatus(400);
	}
};

exports.update = async (req, res) => {
	const { body, params } = req;
	const { id } = params;
	try {
		let bookmark = await Bookmark.findById(id);
		bookmark = Object.assign(bookmark, body);
		const result = await bookmark.save();
		return res.status(200).json(result);
	} catch (e) {
		return res.status(400).json(e);
	}
};

exports.deletes = async (req, res) => {
	try {
		await Bookmark.remove({ _id: req.params.id });
		return res.sendStatus(200);
	} catch (e) {
		return res.sendStatus(400);
	}
};

exports.patch = async (req, res) => {
	try {
		const bookmark = await Bookmark.findById(req.params.id);
		const result = await bookmark.save();
		return res.status(200).json(result);
	} catch (e) {
		return res.json(400, e);
	}
};

function handleError(res, err) {
	return res.status(500).json(err);
}
