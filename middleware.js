'use strict';

const Partner = require('./model');

function create(req, res, next) {
  Partner.create(req.body, function (err, partner) {
    if (err) return next(err);
    res.status(201).json(partner);
  });
}

function findById(req, res, next) {
  if (req.params.id === 'new') {
    return next();
  }

  return Partner.findById(req.params.id, function (err, partner) {
    if (err) return next(err);
    res.locals.partner = partner;
    next();
  });
}

function getAll(req, res, next) {
  if (!req.user)
    return getPublished(req, res, next);

  Partner.find({}, function (err, partners) {
    if (err) return next(err);
    res.locals.partners = partners;
    next();
  });
}

function getPublished(req, res, next) {
  Partner.find({ datePublished: { $ne: null } }).sort({ priority: -1, 'name': 1 }).exec(function (err, partners) {
    if (err) return next(err);

    res.locals.partners = partners;
    next();
  });
}

function update(req, res, next) {
  return Partner.findById(req.params.id, function (err, partner) {
    delete req.body._id;
    delete req.body.__v;

    _.extend(partner, req.body);

    return partner.save(function (err) {
      if (err) return next(err);
      return res.status(200).json(partner);
    });
  });
}

function remove(req, res, next) {
  return Partner.findById(req.params.id, function (err, partner) {
    if (err) return next(err);
    return partner.remove(function (err) {
      if (err) return next(err);
      return res.sendStatus(200);
    });
  });
}

module.exports = {
  create,
  findById,
  getAll,
  getPublished,
  remove,
  update,
};
