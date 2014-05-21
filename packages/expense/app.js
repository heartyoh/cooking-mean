'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Expense = new Module('expense');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Expense.register(function(app, auth, database) {

    //We enable routing. By default the Package Object is passed to the routes
    Expense.routes(app, auth, database);

    //We are adding a link to the main menu for all authenticated users
    Expense.menus.add({
        title: 'Expenses',
        link: 'expense list',
        roles: ['authenticated'],
        menu: 'main'
    });

    Expense.menus.add({
        title: 'Create New Expense',
        link: 'create expense',
        roles: ['authenticated'],
        menu: 'main'
    });

    /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Expense.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Expense.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Expense.settings(function(err, settings) {
        //you now have the settings object
    });
    */

    return Expense;
});
