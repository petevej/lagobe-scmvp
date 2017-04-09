require.main.require('../global');

var app = require(global.modulePath('app')); //Require our app
var config = require('config');
//var https = require('https');
var http = require('http');
var path = require('path');
var fs = require('fs');
var models = require(global.modulePath('', 'model'));
var importer = require('node-mysql-importer');

app.set('port', process.env.PORT || 8000);

models.sequelize.sync().then(function () {
    importer.config({
        'host': config.database.host,
        'user': config.database.user,
        'password': config.database.password,
        'database': config.database.name
    });
     
    importer.importSQL(path.join(__dirname, '../data/data.sql')).then( () => {
        console.log('all statements have been executed')
    }).catch( err => {
        console.log(`error: ${err}`)
    });
    
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