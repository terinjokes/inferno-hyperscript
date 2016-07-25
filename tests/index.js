'use strict';
const h = require('..');
const Inferno = require('inferno');
const InfernoServer = require('inferno-server');
const assign = require('lodash/fp/assign');
const test = require('ava');

const createVNode = assign(Inferno.createVNode());

test('an html tag', t => {
  let hnode = h('h1');
  t.deepEqual(hnode, createVNode({
    tag: 'H1'
  }));

  let domString = InfernoServer.renderToString(hnode);

  t.true(typeof domString === 'string');
  t.true(domString === '<H1></H1>');
});

test('a tag with an id and classes in the selector', t => {
  let hnode = h('h1#boom.whatever.foo');
  t.deepEqual(hnode, createVNode({
    tag: 'H1',
    attrs: {
      id: 'boom'
    },
    className: 'whatever foo'
  }));

  let domString = InfernoServer.renderToString(hnode);

  t.true(typeof domString === 'string');
  t.true(domString === '<H1 class="whatever foo" id="boom"></H1>');
});

test('a tag with classes in the selector and props', t => {
  let hnode = h('h1.foo', {
    className: 'bar'
  });
  t.deepEqual(hnode, createVNode({
    tag: 'H1',
    className: 'foo bar'
  }));

  let domString = InfernoServer.renderToString(hnode);

  t.true(typeof domString === 'string');
  t.true(domString === '<H1 class="foo bar"></H1>');
});

test('a tag with other properties', t => {
  let hnode = h('a', {
    href: 'http://www.google.com'
  });
  t.deepEqual(hnode, createVNode({
    tag: 'A',
    attrs: {
      href: 'http://www.google.com'
    }
  }));

  let domString = InfernoServer.renderToString(hnode);

  t.true(typeof domString === 'string');
  t.true(domString === '<A href="http://www.google.com"></A>');
});

test('a tag with a string as the third argument', t => {
  let hnode = h('h1', null, 'Hello World!');
  t.deepEqual(hnode, createVNode({
    tag: 'H1',
    children: 'Hello World!'
  }));

  let domString = InfernoServer.renderToString(hnode);

  t.true(typeof domString === 'string');
  t.true(domString === '<H1>Hello World!</H1>');
});

test('a tag with a string as the second argument', t => {
  let hnode = h('h1', 'Hello World!');
  t.deepEqual(hnode, createVNode({
    tag: 'H1',
    children: 'Hello World!'
  }));

  let domString = InfernoServer.renderToString(hnode);

  t.true(typeof domString === 'string');
  t.true(domString === '<H1>Hello World!</H1>');
});

test('a tag with a number as the second argument', t => {
  let hnode = h('h1', 5);
  t.deepEqual(hnode, createVNode({
    tag: 'H1',
    children: 5
  }));

  let domString = InfernoServer.renderToString(hnode);

  t.true(typeof domString === 'string');
  t.true(domString === '<H1>5</H1>');
});

test('a tag with a number as the third argument', t => {
  let hnode = h('h1', null, 5);
  t.deepEqual(hnode, createVNode({
    tag: 'H1',
    children: 5
  }));

  let domString = InfernoServer.renderToString(hnode);

  t.true(typeof domString === 'string');
  t.true(domString === '<H1>5</H1>');
});

test('a tag with a `0` as the second argument', t => {
  let hnode = h('h1', 0);
  t.deepEqual(hnode, createVNode({
    tag: 'H1',
    children: 0
  }));

  let domString = InfernoServer.renderToString(hnode);

  t.true(typeof domString === 'string');
  t.true(domString === '<H1>0</H1>');
});

test('a tag with a children array as the third argument', t => {
  let hnode = h('h1', null, [
    h('span'),
    h('span')
  ]);
  t.deepEqual(hnode, createVNode({
    tag: 'H1',
    children: [
      createVNode({
        tag: 'SPAN'
      }),
      createVNode({
        tag: 'SPAN'
      })
    ]
  }));

  let domString = InfernoServer.renderToString(hnode);

  t.true(typeof domString === 'string');
  t.true(domString === '<H1><SPAN></SPAN><SPAN></SPAN></H1>');
});

test('a tag with a children array as the second argument', t => {
  let hnode = h('h1', [
    h('span'),
    h('span')
  ]);
  t.deepEqual(hnode, createVNode({
    tag: 'H1',
    children: [
      createVNode({
        tag: 'SPAN'
      }),
      createVNode({
        tag: 'SPAN'
      })
    ]
  }));

  let domString = InfernoServer.renderToString(hnode);

  t.true(typeof domString === 'string');
  t.true(domString === '<H1><SPAN></SPAN><SPAN></SPAN></H1>');
});

test('a tag with key', t => {
  let hnode = h('h1', {
    key: 'foobar'
  }, 'Hello World!');
  t.deepEqual(hnode, createVNode({
    tag: 'H1',
    key: 'foobar',
    children: 'Hello World!'
  }));

  let domString = InfernoServer.renderToString(hnode);

  t.true(typeof domString === 'string');
  t.true(domString === '<H1>Hello World!</H1>');
});

test('a tag with an event', t => {
  function onHover() {

  }

  let hnode = h('h1', {
    onHover: onHover
  }, 'Hello World!');
  t.deepEqual(hnode, createVNode({
    tag: 'H1',
    events: {
      onhover: onHover
    },
    children: 'Hello World!'
  }));

  let domString = InfernoServer.renderToString(hnode);

  t.true(typeof domString === 'string');
  t.true(domString === '<H1>Hello World!</H1>');
});

test('a tag with style', t => {
  let hnode = h('h1', {
    style: {
      color: '#FFF'
    }
  }, 'Hello World!');
  t.deepEqual(hnode, createVNode({
    tag: 'H1',
    style: {
      color: '#FFF'
    },
    children: 'Hello World!'
  }));

  let domString = InfernoServer.renderToString(hnode);

  t.true(typeof domString === 'string');
  t.true(domString === '<H1 style="color:#FFF;">Hello World!</H1>');
});

test('a basic Component', t => {
  function Component(place) {
    return h('div.example', `Hello ${place}!`);
  }

  function DidUpdate() {

  }

  let hnode = h(Component, {
    place: 'world',
    onComponentDidUpdate: DidUpdate
  });
  t.deepEqual(hnode, createVNode({
    tag: Component,
    attrs: {
      place: 'world'
    },
    hooks: {
      componentDidUpdate: DidUpdate
    }
  }));
});
