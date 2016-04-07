'use strict';
// fork of react-hyperscript
var parseTag = require('virtual-dom/virtual-hyperscript/parse-tag');
var Inferno = require('inferno');

var forEach = require('lodash/forEach');
var includes = require('lodash/includes');
var isFunction = require('lodash/isFunction');

var hooks = [
  'onCreated',
  'onAttached',
  'onWillDetach',
  'onWillUpdate',
  'onDidUpdate'
];
var componentHooks = [
  'onComponentWillMount',
  'onComponentDidMount',
  'onComponentWillUnmount',
  'onComponentShouldUpdate',
  'onComponentWillUpdate',
  'onComponentDidUpdate'
];

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
    return Inferno.createElement.apply(Inferno, args);
  }

  var extracted = extractFromProps(properties, tag);

  return {
    dom: null,
    tag: tag,
    key: extracted.key,
    attrs: extracted.props,
    events: extracted.events,
    hooks: extracted.hooks,
    className: extracted.className,
    style: extracted.style,
    children: children,
    instance: null
  };
};

function extractFromProps(props, tag) {
  var key = null;
  var events = null;
  var hooks = null;
  var className = null;
  var style = null;
  var newProps = null;

  forEach(props, function (v, k) {
    if (k === 'className') {
      className = v;
    } else if (k === 'style') {
      style = v;
    } else if (k === 'key') {
      key = v;
    } else if (isHook(k) && !isFunction(tag)) {
      if (!hooks) {
        hooks = {};
      }

      hooks[k.substring(2).toLowerCase()] = v;
    } else if (isEvent(k) && !isFunction(tag)) {
      if (!events) {
        events = {};
      }

      events[k.substring(2).toLowerCase()] = v;
    } else if (isComponentHook(k) && isFunction(tag)) {
      if (!hooks) {
        hooks = {};
      }

      hooks['c' + k.substring(3)] = v;
    } else if (isFunction(tag)) {
      newProps = v;
    } else {
      if (!newProps) {
        newProps = {};
      }

      newProps[k] = v;
    }
  });

  return {
    key: key,
    events: events,
    hooks: hooks,
    className: className,
    style: style,
    props: newProps
  };
}

function isHook(attr) {
  return includes(hooks, attr);
}

function isComponentHook(attr) {
  return includes(componentHooks, attr);
}

function isEvent(attr) {
  return attr[0] === 'o' && attr[1] === 'n' && attr.length > 3;
}

function isChildren(x) {
  return typeof x === 'string' || typeof x === 'number' || (x && x.constructor === Array);
}
