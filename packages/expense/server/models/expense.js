'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    
/**
 * Expense Schema
 */
var ExpenseSchema = new Schema({
  date: Date,
  account: String,
  amount: Number,
  currency: String,
  receipt: String,
  comment: String,

  excurrency: String,
  exrate: Number,
  exchanged: Number,

  confirm: Boolean,

  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  created: Date,
  updated: {
    type: Date,
    default: Date.now
  }
});

/**
 * Validations
 */
ExpenseSchema.path('user').validate(function (user) {
  return !!user;
}, 'User must not be blank');

ExpenseSchema.path('date').validate(function (date) {
  return !!date;
}, 'Date must not be blank');

ExpenseSchema.path('account').validate(function (account) {
  return !!account;
}, 'Account must not be blank');

ExpenseSchema.path('amount').validate(function (amount) {
  return !!amount;
}, 'Amount must not be blank');

ExpenseSchema.path('currency').validate(function (currency) {
  return !!currency;
}, 'Currency must not be blank');

ExpenseSchema.path('excurrency').validate(function (excurrency) {
  return !!excurrency;
}, 'Exchange Currency must not be blank');

/**
 * Statics
 */
ExpenseSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('user', 'name username').exec(cb);
};

mongoose.model('Expense', ExpenseSchema);
