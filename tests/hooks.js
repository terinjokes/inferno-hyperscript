'use strict';
const h = require('..');
const Inferno = require('inferno');
const InfernoServer = require('inferno-server');
const assign = require('lodash/fp/assign');
const test = require('ava');

const createVNode = assign(Inferno.createVNode());

test('a tag with a hook', t => {
  function onCreated() {

  }

  let hnode = h('h1', {
    onCreated: onCreated
  }, 'Hello World!');
  t.deepEqual(hnode, createVNode({
    tag: 'H1',
    hooks: {
      created: onCreated
    },
    children: 'Hello World!'
  }));

  let domString = InfernoServer.renderToString(hnode);

  t.true(typeof domString === 'string');
  t.true(domString === '<H1>Hello World!</H1>');
});

test('a tag with a hook (2)', t => {
  function onDidUpdate() {

  }

  let hnode = h('h1', {
    onDidUpdate: onDidUpdate
  }, 'Hello World!');
  t.deepEqual(hnode, createVNode({
    tag: 'H1',
    hooks: {
      didUpdate: onDidUpdate
    },
    children: 'Hello World!'
  }));

  let domString = InfernoServer.renderToString(hnode);

  t.true(typeof domString === 'string');
  t.true(domString === '<H1>Hello World!</H1>');
});
