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
  ArgumentException,
  Exception
} from '../../../src/common/Exception';

/**
 * Tests inheritance of the `Exception` class.
 */
describe('ArgumentException', function() {

  describe('#constructor()', function() {
    let ex = new ArgumentException('test');
    it('should be instance of built-in Error class', function() {
      assert(ex instanceof Error);
    });
    it('should be instance of Exception class', function() {
      assert(ex instanceof Exception);
    });
    it('should be instance of ArgumentException class', function() {
      assert(ex instanceof ArgumentException);
    })
    it('name property should match class name', function() {
      assert.equal(ex.name, 'ArgumentException');
    });
  });

  describe('#toString()', function() {
    it('should contain class name', function() {
      let ex = new ArgumentException();
      assert.strictEqual(ex.toString(), 'ArgumentException');
    });
    it('should contain class name and message', function() {
      let ex = new ArgumentException('message');
      assert.strictEqual(ex.toString(), 'ArgumentException: message');
    });
  });

  describe('#stack', function() {
    /**
     * Throws an exception (to give it a known stack frame to test).
     */
    function rethrow() {
      throw new ArgumentException();
    }

    let ex: ArgumentException;
    let stack: string[] = [];

    try {
      rethrow();
    }
    catch (e) {
      ex = e;
      if (ex.stack) {
        stack = ex.stack.split('\n');
      }
    }

    it('stack property should exist', function() {
      assert(ex.stack);
    });
    it('first line of stack trace should include class name', function() {
      assert.strictEqual(stack[0], 'ArgumentException');
    });
    it('first stack frame should be function where exception was thrown', function() {
      assert.strictEqual(stack[1].indexOf('at rethrow'), 4);
    });
  });

});
