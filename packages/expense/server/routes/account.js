'use strict';

// Accounts routes use accounts controller
var accounts = require('../controllers/accounts');

// The Package is past automatically as first parameter
module.exports = function(Account, app, auth, database) {

    app.route('/accounts')
        .get(accounts.list);

};