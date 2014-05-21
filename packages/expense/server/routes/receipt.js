'use strict';

// Receipts routes use receipts controller
var receipts = require('../controllers/receipts');

// The Package is past automatically as first parameter
module.exports = function(Receipt, app, auth, database) {

    app.route('/receipts')
        .get(receipts.types);

};