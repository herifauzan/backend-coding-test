'use strict';


/**
 * Add a new ride to the database
 * 
 *
 * body Ride Ride object that needs to be added to the store
 * no response value expected for this operation
 **/
exports.addRide = function(body) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Find ride by ID
 * Returns a single ride information
 *
 * id Integer ID of ride to return
 * returns ListRide
 **/
exports.getRideById = function(id) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = "";
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Get all rides informations
 * 
 *
 * skip Integer skip under number (optional)
 * limit Integer limit number of list (optional)
 * returns ListRide
 **/
exports.getRides = function(skip,limit) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = "";
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

