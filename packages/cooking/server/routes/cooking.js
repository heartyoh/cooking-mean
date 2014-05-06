'use strict';

// // The Package is past automatically as first parameter
// module.exports = function(Cooking, app, auth, database) {

//     app.get('/cooking/example/anyone', function(req, res, next) {
//         res.send('Anyone can access this');
//     });

//     app.get('/cooking/example/auth', auth.requiresLogin, function(req, res, next) {
//         res.send('Only authenticated users can access this');
//     });

//     app.get('/cooking/example/admin', auth.requiresAdmin, function(req, res, next) {
//         res.send('Only users with Admin role can access this');
//     });

//     app.get('/cooking/example/render', function(req, res, next) {
//         Cooking.render('index', {
//             package: 'cooking'
//         }, function(err, html) {
//             //Rendering a view from the Package server/views
//             res.send(html);
//         });
//     });
// };

// Cookings routes use cookings controller
var cookings = require('../controllers/cookings');

// Cooking authorization helpers
var hasAuthorization = function(req, res, next) {
    if (req.cooking.user.id !== req.user.id) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

// The Package is past automatically as first parameter
module.exports = function(Cooking, app, auth, database) {

    app.route('/cookings')
        .get(cookings.all)
        .post(auth.requiresLogin, cookings.create);
    app.route('/cookings/:cookingId')
        .get(cookings.show)
        .put(auth.requiresLogin, hasAuthorization, cookings.update)
        .delete(auth.requiresLogin, hasAuthorization, cookings.destroy);

    // Finish with setting up the cookingId param
    app.param('cookingId', cookings.cooking);

};