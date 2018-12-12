'use strict';

/* eslint-disable no-param-reassign */
const Article = require('../model/article.model');

exports.create = async (req, res) => {
	const { body } = req;
	const article = new Article(body);
	try {
		await article.save();
		return res.status(200).json(article);
	} catch (e) {
		return handleError(res, e);
	}
};

exports.show = async (req, res) => {
	const id = req.params.id;
	try {
    const article = await Article.findById(id).populate('categories');
		return res.status(200).json(article);
	} catch (e) {
		return res.status(400).json(e);
	}
};

exports.index = async (req, res) => {
	try {
    const articles = await Article.find({}, null, { sort: { created: -1 } }).populate('categories');
		if (articles.length === 0) return res.sendStatus(404);
		return res.status(200).json(articles);
	} catch (e) {
		return res.sendStatus(400);
	}
};

exports.update = async (req, res) => {
	const { body, params } = req;
	const { id } = params;
	try {
		let article = await Article.findById(id);
		article = Object.assign(article, body);
		const result = await article.save();
		return res.status(200).json(result);
	} catch (e) {
		return res.status(400).json(e);
	}
};

exports.deletes = async (req, res) => {
	try {
		await Article.remove({ _id: req.params.id });
		return res.sendStatus(200);
	} catch (e) {
		return res.sendStatus(400);
	}
};

exports.patch = async (req, res) => {
	try {
		const article = await Article.findById(req.params.id);
		const result = await article.save();
		return res.status(200).json(result);
	} catch (e) {
		return res.json(400, e);
	}
};

function handleError(res, err) {
	return res.status(500).json(err);
}
