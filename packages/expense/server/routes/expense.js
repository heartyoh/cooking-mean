'use strict';

// Expenses routes use expenses controller
var expenses = require('../controllers/expenses');

// Expense authorization helpers
var hasAuthorization = function(req, res, next) {
    if (req.expense.user.id !== req.user.id) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

// The Package is past automatically as first parameter
module.exports = function(Expense, app, auth, database) {

    app.route('/expenses')
        .get(expenses.all)
        .post(auth.requiresLogin, expenses.create);
        
    app.route('/expenses/:expenseId')
        .get(expenses.show)
        .put(auth.requiresLogin, hasAuthorization, expenses.update)
        .delete(auth.requiresLogin, hasAuthorization, expenses.destroy);

    // Finish with setting up the expenseId param
    app.param('expenseId', expenses.expense);

};