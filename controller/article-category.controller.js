'use strict';

/* eslint-disable no-param-reassign */
const ArticleCategory = require('../model/article-category.model');

exports.create = async (req, res) => {
	const { body } = req;
	const articleCategory = new ArticleCategory(body);
	try {
		await articleCategory.save();
		return res.status(200).json(articleCategory);
	} catch (e) {
		return handleError(res, e);
	}
};

exports.show = async (req, res) => {
	const id = req.params.id;
	try {
		const articleCategory = await ArticleCategory.findById(id);
		return res.status(200).json(articleCategory);
	} catch (e) {
		return res.status(400).json(e);
	}
};

exports.index = async (req, res) => {
	try {
		const articleCategories = await ArticleCategory.find({}, null, { sort: { title: 1 } });
		if (articleCategories.length === 0) return res.sendStatus(404);
		return res.status(200).json(articleCategories);
	} catch (e) {
		return res.sendStatus(400);
	}
};

exports.update = async (req, res) => {
	const { body, params } = req;
	const { id } = params;
	try {
		let articleCategory = await ArticleCategory.findById(id);
		articleCategory = Object.assign(articleCategory, body);
		const result = await articleCategory.save();
		return res.status(200).json(result);
	} catch (e) {
		return res.status(400).json(e);
	}
};

exports.deletes = async (req, res) => {
	try {
		await ArticleCategory.remove({ _id: req.params.id });
		return res.sendStatus(200);
	} catch (e) {
		return res.sendStatus(400);
	}
};

exports.patch = async (req, res) => {
	try {
		const articleCategory = await ArticleCategory.findById(req.params.id);
		const result = await articleCategory.save();
		return res.status(200).json(result);
	} catch (e) {
		return res.json(400, e);
	}
};

function handleError(res, err) {
	return res.status(500).json(err);
}
