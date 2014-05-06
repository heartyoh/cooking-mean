'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Cooking = mongoose.model('Cooking'),
    _ = require('lodash');


/**
 * Find cooking by id
 */
exports.cooking = function(req, res, next, id) {
    Cooking.load(id, function(err, cooking) {
        if (err) return next(err);
        if (!cooking) return next(new Error('Failed to load cooking ' + id));
        req.cooking = cooking;
        next();
    });
};

/**
 * Create an cooking
 */
exports.create = function(req, res) {
    var cooking = new Cooking(req.body);
    cooking.user = req.user;

    cooking.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                cooking: cooking
            });
        } else {
            res.jsonp(cooking);
        }
    });
};

/**
 * Update an cooking
 */
exports.update = function(req, res) {
    var cooking = req.cooking;

    cooking = _.extend(cooking, req.body);

    cooking.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                cooking: cooking
            });
        } else {
            res.jsonp(cooking);
        }
    });
};

/**
 * Delete an cooking
 */
exports.destroy = function(req, res) {
    var cooking = req.cooking;

    cooking.remove(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                cooking: cooking
            });
        } else {
            res.jsonp(cooking);
        }
    });
};

/**
 * Show an cooking
 */
exports.show = function(req, res) {
    res.jsonp(req.cooking);
};

/**
 * List of Cookings
 */
exports.all = function(req, res) {
    Cooking.find().sort('-created').populate('user', 'name username').exec(function(err, cookings) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(cookings);
        }
    });
};
