'use strict';

// The Package is past automatically as first parameter
module.exports = function(Cooking, app, auth, database) {

    app.get('/cooking/example/anyone', function(req, res, next) {
        res.send('Anyone can access this');
    });

    app.get('/cooking/example/auth', auth.requiresLogin, function(req, res, next) {
        res.send('Only authenticated users can access this');
    });

    app.get('/cooking/example/admin', auth.requiresAdmin, function(req, res, next) {
        res.send('Only users with Admin role can access this');
    });

    app.get('/cooking/example/render', function(req, res, next) {
        Cooking.render('index', {
            package: 'cooking'
        }, function(err, html) {
            //Rendering a view from the Package server/views
            res.send(html);
        });
    });
};
