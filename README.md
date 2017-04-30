pomelo-http
==================

Wrap express module as pomelo http tools.


[wiki][]
[wiki]: https://github.com/Sailor20/pomelo-http/wiki

###How to use pomelo-http:

###Single server

For example, your http server name is gamehttp.

#####1. Create config/http.json, configure your http server
```js
{
  "development": {
    "gamehttp": {
      "host": "127.0.0.1",
      "port": 3001
    }
  }
}
```
If you want to support https, you should add more keys to config/http.json
```js
{
  "development": {
    "gamehttp": {
      "useSSL": true,
      "keyFile": "config/key.pem",
      "certFile": "config/cert.pem",
      "host": "127.0.0.1",
      "port": 3001
    }
  }
}
```
#####2. Change servers.json, add gamehttp config
```js
"gamehttp": [{
  "id": "gamehttp",
  "port": 3002,
  "host": "127.0.0.1"
}]
```
#####3. Change adminServer.json, add server type config
```js
{
  "type": "gamehttp",
  "token": "agarxhqb98rpajloaxn34ga8xrunpagkjwlaw3ruxnpaagl29w4rxn"
}
```
#####4. Change app.js
```js
const pomeloHttp = require('pomelo-http');
const path = require('path');
app.configure('development', 'gamehttp', function() {
  app.loadConfig('httpConfig', path.join(app.getBase(), 'config/http.json'));
  app.use(pomeloHttp, {
    http: app.get('httpConfig')[app.getServerId()]
  });
});
```
#####5. Create app/servers/gamehttp/route/testRoute.js
```js
module.exports = (app, router) => {

  router.get('/test', (req, res) => {
    res.send('test success')
  });
  
  return router;
};
```
#####6. Run your app and open url http://127.0.0.1:3001/test

###Server cluster

This example, we configure our http server as a server cluster, just have a little difference with the before example.

#####1. Create config/http.json, configure your http server
```js
{
  "development": {
    "gamehttp": {
      "isCluster": true,
      "host": "127.0.0.1",
      "port": "3001++"
    }
  }
}
```
If you want to support https, you should add more keys to config/http.json
```js
{
  "development": {
    "gamehttp": {
      "useSSL": true,
      "keyFile": "config/key.pem",
      "certFile": "config/cert.pem",
      "isCluster": true,
      "host": "127.0.0.1",
      "port": "3001++"
    }
  }
}
```
#####2. Change servers.json, add gamehttp config
```js
"gamehttp": [{
  "id": "gamehttp",
  "clusterCount": 2,
  "port": "3101++",
  "host": "127.0.0.1"
}]
```
#####3. Change adminServer.json, add server type config
```js
{
  "type": "gamehttp",
  "token": "agarxhqb98rpajloaxn34ga8xrunpagkjwlaw3ruxnpaagl29w4rxn"
}
```
#####4. Change app.js
```js
const pomeloHttp = require('pomelo-http');
const path = require('path');

app.configure('development', 'gamehttp', () => {
  app.loadConfig('httpConfig', path.join(app.getBase(), 'config/http.json'));
  app.use(pomeloHttp, {
    httpComponent: app.get('httpConfig')[app.getServerType()]
  });
});
```
#####5. Create app/servers/gamehttp/route/testRoute.js
```js
module.exports = (app, router) => {

  router.get('/test', (req, res) => {
    res.send('test success')
  });
};
```
#####6. Run your app and open urls: http://127.0.0.1:3001/test, http://127.0.0.1:3002/test
#####7. Optional, you can use nginx or any other similar program to reverse proxy the http port, just google it!
