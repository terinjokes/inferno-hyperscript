'use strict';
// fork of react-hyperscript
var parseTag = require('virtual-dom/virtual-hyperscript/parse-tag');
var Inferno = require('inferno');

module.exports = function (tag, properties, children) {
  // If a child array or text node are passed as the second argument, shift them
  if (!children && isChildren(properties)) {
    children = properties;
    properties = {};
  }

  properties = properties || {};

  // When a selector, parse the tag name and fill out the properties object
  if (typeof tag === 'string') {
    tag = parseTag(tag, properties);
  }

  // Create the element
  if (process.env.NODE_ENV !== 'production') {
    var args = [tag, properties].concat(children);
    return Inferno.TemplateFactory.createElement.apply(Inferno.TemplateFactory, args);
  }

  return {
    tag: tag,
    attrs: properties,
    children: [].concat(children)
  };
};

module.exports.t = Inferno.createTemplate;

function isChildren(x) {
  return typeof x === 'string' || typeof x === 'number' || (x && x.constructor === Array);
}
