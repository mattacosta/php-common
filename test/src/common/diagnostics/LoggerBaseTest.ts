/**
 * Copyright 2018 Matt Acosta
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

import { LoggerBase } from '../../../../src/common/diagnostics/Logger';
import { LogLevel } from '../../../../src/common/diagnostics/LogLevel';

class TestLoggerBase extends LoggerBase {

  public severity: LogLevel = LogLevel.Trace;

  public log(severity: LogLevel, message: string, ...args: any[]) {
    this.severity = severity;
  }

  public static format(template: string, ...values: any[]): string {
    return LoggerBase.format(template, ...values);
  }

}

class TestObject {

  public toString() {
    return '3.14';
  }

}

describe('LoggerBase', function() {

  const logger = new TestLoggerBase();

  describe('#error()', function() {
    it('should log with error severity', () => {
      logger.error('error');
      assert.strictEqual(logger.severity, LogLevel.Error);
    });
  });

  describe('#warn()', function() {
    it('should log with warning severity', () => {
      logger.warn('warn');
      assert.strictEqual(logger.severity, LogLevel.Warning);
    });
  });

  describe('#info()', function() {
    it('should log with information severity', () => {
      logger.info('info');
      assert.strictEqual(logger.severity, LogLevel.Information);
    });
  })

  describe('#format()', function() {
    it('should format value as a string', () => {
      assert.strictEqual(TestLoggerBase.format('%s', '15'), '15', 'string with int as string');
      assert.strictEqual(TestLoggerBase.format('%s', '1.5'), '1.5', 'string with float as string');
      assert.strictEqual(TestLoggerBase.format('%s', '0xf'), '0xf', 'string with hex as string');
      assert.strictEqual(TestLoggerBase.format('%s', 1), '1', 'int as string');
      assert.strictEqual(TestLoggerBase.format('%s', 1.5), '1.5', 'float as string');
      assert.strictEqual(TestLoggerBase.format('%s', 0xF), '15', 'hex as string');
      assert.strictEqual(TestLoggerBase.format('%s', {}), '[object Object]', 'object as string');
      assert.strictEqual(TestLoggerBase.format('%s', new TestObject()), '3.14', 'object with toString() as string');
    });
    it('should format value as an integer', () => {
      assert.strictEqual(TestLoggerBase.format('%d', '15'), '15', 'string with int as int');
      assert.strictEqual(TestLoggerBase.format('%d', '1.5'), '1', 'string with float as int');
      assert.strictEqual(TestLoggerBase.format('%d', '0xf'), '15', 'string with hex as int');
      assert.strictEqual(TestLoggerBase.format('%d', 'abc'), 'NaN', 'string as int');
      assert.strictEqual(TestLoggerBase.format('%d', 1), '1', 'int as int');
      assert.strictEqual(TestLoggerBase.format('%d', 1.5), '1', 'float as int');
      assert.strictEqual(TestLoggerBase.format('%d', 0xF), '15', 'hex as int');
      assert.strictEqual(TestLoggerBase.format('%d', {}), 'NaN', 'object as int');
      assert.strictEqual(TestLoggerBase.format('%d', new TestObject()), '3', 'object with toString() as int');
    });
    it('should format value as a hexadecimal number', () => {
      assert.strictEqual(TestLoggerBase.format('%x', '15'), 'f', 'string with int as hex');
      assert.strictEqual(TestLoggerBase.format('%x', '1.5'), '1', 'string with float as hex');
      assert.strictEqual(TestLoggerBase.format('%x', '0xf'), 'f', 'string with hex as hex');
      assert.strictEqual(TestLoggerBase.format('%x', 'abc'), 'NaN', 'string as hex');
      assert.strictEqual(TestLoggerBase.format('%x', 15), 'f', 'int as hex');
      assert.strictEqual(TestLoggerBase.format('%x', 1.5), '1', 'float as hex');
      assert.strictEqual(TestLoggerBase.format('%x', 0xF), 'f', 'hex as hex');
      assert.strictEqual(TestLoggerBase.format('%x', {}), 'NaN', 'object as hex');
      assert.strictEqual(TestLoggerBase.format('%x', new TestObject()), '3', 'object with toString() as hex');
    });
    it('should format value as a float', () => {
      assert.strictEqual(TestLoggerBase.format('%f', '15'), '15', 'string with int as float');
      assert.strictEqual(TestLoggerBase.format('%f', '1.5'), '1.5', 'string with float as float');
      assert.strictEqual(TestLoggerBase.format('%f', '0xf'), '0', 'string with hex as float');
      assert.strictEqual(TestLoggerBase.format('%f', 'abc'), 'NaN', 'string as float');
      assert.strictEqual(TestLoggerBase.format('%f', 1), '1', 'int as float');
      assert.strictEqual(TestLoggerBase.format('%f', 1.5), '1.5', 'float as float');
      assert.strictEqual(TestLoggerBase.format('%f', 0xF), '15', 'hex as float');
      assert.strictEqual(TestLoggerBase.format('%f', {}), 'NaN', 'object as float');
      assert.strictEqual(TestLoggerBase.format('%f', new TestObject()), '3.14', 'object with toString() as float');
    });
    it('should replace multiple placeholders', () => {
      assert.strictEqual(TestLoggerBase.format('%s %s %d', 'abc', 'def', 123), 'abc def 123');
    });
  });

});
