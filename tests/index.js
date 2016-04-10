'use strict';
var h = require('..');
var InfernoServer = require('inferno-server');
var test = require('ava');
var expect = require('assume');

test('an html tag', function () {
  var end = expect.plan(3);

  var t = h('h1');
  expect(t).eqls({
    dom: null,
    tag: 'H1',
    key: null,
    attrs: null,
    events: null,
    hooks: null,
    className: null,
    style: null,
    children: undefined,
    instance: null
  });

  var domString = InfernoServer.renderToString(t);

  expect(domString).is.a('string');
  expect(domString).equals('<H1></H1>');
  end();
});

test('a tag with an id and classes in the selector', function () {
  var end = expect.plan(3);

  var t = h('h1#boom.whatever.foo');
  expect(t).eqls({
    dom: null,
    tag: 'H1',
    key: null,
    attrs: {
      id: 'boom'
    },
    events: null,
    hooks: null,
    className: 'whatever foo',
    style: null,
    children: undefined,
    instance: null
  });

  var domString = InfernoServer.renderToString(t);

  expect(domString).is.a('string');
  expect(domString).equals('<H1 class="whatever foo" id="boom"></H1>');

  end();
});

test('a tag with classes in the selector and props', function () {
  var end = expect.plan(3);

  var t = h('h1.foo', {
    className: 'bar'
  });
  expect(t).eqls({
    dom: null,
    tag: 'H1',
    key: null,
    attrs: null,
    events: null,
    hooks: null,
    className: 'foo bar',
    style: null,
    children: undefined,
    instance: null
  });

  var domString = InfernoServer.renderToString(t);

  expect(domString).is.a('string');
  expect(domString).equals('<H1 class="foo bar"></H1>');

  end();
});

test('a tag with other properties', function () {
  var end = expect.plan(3);

  var t = h('a', {
    href: 'http://www.google.com'
  });
  expect(t).eqls({
    dom: null,
    tag: 'A',
    key: null,
    attrs: {
      href: 'http://www.google.com'
    },
    events: null,
    hooks: null,
    className: null,
    style: null,
    children: undefined,
    instance: null
  });

  var domString = InfernoServer.renderToString(t);

  expect(domString).is.a('string');
  expect(domString).equals('<A href="http://www.google.com"></A>');

  end();
});

test('a tag with a string as the third argument', function () {
  var end = expect.plan(3);

  var t = h('h1', null, 'Hello World!');
  expect(t).eqls({
    dom: null,
    tag: 'H1',
    key: null,
    attrs: null,
    events: null,
    hooks: null,
    className: null,
    style: null,
    children: 'Hello World!',
    instance: null
  });

  var domString = InfernoServer.renderToString(t);

  expect(domString).is.a('string');
  expect(domString).equals('<H1>Hello World!</H1>');

  end();
});

test('a tag with a string as the second argument', function () {
  var end = expect.plan(3);

  var t = h('h1', 'Hello World!');
  expect(t).eqls({
    dom: null,
    tag: 'H1',
    key: null,
    attrs: null,
    events: null,
    hooks: null,
    className: null,
    style: null,
    children: 'Hello World!',
    instance: null
  });

  var domString = InfernoServer.renderToString(t);

  expect(domString).is.a('string');
  expect(domString).equals('<H1>Hello World!</H1>');

  end();
});

test('a tag with a number as the second argument', function () {
  var end = expect.plan(3);

  var t = h('h1', 5);
  expect(t).eqls({
    dom: null,
    tag: 'H1',
    key: null,
    attrs: null,
    events: null,
    hooks: null,
    className: null,
    style: null,
    children: 5,
    instance: null
  });

  var domString = InfernoServer.renderToString(t);

  expect(domString).is.a('string');
  expect(domString).equals('<H1>5</H1>');

  end();
});

test('a tag with a number as the third argument', function () {
  var end = expect.plan(3);

  var t = h('h1', null, 5);
  expect(t).eqls({
    dom: null,
    tag: 'H1',
    key: null,
    attrs: null,
    events: null,
    hooks: null,
    className: null,
    style: null,
    children: 5,
    instance: null
  });

  var domString = InfernoServer.renderToString(t);

  expect(domString).is.a('string');
  expect(domString).equals('<H1>5</H1>');

  end();
});

