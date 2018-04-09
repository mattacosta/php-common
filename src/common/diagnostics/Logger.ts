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

import { LogLevel } from './LogLevel';

/**
 * Defines an interface for objects that can log messages.
 */
export interface ILogger {

  /**
   * Logs an error message.
   *
   * @param {string} message
   *   The log message.
   * @param {...any} args
   *   Any additional log arguments.
   */
  error(message: string, ...args: any[]): void;

  /**
   * Logs an informational message.
   *
   * @param {string} message
   *   The log message.
   * @param {...any} args
   *   Any additional log arguments.
   */
  info(message: string, ...args: any[]): void;

  /**
   * Logs a warning message.
   *
   * @param {string} message
   *   The log message.
   * @param {...any} args
   *   Any additional log arguments.
   */
  warn(message: string, ...args: any[]): void;

  /**
   * Logs a message using the given severity level.
   *
   * @param {LogLevel} severity
   *   The severity of the log entry.
   * @param {string} message
   *   The log message.
   * @param {...any} args
   *   Any additional log arguments.
   */
  log(severity: LogLevel, message: string, ...args: any[]): void;

}

/**
 * A base class for logging messages.
 */
export abstract class LoggerBase implements ILogger {

  /**
   * @inheritDoc
   */
  public error(message: string, ...args: any[]) {
    this.log(LogLevel.Error, message, ...args);
  }

  /**
   * @inheritDoc
   */
  public info(message: string, ...args: any[]) {
    this.log(LogLevel.Information, message, ...args);
  }

  /**
   * @inheritDoc
   */
  public warn(message: string, ...args: any[]): void {
    this.log(LogLevel.Warning, message, ...args);
  }

  /**
   * @inheritdoc
   */
  public abstract log(severity: LogLevel, message: string, ...args: any[]): void;

}

/**
 * A fallback logger that does nothing.
 */
export class NullLogger extends LoggerBase {

  /**
   * @inheritDoc
   */
  public log(level: LogLevel, message: string, ...args: any[]) {
    // Do nothing.
  }

}
