'use strict';

// Accounts routes use currencies controller
var currencies = require('../controllers/currencies');

// The Package is past automatically as first parameter
module.exports = function(Account, app, auth, database) {

    app.route('/currencies')
        .get(currencies.types);

    app.route('/currencies/rate')
        .get(currencies.rate);

};