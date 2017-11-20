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
 * Defines an interface for objects that need to dispatch events.
 */
export interface IEvent<TEventArgs> extends IDisposable {

  addHandler(handler: IEventHandler<TEventArgs>): void;

  removeHandler(handler: IEventHandler<TEventArgs>): void;

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
export class Event<TEventArgs> implements IEvent<TEventArgs> {

  /**
   * A list of subscribed event handlers.
   */
  protected handlers: IEventHandler<TEventArgs>[] = [];

  /**
   * Adds a function to be called when this event is triggered.
   *
   * All event handlers are executed synchonously and in the order that they
   * were added. If an event handler can be executed asynchronously, then it
   * should use `setImmediate()` or `process.nextTick()` methods.
   *
   * @param {IEventHandler<TEventArgs>} handler
   *   The event handler to add.
   */
  public addHandler(handler: IEventHandler<TEventArgs>) {
    // Make sure that event handlers are not added multiple times.
    for (let i = 0; i < this.handlers.length; i++) {
      if (this.handlers[i] === handler) {
        return;
      }
    }
    // @todo If this list gets too long, then there is probably a leak
    // somewhere. Log a warning?
    this.handlers.push(handler);
  }

  /**
   * Removes a function from the event handlers associated with this event.
   *
   * @param {IEventHandler<TEventArgs>} handler
   *   The event handler to remove.
   */
  public removeHandler(handler: IEventHandler<TEventArgs>) {
    for (let i = 0; i < this.handlers.length; i++) {
      if (this.handlers[i] === handler) {
        this.handlers.splice(i, 1);
        break;
      }
    }
  }

  /**
   * Executes all subscribed event handlers.
   *
   * @param {*} sender
   *   The event sender.
   * @param {TEventArgs} args
   *   An object containing event arguments.
   */
  public trigger(sender: any, args: TEventArgs) {
    for (let i = 0; i < this.handlers.length; i++) {
      // @todo This does not handle the case where a handler tries to trigger
      //   the same event again (the second event would be executed before the
      //   first is complete).
      this.handlers[i](sender, args);
    }
  }

  /**
   * Releases all references to event handlers.
   */
  public dispose() {
    this.handlers = [];
  }

}
