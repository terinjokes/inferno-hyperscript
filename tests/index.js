'use strict';
var h = require('..');
var InfernoServer = require('inferno-server');
var test = require('ava');
var expect = require('assume');

test('an html tag', function () {
  var end = expect.plan(2);

  var t = h.t(function () {
    return h('h1');
  });
  var domString = InfernoServer.renderToString(t());

  expect(domString).is.a('string');
  expect(domString).equals('<h1 data-inferno></h1>');
  end();
});

test('a tag with an id and classes in the selector', function () {
  var end = expect.plan(2);

  var t = h.t(function () {
    return h('h1#boom.whatever.foo');
  });
  var domString = InfernoServer.renderToString(t());

  expect(domString).is.a('string');
  expect(domString).equals('<h1 id="boom" class="whatever foo" data-inferno></h1>');

  end();
});

test('a tag with classes in the selector and props', function () {
  var end = expect.plan(2);

  var t = h.t(function () {
    return h('h1.foo', {
      className: 'bar'
    });
  });
  var domString = InfernoServer.renderToString(t());

  expect(domString).is.a('string');
  expect(domString).equals('<h1 class="foo bar" data-inferno></h1>');

  end();
});

test('a tag with other properties', function () {
  var end = expect.plan(2);

  var t = h.t(function () {
    return h('a', {
      href: 'http://www.google.com'
    });
  });
  var domString = InfernoServer.renderToString(t());

  expect(domString).is.a('string');
  expect(domString).equals('<a href="http://www.google.com" data-inferno></a>');

  end();
});

test('a tag with a string as the third argument', function () {
  var end = expect.plan(2);

  var t = h.t(function () {
    return h('h1', null, 'Hello World!');
  });
  var domString = InfernoServer.renderToString(t());

  expect(domString).is.a('string');
  expect(domString).equals('<h1 data-inferno>Hello World!</h1>');

  end();
});

test('a tag with a string as the second argument', function () {
  var end = expect.plan(2);

  var t = h.t(function () {
    return h('h1', 'Hello World!');
  });
  var domString = InfernoServer.renderToString(t());

  expect(domString).is.a('string');
  expect(domString).equals('<h1 data-inferno>Hello World!</h1>');

  end();
});

test('a tag with a number as the second argument', function () {
  var end = expect.plan(2);

  var t = h.t(function () {
    return h('h1', 5);
  });
  var domString = InfernoServer.renderToString(t());

  expect(domString).is.a('string');
  expect(domString).equals('<h1 data-inferno>5</h1>');

  end();
});

test('a tag with a number as the third argument', function () {
  var end = expect.plan(2);

  var t = h.t(function () {
    return h('h1', null, 5);
  });
  var domString = InfernoServer.renderToString(t());

  expect(domString).is.a('string');
  expect(domString).equals('<h1 data-inferno>5</h1>');

  end();
});

test('a tag with a `0` as the second argument', function () {
  var end = expect.plan(2);

  var t = h.t(function () {
    return h('h1', 0);
  });
  var domString = InfernoServer.renderToString(t());

  expect(domString).is.a('string');
  expect(domString).equals('<h1 data-inferno>0</h1>');

  end();
});

test('a tag with a children array as the third argument', function () {
  var end = expect.plan(2);

  var t = h.t(function () {
    return h('h1', null, [
      h('span'),
      h('span')
    ]);
  });
  var domString = InfernoServer.renderToString(t());

  expect(domString).is.a('string');
  expect(domString).equals('<h1 data-inferno><span></span><span></span></h1>');

  end();
});

test('a tag with a children array as the second argument', function () {
  var end = expect.plan(2);

  var t = h.t(function () {
    return h('h1', [
      h('span'),
      h('span')
    ]);
  });
  var domString = InfernoServer.renderToString(t());

  expect(domString).is.a('string');
  expect(domString).equals('<h1 data-inferno><span></span><span></span></h1>');

  end();
});
