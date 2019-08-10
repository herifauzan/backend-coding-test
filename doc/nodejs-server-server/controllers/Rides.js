'use strict';

var utils = require('../utils/writer.js');
var Rides = require('../service/RidesService');

module.exports.addRide = function addRide (req, res, next) {
  var body = req.swagger.params['body'].value;
  Rides.addRide(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getRideById = function getRideById (req, res, next) {
  var id = req.swagger.params['Id'].value;
  Rides.getRideById(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getRides = function getRides (req, res, next) {
  var skip = req.swagger.params['skip'].value;
  var limit = req.swagger.params['limit'].value;
  Rides.getRides(skip,limit)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
