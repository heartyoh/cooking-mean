'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Cooking = new Module('Cooking');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Cooking.register(function(app, auth, database) {

    //We enable routing. By default the Package Object is passed to the routes
    Cooking.routes(app, auth, database);

    //We are adding a link to the main menu for all authenticated users
    Cooking.menus.add({
        title: 'Cookings',
        link: 'cooking list',
        roles: ['authenticated'],
        menu: 'main'
    });

    Cooking.menus.add({
        title: 'Create New Cooking',
        link: 'create cooking',
        roles: ['authenticated'],
        menu: 'main'
    });

    /*
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Cooking.settings({
	'someSetting': 'some value'
    }, function(err, settings) {
	//you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Cooking.settings({
	'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Cooking.settings(function(err, settings) {
	//you now have the settings object
    });
    */

    Cooking.aggregateAsset('css', 'cooking.css');

    return Cooking;
});
