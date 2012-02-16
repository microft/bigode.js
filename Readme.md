## Bigode.js - mustachejs/handlebarsjs/hogan.js wrapper for express.js

[express.js](http://expressjs.com/) is the most widespread web framework for [nodejs](http://nodejs.org/).
[mustache.js](https://github.com/janl/mustache.js), [handlebars.js](http://handlebarsjs.com/) and [Hogan.js](http://twitter.github.com/hogan.js/) are template systems based on, or derived from, [Mustache](http://mustache.github.com/).
But these modules don't work with [express.js](http://expressjs.com/) out of the box. There is some boilerplate code that's missing. Bigode.js tries to add that "glue" that will let you use these templating modules with express.


## Using bigode.js examples

```js
var express = require('express');
var app = express.createServer(); // create the express app

var wrapper = require('bigode.js').mustache();   // <<<--- getting the mustache.js wrapper from bigode.js
var wrapper = require('bigode.js').handlebars();   // <<<--- getting the handlebars.js wrapper from bigode.js
var wrapper = require('bigode.js').hogan();   // <<<--- getting the hogan.js wrapper from bigode.js

app.configure(function() {
    app.set('views', __dirname + '/views');
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));
    app.register('.html', wrapper);   // <<<-- using wrapper to process .html files
});
```
