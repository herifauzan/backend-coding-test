'use strict';

var utils = require('../utils/writer.js');
var Health = require('../service/HealthService');

module.exports.health = function health (req, res, next) {
  Health.health()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
