module.exports = (app, http, plugin) => {
	if (plugin.useSSL) {
		http.get('/testHttps', (req, res, next) => {
			res.set('resp', 'https success');
			next();
		});
	} else {
		http.get('/testHttp', (req, res, next) => {
			res.set('resp', 'http success');
			next();
		});
	}
	return http;
};