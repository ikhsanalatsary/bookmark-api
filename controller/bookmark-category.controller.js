'use strict';

/* eslint-disable no-param-reassign */
const BookmarkCategory = require('../model/bookmark-category.model');

exports.create = async (req, res) => {
    const { body } = req;
    const bookmarkCategory = new BookmarkCategory(body);
    try {
        await bookmarkCategory.save();
        return res.status(200).json(bookmarkCategory);
    } catch (e) {
        return handleError(res, e);
    }
};

exports.show = async (req, res) => {
    const id = req.params.id;
    try {
        const bookmarkCategory = await BookmarkCategory.findById(id);
        return res.status(200).json(bookmarkCategory);
    } catch (e) {
        return res.status(400).json(e);
    }
};

exports.index = async (req, res) => {
    try {
        const bookmarkCategories = await BookmarkCategory.find({}, null, { sort: { title: 1 } });
        if (bookmarkCategories.length === 0) return res.sendStatus(404);
        return res.status(200).json(bookmarkCategories);
    } catch (e) {
        return res.sendStatus(400);
    }
};

exports.update = async (req, res) => {
    const { body, params } = req;
    const { id } = params;
    try {
        let bookmarkCategory = await BookmarkCategory.findById(id);
        bookmarkCategory = Object.assign(bookmarkCategory, body);
        const result = await bookmarkCategory.save();
        return res.status(200).json(result);
    } catch (e) {
        return res.status(400).json(e);
    }
};

exports.deletes = async (req, res) => {
    try {
        await BookmarkCategory.remove({ _id: req.params.id });
        return res.sendStatus(200);
    } catch (e) {
        return res.sendStatus(400);
    }
};

exports.patch = async (req, res) => {
    try {
        const bookmarkCategory = await BookmarkCategory.findById(req.params.id);
        const result = await bookmarkCategory.save();
        return res.status(200).json(result);
    } catch (e) {
        return res.json(400, e);
    }
};

function handleError(res, err) {
    return res.status(500).json(err);
}
