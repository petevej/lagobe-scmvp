require.main.require('../global');

var app = require(global.modulePath('app')); //Require our app
var http = require('http');
//var https = require('https');
//var fs = require('fs');

app.set('port', process.env.PORT || 8000);

var server = http.createServer(app).listen(app.get('port'), function() {
    console.log('Express server listening on port ' + server.address().port);
});

//// Create an HTTPS service identical to the HTTP service.
//var options = {
//    key: fs.readFileSync('/etc/letsencrypt/live/sc.lagobe.com/privkey.pem'),
//    cert: fs.readFileSync('/etc/letsencrypt/live/sc.lagobe.com/fullchain.pem')
//};
//var server = https.createServer(options, app).listen(app.get('port'), function () {
//    console.log('Express server listening on port ' + server.address().port);
//});