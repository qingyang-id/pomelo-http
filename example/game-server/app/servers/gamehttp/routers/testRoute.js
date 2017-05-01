module.exports = (app, express, plugin) => {
	const router = express.Router();
	if (plugin.useSSL) {
		router.get('/testHttps', (req, res, next) => {
			res.set('resp', 'https success');
			next();
		});
	} else {
		router.get('/testHttp', (req, res, next) => {
			res.set('resp', 'http success');
			next();
		});
	}
	return router;
};