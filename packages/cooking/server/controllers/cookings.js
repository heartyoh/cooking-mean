'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Cooking = mongoose.model('Cooking'),
    fs = require('fs'),
    Imagemin = require('image-min'),
    path = require('path'),
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

// use lossless image compress plugins
var imagemin = new Imagemin()
    .use(Imagemin.jpegtran({ progressive: false }))
    .use(Imagemin.gifsicle({ interlaced: true }))
    .use(Imagemin.optipng({ optimizationLevel: 3 }));

var image_preprocess = function(image, callback) {
    var dataUrlHeader = image.match(/^data:image\/(\w+);base64,/);
    if(!dataUrlHeader || dataUrlHeader.length == 0) {
        callback(false, image);
        return;
    }
    var base64Data = image.substr(dataUrlHeader[0].length);
    var imageType = dataUrlHeader[1];

    var url = "/uploads/" + Date.now() + "." + imageType;

    imagemin
        .src(new Buffer(base64Data, 'base64'))
        .dest(path.join(__dirname, "../../../..") + url)
        .optimize(function (err, file) {
            callback(err, url);
        });
};

/**
 * Create an cooking
 */
exports.create = function(req, res) {
    var cooking = new Cooking(req.body);
    cooking.user = req.user;
    
    image_preprocess(cooking.image, function(err, url) {
        if(err) {

        } else {
            cooking.image = url;

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
        }
    });
};

/**
 * Update an cooking
 */
exports.update = function(req, res) {
    var cooking = req.cooking;

    cooking = _.extend(cooking, req.body);

    image_preprocess(cooking.image, function(err, url) {
        if(err) {

        } else {
            cooking.image = url;

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
