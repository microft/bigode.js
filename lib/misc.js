function loadTemplate(template) {
        return this.fs.readFileSync(app.set('views') + template+ '.html')+ '';
}

var html = Mustache.to_html(loadTemplate('myView'), {key: "value", ...});

res.send(html);



https://github.com/donpark/hbs/blob/master/lib/hbs.js

https://github.com/twitter/hogan.js

https://github.com/crossbreeze/node-pusher



