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

import { IDisposable } from './Object';

/**
 * Defines an interface for event callbacks.
 */
export interface IEventHandler<TEventArgs> {

  (sender: any, args: TEventArgs): any;

}

/**
 * Defines an interface for objects that can modify a list of event subscribers.
 */
export interface IEvent<TEventArgs> {

  /**
   * Adds a function to be called when this event is triggered.
   *
   * All event handlers are executed synchonously and in the order that they
   * were added. If an event handler can be executed asynchronously, then it
   * should use `setImmediate()` or `process.nextTick()` methods.
   *
   * @param {IEventHandler<TEventArgs>} handler
   *   The event handler to add.
   * @param {*} context
   *   The value of `this` to use when invoking the event handler.
   */
  addHandler(handler: IEventHandler<TEventArgs>, context?: any): void;

  /**
   * Removes a function from the event handlers associated with this event.
   *
   * @param {IEventHandler<TEventArgs>} handler
   *   The event handler to remove.
   * @param {*} context
   *   The value of `this` to use when invoking the event handler.
   */
  removeHandler(handler: IEventHandler<TEventArgs>, context?: any): void;

}

/**
 * Defines an interface for objects that need to dispatch events.
 */
export interface IEventEmitter<TEventArgs> extends IDisposable, IEvent<TEventArgs> {

  /**
   * Executes all subscribed event handlers.
   *
   * @param {*} sender
   *   The event sender.
   * @param {TEventArgs} args
   *   An object containing event arguments.
   */
  trigger(sender: any, args: TEventArgs): void;

}

/**
 * A generic event argument.
 */
export class EventArgs {}

/**
 * Allows a providing class to implement events that an observer can subscribe
 * to. When triggered, the subscribing handler is provided with the sender and
 * any custom event arguments.
 */
export class Event<TEventArgs> implements IEventEmitter<TEventArgs> {

  /**
   * A list of contexts used when invoking an event handler.
   */
  protected contexts: any[] = [];

  /**
   * A list of subscribed event handlers.
   */
  protected handlers: IEventHandler<TEventArgs>[] = [];

  /**
   * @inheritDoc
   */
  public addHandler(handler: IEventHandler<TEventArgs>, context?: any) {
    // Make sure that event handlers are not added multiple times.
    for (let i = 0; i < this.handlers.length; i++) {
      if (this.handlers[i] === handler && this.contexts[i] === context) {
        return;
      }
    }
    this.contexts.push(context);
    this.handlers.push(handler);
  }

  /**
   * @inheritDoc
   */
  public removeHandler(handler: IEventHandler<TEventArgs>, context?: any) {
    for (let i = 0; i < this.handlers.length; i++) {
      // Fun fact: You can't remove a handler if its context was NaN.
      if (this.handlers[i] === handler && this.contexts[i] === context) {
        this.contexts.splice(i, 1);
        this.handlers.splice(i, 1);
        break;
      }
    }
  }

  /**
   * @inheritDoc
   */
  public trigger(sender: any, args: TEventArgs) {
    for (let i = 0; i < this.handlers.length; i++) {
      // @todo This does not handle the case where a handler tries to trigger
      //   the same event again (the second event would be executed before the
      //   first is complete).
      this.handlers[i].call(this.contexts[i], sender, args);
    }
  }

  /**
   * Releases all references to event handlers.
   */
  public dispose() {
    this.contexts = [];
    this.handlers = [];
  }

}
