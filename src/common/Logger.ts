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

/**
 * Defines an interface for objects that can log messages.
 */
export interface ILogger {

  /**
   * Log an error message.
   *
   * @param {string} message
   *   The message to log.
   */
  error(message: string, ...args: any[]): void;

  /**
   * Log an informational message.
   *
   * @param {string} message
   *   The message to log.
   */
  info(message: string, ...args: any[]): void;

  /**
   * Log a notice.
   *
   * @param {string} message
   *   The message to log.
   */
  notice(message: string, ...args: any[]): void;

  /**
   * Log a warning.
   *
   * @param {string} message
   *   The message to log.
   */
  warn(message: string, ...args: any[]): void;

}

/**
 * A base class for logging messages.
 */
export abstract class LoggerBase implements ILogger {

  /**
   * @inheritDoc
   */
  public abstract error(message: string, ...args: any[]): void;

  /**
   * @inheritDoc
   */
  public abstract info(message: string, ...args: any[]): void;

  /**
   * @inheritDoc
   */
  public abstract notice(message: string, ...args: any[]): void;

  /**
   * @inheritDoc
   */
  public abstract warn(message: string, ...args: any[]): void;

}

/**
 * Logs messages to the console.
 */
export class ConsoleLogger extends LoggerBase {

  /**
   * @inheritDoc
   */
  public error(message: string, ...args: any[]) {
    console.error(message, ...args);
  }

  /**
   * @inheritDoc
   */
  public info(message: string, ...args: any[]) {
    console.log(message, ...args);
  }

  /**
   * @inheritDoc
   */
  public notice(message: string, ...args: any[]) {
    console.log(message, ...args);
  }

  /**
   * @inheritDoc
   */
  public warn(message: string, ...args: any[]) {
    console.warn(message, ...args);
  }

}

/**
 * A fallback logger that does nothing.
 */
export class NullLogger extends LoggerBase {

  /**
   * @inheritDoc
   */
  public error(message: string, ...args: any[]) {
    // Do nothing.
  }

  /**
   * @inheritDoc
   */
  public info(message: string, ...args: any[]) {
    // Do nothing.
  }

  /**
   * @inheritDoc
   */
  public notice(message: string, ...args: any[]) {
    // Do nothing.
  }

  /**
   * @inheritDoc
   */
  public warn(message: string, ...args: any[]) {
    // Do nothing.
  }

}
