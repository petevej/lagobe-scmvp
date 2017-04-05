require.main.require('../global');

var app = require(global.modulePath('app')); //Require our app
//var https = require('https');
var http = require('http');
var fs = require('fs');
var models = require(global.modulePath('', 'model'));

app.set('port', process.env.PORT || 8000);

models.sequelize.sync().then(function () {
    // Create an HTTP service.
    var server = http.createServer(app).listen(app.get('port'), function() {
        console.log('Express server listening on port ' + server.address().port);
    });


    //// Create an HTTPS service identical to the HTTP service.
    //var options = {
    //    key: fs.readFileSync('tls/localhost.key'),
    //    cert: fs.readFileSync('tls/localhost.crt')
    //};
    //var server = https.createServer(options, app).listen(app.get('port'), function () {
    //    console.log('Express server listening on port ' + server.address().port);
    //});
});

//var server = http.createServer(app).listen(app.get('port'), function() {
//    console.log('Express server listening on port ' + server.address().port);
//});

//var server = app.listen(app.get('port'), function() {
//    console.log('Express server listening on port ' + server.address().port);
//});