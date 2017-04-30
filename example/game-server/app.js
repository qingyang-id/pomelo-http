const pomelo = require('pomelo');
const httpTool = require('../../');
const path = require('path');

/**
 * Init app for client.
 */
const app = pomelo.createApp();
app.set('name', 'example');


// app configuration
app.configure('development', 'gamehttp', function() {
	app.loadConfig('httpConfig', path.join(app.getBase(), 'config/http.json'));
	app.use(httpTool, {
		httpComponent: app.get('httpConfig').gamehttp,
	});
	// need put the certificate in config
	// app.use(httpTool, {
   //  httpComponent: app.get('httpConfig').gamehttps,
	// });

	httpTool.filter(require('./app/filters/log')());
	httpTool.afterFilter(function(req, res) {
		res.send(res.get('resp'));
	});
});
// start app
app.start();

process.on('uncaughtException', function(err) {
	console.error(' Caught exception: ' + err.stack);
});