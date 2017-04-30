class LogFilter {
  before(req, res, next) {
    console.log('[http request]:', req.method, req.url);
    next();
  };

  after(req, res, next) {
		console.log('[http response]:', req.method, req.url, res.get('resp'));
		next();
	};
}

module.exports = () => new LogFilter();
