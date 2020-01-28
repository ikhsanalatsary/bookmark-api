'use strict';

/* eslint-disable no-param-reassign */
const Quote = require('../model/quote.model');

exports.create = async (req, res) => {
  const { body } = req;
  const quote = new Quote(body);
  try {
    await quote.save();
    return res.status(200).json(quote);
  } catch (e) {
    return handleError(res, e);
  }
};

exports.show = async (req, res) => {
  const id = req.params.id;
  try {
    const quote = await Quote.findById(id);
    return res.status(200).json(quote);
  } catch (e) {
    return res.status(400).json(e);
  }
};

exports.index = async (req, res) => {
  try {
    let { q, page = 1, limit = 10, sort = { created: -1 }, skip } = req.query;
    page = Math.floor(page) || 1;
    limit = Math.floor(limit) || 10;
    let params = {};
    if (q) {
      let paramRegex = { $regex: q, $options: 'i' };
      params.$or = [{ text: paramRegex }, { author: paramRegex }];
    }
    const quotes = await Quote.find(params)
      .skip(skip !== undefined ? Math.floor(skip) : (page - 1) * limit) // actually, page starts from 0, like index array
      .limit(limit)
      .sort(sort);
    const count = await Quote.countDocuments(params);
    // console.log(page * limit)
    // console.log(count / limit)
    const pages = Math.ceil(count / limit);
    // if (quotes.length === 0) return res.sendStatus(404);
    // console.log(pages);
    return res.status(200).json({
      count,
      limit,
      page: skip !== undefined ? (Math.floor(skip) + limit) / limit : page,
      pages,
      lastPage: page * limit >= count,
      quotes
    });
  } catch (e) {
    return res.status(400).json(e);
  }
};

exports.update = async (req, res) => {
  const { body, params } = req;
  const { id } = params;
  try {
    let quote = await Quote.findById(id);
    quote = Object.assign(quote, body);
    const result = await quote.save();
    return res.status(200).json(result);
  } catch (e) {
    return res.status(400).json(e);
  }
};

exports.deletes = async (req, res) => {
  try {
    await Quote.remove({ _id: req.params.id });
    return res.sendStatus(200);
  } catch (e) {
    return res.sendStatus(400);
  }
};

exports.patch = async (req, res) => {
  try {
    const quote = await Quote.findById(req.params.id);
    const result = await quote.save();
    return res.status(200).json(result);
  } catch (e) {
    return res.json(400, e);
  }
};

function handleError(res, err) {
  return res.status(500).json(err);
}
