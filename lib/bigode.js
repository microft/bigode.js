
var mustache = function () {
    var mustache = require('mustache');

    var tmpl = {
        compile: function (source, options) {
            if (typeof source == 'string') {
                return function(options) {
                    options.locals = options.locals || {};
                    options.partials = options.partials || {};
                    if (options.body) // for express.js > v1.0
                        locals.body = options.body;
                    return mustache.to_html(
                        source, options.locals, options.partials);
                };
            } else {
                return source;
            }
        },
        render: function (template, options) {
            template = this.compile(template, options);
            return template(options);
        }
    };

    return tmpl;
};


var handlebars = function () {
    var handlebars = require('handlebars');

    var compile = function (str, options) {
      if (typeof str !== 'string') {
        return str;
      }
      
      var template = handlebars.compile(str);
      return function (locals) {
        return template(locals, {
          helpers: locals.blockHelpers,
          partials: null,
          data: null
        });
      };
    };

    var render = function( template, options ){
        template = this.compile( template, options);
        return template(options);
    };

    var tmpl = {
        compile: compile,
        render: render,
        handlebars: handlebars,
        registerHelper: function () {
            handlebars.registerHelper.apply(handlebars, arguments);
        },
        registerPartial: function () {
            handlebars.registerPartial.apply(handlebars, arguments);
        },
        SafeString: handlebars.SafeString,
        Utils: handlebars.Utils
    };

    return tmpl

};

module.exports = {
    mustache: mustache,
    handlebars: handlebars
}