test.skip('a tag with a `0` as the second argument', function () { // eslint-disable-line ava/no-skip-test
  var end = expect.plan(3);

  var t = h('h1', 0);
  expect(t).eqls({
    dom: null,
    tag: 'H1',
    key: null,
    attrs: null,
    events: null,
    hooks: null,
    className: null,
    style: null,
    children: 0,
    instance: null
  });

  var domString = InfernoServer.renderToString(t);

  expect(domString).is.a('string');
  expect(domString).equals('<H1>0</H1>');

  end();
});

test('a tag with a children array as the third argument', function () {
  var end = expect.plan(3);

  var t = h('h1', null, [
    h('span'),
    h('span')
  ]);
  expect(t).eqls({
    dom: null,
    tag: 'H1',
    key: null,
    attrs: null,
    events: null,
    hooks: null,
    className: null,
    style: null,
    children: [
      {
        dom: null,
        tag: 'SPAN',
        key: null,
        attrs: null,
        events: null,
        hooks: null,
        className: null,
        style: null,
        children: undefined,
        instance: null
      },
      {
        dom: null,
        tag: 'SPAN',
        key: null,
        attrs: null,
        events: null,
        hooks: null,
        className: null,
        style: null,
        children: undefined,
        instance: null
      }
    ],
    instance: null
  });

  var domString = InfernoServer.renderToString(t);

  expect(domString).is.a('string');
  expect(domString).equals('<H1><SPAN></SPAN><SPAN></SPAN></H1>');

  end();
});

test('a tag with a children array as the second argument', function () {
  var end = expect.plan(3);

  var t = h('h1', [
    h('span'),
    h('span')
  ]);
  expect(t).eqls({
    dom: null,
    tag: 'H1',
    key: null,
    attrs: null,
    events: null,
    hooks: null,
    className: null,
    style: null,
    children: [
      {
        dom: null,
        tag: 'SPAN',
        key: null,
        attrs: null,
        events: null,
        hooks: null,
        className: null,
        style: null,
        children: undefined,
        instance: null
      },
      {
        dom: null,
        tag: 'SPAN',
        key: null,
        attrs: null,
        events: null,
        hooks: null,
        className: null,
        style: null,
        children: undefined,
        instance: null
      }
    ],
    instance: null
  });

  var domString = InfernoServer.renderToString(t);

  expect(domString).is.a('string');
  expect(domString).equals('<H1><SPAN></SPAN><SPAN></SPAN></H1>');

  end();
});

test('a tag with key', function () {
  var end = expect.plan(3);

  var t = h('h1', {
    key: 'foobar'
  }, 'Hello World!');
  expect(t).eqls({
    dom: null,
    tag: 'H1',
    key: 'foobar',
    attrs: null,
    events: null,
    hooks: null,
    className: null,
    style: null,
    children: 'Hello World!',
    instance: null
  });

  var domString = InfernoServer.renderToString(t);

  expect(domString).is.a('string');
  expect(domString).equals('<H1>Hello World!</H1>');

  end();
});

test('a tag with an event', function () {
  var end = expect.plan(3);

  function onHover() {

  }

  var t = h('h1', {
    onHover: onHover
  }, 'Hello World!');
  expect(t).eqls({
    dom: null,
    tag: 'H1',
    key: null,
    attrs: null,
    events: {
      hover: onHover
    },
    hooks: null,
    className: null,
    style: null,
    children: 'Hello World!',
    instance: null
  });

  var domString = InfernoServer.renderToString(t);

  expect(domString).is.a('string');
  expect(domString).equals('<H1>Hello World!</H1>');

  end();
});

test('a tag with a hook', function () {
  var end = expect.plan(3);

  function onCreated() {

  }

  var t = h('h1', {
    onCreated: onCreated
  }, 'Hello World!');
  expect(t).eqls({
    dom: null,
    tag: 'H1',
    key: null,
    attrs: null,
    events: null,
    hooks: {
      created: onCreated
    },
    className: null,
    style: null,
    children: 'Hello World!',
    instance: null
  });

  var domString = InfernoServer.renderToString(t);

  expect(domString).is.a('string');
  expect(domString).equals('<H1>Hello World!</H1>');

  end();
});

test('a tag with style', function () {
  var end = expect.plan(3);

  var t = h('h1', {
    style: {
      color: '#FFF'
    }
  }, 'Hello World!');
  expect(t).eqls({
    dom: null,
    tag: 'H1',
    key: null,
    attrs: null,
    events: null,
    hooks: null,
    className: null,
    style: {
      color: '#FFF'
    },
    children: 'Hello World!',
    instance: null
  });

  var domString = InfernoServer.renderToString(t);

  expect(domString).is.a('string');
  expect(domString).equals('<H1>Hello World!</H1>');

  end();
});
