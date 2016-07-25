'use strict';
// fork of react-hyperscript
var parseTag = require('virtual-dom/virtual-hyperscript/parse-tag');
var Inferno = require('inferno');
var transform = require('lodash/fp/transform');
var assign = require('lodash/fp/assign');
var includes = require('lodash/fp/includes');
var __ = require('lodash/fp/placeholder');
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

var isHook = includes(__, hooks);
var isComponentHook = includes(__, componentHooks);
var createVNode = assign(Inferno.createVNode());

module.exports = function (tag, properties, children) {
  // If a child array or text node are passed as the second argument, shift them
  if (!children && isChildren(properties)) {
    children = properties;
    properties = {};
  }

  properties = properties || {};
  children = typeof children === 'undefined' ? null : children;

  // When a selector, parse the tag name and fill out the properties object
  if (typeof tag === 'string') {
    tag = parseTag(tag, properties);
  }

  var extracted = extractFromProps(properties, tag, children);

  return createVNode(extracted);
};

function getEventFromHook(hook) {
  return hook.charAt(2).toLowerCase() + hook.substring(3);
}

function extractFromProps(props, tag, children) {
  return transform.convert({cap: false})(function (acc, v, k) {
    if (k === 'className') {
      acc.className = v;
    } else if (k === 'style') {
      acc.style = v;
    } else if (k === 'key') {
      acc.key = v;
    } else if (isHook(k) && !isFunction(tag)) {
      if (!acc.hooks) {
        acc.hooks = {};
      }
      acc.hooks[getEventFromHook(k)] = v;
    } else if (isEvent(k) && !isFunction(tag)) {
      if (!acc.events) {
        acc.events = {};
      }

      acc.events[k.toLowerCase()] = v;
    } else if (isComponentHook(k) && isFunction(tag)) {
      if (!acc.hooks) {
        acc.hooks = {};
      }

      acc.hooks['c' + k.substring(3)] = v;
    } else {
      if (!acc.attrs) {
        acc.attrs = {};
      }

      acc.attrs[k] = v;
    }
  }, {
    tag: tag,
    children: children
  })(props);
}

function isEvent(attr) {
  return attr[0] === 'o' && attr[1] === 'n' && attr.length > 3;
}

function isChildren(x) {
  return typeof x === 'string' || typeof x === 'number' || (x && x.constructor === Array);
}
