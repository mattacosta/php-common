/**
 * Copyright 2017 Matt Acosta
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

import * as assert from 'assert';

import {
  Event,
  EventArgs,
  IEventHandler
} from '../../../src/common/Event';

function handler(sender: any, args: EventArgs) {}

function secondHandler(sender: any, args: EventArgs) {}

/**
 * An event that exposes `Event<T>` properties.
 */
class TestEvent<T> extends Event<T> {

  public get eventContexts(): any[] {
    return this.contexts;
  }

  public get eventHandlers(): IEventHandler<T>[] {
    return this.handlers;
  }

}

/**
 * A context for use with an event handler.
 */
class TestContext {

  public i = 0;

  public handler(sender: any, args: EventArgs) {
    this.i++;
  }

}

describe('Event', function() {

  describe('#addHandler', function() {
    it('should add a handler', () => {
      let event = new TestEvent<EventArgs>();
      event.addHandler(handler);
      assert.strictEqual(event.eventHandlers[0], handler, 'handler was not added');
      assert.strictEqual(event.eventContexts[0], void 0, 'context was not added');

      event.addHandler(handler);
      assert.equal(event.eventHandlers.length, 1, 'same handler was added');
      assert.equal(event.eventContexts.length, 1, 'context was added');
    });
    it('should add a handler with context', () => {
      let event = new TestEvent<EventArgs>();
      event.addHandler(handler, 1);
      assert.strictEqual(event.eventHandlers[0], handler, 'handler was not added');
      assert.strictEqual(event.eventContexts[0], 1, 'context was not added');

      event.addHandler(handler, 1);
      assert.equal(event.eventHandlers.length, 1, 'handler with same context was added');
      assert.equal(event.eventContexts.length, 1, 'context was added');
    });
    it('should add the same handler if the contexts are not equal', () => {
      let event = new TestEvent<EventArgs>();
      event.addHandler(handler, 1);
      event.addHandler(handler, 2);
      assert.strictEqual(event.eventHandlers[0], handler);
      assert.strictEqual(event.eventHandlers[1], handler);
      assert.strictEqual(event.eventContexts[0], 1);
      assert.strictEqual(event.eventContexts[1], 2);
    });
    it('should add multiple handlers', () => {
      let event = new TestEvent<EventArgs>();
      event.addHandler(handler);
      event.addHandler(secondHandler);
      assert.strictEqual(event.eventHandlers[0], handler);
      assert.strictEqual(event.eventHandlers[1], secondHandler);
    });
  });

  describe('#removeHandler()', function() {
    it('should remove a handler', () => {
      let event = new TestEvent<EventArgs>();
      event.addHandler(handler);

      event.removeHandler(handler);
      assert.equal(event.eventHandlers.length, 0, 'handler was not removed');
      assert.equal(event.eventContexts.length, 0, 'context was not removed');
    });
    it('should remove a handler with context', () => {
      let event = new TestEvent<EventArgs>();
      event.addHandler(handler, 1);

      event.removeHandler(handler);
      assert.equal(event.eventHandlers.length, 1, 'handler with different context was removed');
      event.removeHandler(handler, 1);
      assert.equal(event.eventHandlers.length, 0, 'handler with same context was not removed');
    });
    it('should only remove a handler with the same context', () => {
      let event = new TestEvent<EventArgs>();
      event.addHandler(handler, 1);
      event.addHandler(handler, 2);

      event.removeHandler(handler, 1);
      assert.strictEqual(event.eventHandlers[0], handler);
      assert.strictEqual(event.eventContexts[0], 2);
    });
  });

  describe('#trigger()', function() {
    it('should invoke a handler', () => {
      let i = 0;
      let event = new TestEvent<EventArgs>();
      event.addHandler(() => { i++; });
      event.trigger(null, new EventArgs());
      assert.equal(i, 1);
    });
    it('should invoke a handler with a context', () => {
      let context = new TestContext();
      let event = new TestEvent<EventArgs>();

      // If called without a context, `context.i` will be undefined.
      event.addHandler(context.handler);
      assert.throws(() => { event.trigger(null, new EventArgs()); });
      event.removeHandler(context.handler);

      event.addHandler(context.handler, context);
      event.trigger(null, new EventArgs());
      assert.equal(context.i, 1);
    });
  });

});
