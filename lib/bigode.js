
var mustache = function () {
    var mustache = require('mustache');

    var compile = function (source, options) {
        if (typeof source !== 'string') {
            return source;
        }
        return function(options) {
            options.locals = options.locals || {};
            options.partials = options.partials || {};
            if (options.body) // for express.js > v1.0
                locals.body = options.body;
            return mustache.to_html(
                source, options.locals, options.partials);
        };
    };

    var render = function (template, options) {
        template = this.compile(template, options);
        return template(options);
    };

    var tmpl = {
        mustache: mustache,
        compile: compile,
        render: render
    };

    return tmpl;
};


var handlebars = function () {
    var handlebars = require('handlebars');

    var compile = function (source, options) {
        if (typeof source !== 'string') {
            return source;
        };
      
        var template = handlebars.compile(source);

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
        handlebars: handlebars,
        compile: compile,
        render: render,
        registerHelper: function () {
            handlebars.registerHelper.apply(handlebars, arguments);
        },
        registerPartial: function () {
            handlebars.registerPartial.apply(handlebars, arguments);
        },
        SafeString: handlebars.SafeString,
        Utils: handlebars.Utils
    };

    return tmpl;
};

var hogan = function () {
    var hogan = require('hogan.js');

    var compile = function(source){
        if (typeof source !== 'string') {
            return source;
        }
        return function(options) {
            return hogan.compile(source).render(options);
        };
    };

    var render = function( template, options ) {
        template = this.compile( template, options);
        return template(options);
    };

    var tmpl = {
        hogan: hogan,
        compile: compile,
        render: render
    };

    return tmpl;
};

var loadTemplate = function (template, wrapper) {
    var fs = require('fs');
    var template = fs.readFileSync( template ) + '';

    if (wrapper !== undefined){
        template = wrapper.compile(template);
    }
    return template;
}

module.exports = {
    loadTemplate: loadTemplate,
    mustache: mustache,
    handlebars: handlebars,
    hogan: hogan
}
