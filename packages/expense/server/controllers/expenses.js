'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Expense = mongoose.model('Expense'),
    _ = require('lodash');


/**
 * Find expense by id
 */
exports.expense = function(req, res, next, id) {
    Expense.load(id, function(err, expense) {
        if (err) return next(err);
        if (!expense) return next(new Error('Failed to load expense ' + id));
        req.expense = expense;
        next();
    });
};

/**
 * Create an expense
 */
exports.create = function(req, res) {
    var expense = new Expense(req.body);
    expense.user = req.user;

    expense.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                expense: expense
            });
        } else {
            res.jsonp(expense);
        }
    });
};

/**
 * Update an expense
 */
exports.update = function(req, res) {
    var expense = req.expense;

    expense = _.extend(expense, req.body);

    expense.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                expense: expense
            });
        } else {
            res.jsonp(expense);
        }
    });
};

/**
 * Delete an expense
 */
exports.destroy = function(req, res) {
    var expense = req.expense;

    expense.remove(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                expense: expense
            });
        } else {
            res.jsonp(expense);
        }
    });
};

/**
 * Show an expense
 */
exports.show = function(req, res) {
    res.jsonp(req.expense);
};

/**
 * List of Expenses
 */
exports.all = function(req, res) {
    Expense.find().sort('-created').populate('user', 'name username').exec(function(err, expenses) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(expenses);
        }
    });
};
