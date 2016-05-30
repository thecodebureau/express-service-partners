'use strict';

const config = require('./config');
const _ = require('lodash');

const mongoose = require('mongoose');

const schema = _.merge({}, require('mongopot/schemas/organization'));

if (config.languages) {
  const description = schema.description;
  schema.description = {};

  _.forEach(config.languages, (value) => {
    schema.description[value.iso] = description;
  });
}

const Schema = new mongoose.Schema(schema);

Schema.plugin(require('mongopot/plugins/base'));

module.exports = mongoose.model('Partner', Schema);
