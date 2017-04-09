require.main.require('../global');

var app = require(global.modulePath('app')); //Require our app
var http = require('http');

app.set('port', process.env.PORT || 8000);

var server = http.createServer(app).listen(app.get('port'), function() {
    console.log('Express server listening on port ' + server.address().port);
});

//var server = app.listen(app.get('port'), function() {
//    console.log('Express server listening on port ' + server.address().port);
//});