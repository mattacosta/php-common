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
  EventArgs,
  EventEmitter,
  IEventHandler
} from '../../../src/common/Event';

function handler(sender: any, args: EventArgs) {}

/**
 * An event that exposes `EventEmitter<T>` properties.
 */
class TestEventEmitter<T> extends EventEmitter<T> {

  public get eventHandlers(): Map<IEventHandler<T>, Set<any>> {
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

function assertHandlerAndContext<T>(handlers: Map<IEventHandler<T>, Set<any>>, handler: IEventHandler<T>, context: any) {
  assert.strictEqual(handlers.has(handler), true, 'missing event handler');
  const contexts = handlers.get(handler)!;
  assert.strictEqual(contexts.has(context), true, 'missing context');
}

describe('Event', function() {

  describe('#addHandler', function() {
    it('should add a handler', () => {
      let event = new TestEventEmitter<EventArgs>();
      event.addHandler(handler);
      assertHandlerAndContext(event.eventHandlers, handler, undefined);
    });
    it('should add a handler with context', () => {
      let event = new TestEventEmitter<EventArgs>();
      event.addHandler(handler, 1);
      assertHandlerAndContext(event.eventHandlers, handler, 1);
    });
    it('should add multiple handlers', () => {
      let event = new TestEventEmitter<EventArgs>();
      let secondHandler = (sender: any, args: EventArgs) => {};
      event.addHandler(handler);
      event.addHandler(secondHandler);
      assertHandlerAndContext(event.eventHandlers, handler, undefined);
      assertHandlerAndContext(event.eventHandlers, secondHandler, undefined);
    });
    it('should add multiple contexts', () => {
      let event = new TestEventEmitter<EventArgs>();
      event.addHandler(handler, 1);
      event.addHandler(handler, 2);
      assertHandlerAndContext(event.eventHandlers, handler, 1);
      assertHandlerAndContext(event.eventHandlers, handler, 2);
    });
  });

  describe('#removeHandler()', function() {
    it('should remove a handler', () => {
      let event = new TestEventEmitter<EventArgs>();
      event.addHandler(handler);
      event.removeHandler(handler);
      assert.strictEqual(event.eventHandlers.has(handler), false, 'handler was not removed');
    });
    it('should remove a handler with context (single context)', () => {
      let event = new TestEventEmitter<EventArgs>();
      event.addHandler(handler, 1);
      event.removeHandler(handler, 1);
      assert.strictEqual(event.eventHandlers.has(handler), false, 'handler was not removed');
    });
    it('should remove a handler with context (multiple contexts)', () => {
      let event = new TestEventEmitter<EventArgs>();
      event.addHandler(handler, 1);
      event.addHandler(handler, 2);
      event.removeHandler(handler, 2);
      assertHandlerAndContext(event.eventHandlers, handler, 1);
      let contexts = event.eventHandlers.get(handler)!;
      assert.strictEqual(contexts.has(2), false, 'context was not removed');
    });
  });

  describe('#trigger()', function() {
    it('should invoke a handler', () => {
      let i = 0;
      let event = new TestEventEmitter<EventArgs>();
      event.addHandler((sender: any, args: EventArgs) => { i++; });
      event.trigger(null, EventArgs.Empty);
      assert.strictEqual(i, 1);
    });
    it('should invoke a handler with a context', () => {
      let context = new TestContext();
      let event = new TestEventEmitter<EventArgs>();

      // When called without a context, the handler will try to increment
      // `undefined.i`, which will cause an exception to be thrown.
      event.addHandler(context.handler);
      assert.throws(() => { event.trigger(null, EventArgs.Empty); });
      event.removeHandler(context.handler);

      event.addHandler(context.handler, context);
      event.trigger(null, EventArgs.Empty);
      assert.strictEqual(context.i, 1);
    });
    it('should not change handlers during event', () => {
      let x = 0, y = 0;
      let event = new TestEventEmitter<EventArgs>();
      let secondHandler = (sender: any, args: EventArgs) => { y++; };
      let firstHandler = (sender: any, args: EventArgs) => {
        x++;
        event.removeHandler(secondHandler);
      };
      event.addHandler(firstHandler);
      event.addHandler(secondHandler);
      event.trigger(null, EventArgs.Empty);
      assert.strictEqual(x, 1, 'must run first handler');
      assert.strictEqual(y, 1, 'must run second handler');
    });
  });

});
