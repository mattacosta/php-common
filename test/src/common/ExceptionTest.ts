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

import { Exception } from '../../../src/common/Exception';

describe('Exception', function() {

  describe('#constructor()', function() {
    let ex = new Exception('test');
    it('should be instance of built-in Error class', function() {
      assert(ex instanceof Error);
    });
    it('should be instance of Exception class', function() {
      assert(ex instanceof Exception);
    });
    it('name property should match class name', function() {
      assert.strictEqual(ex.name, 'Exception');
    });
  });

  describe('#toString()', function() {
    it('should contain class name', function() {
      let ex = new Exception();
      assert.strictEqual(ex.toString(), 'Exception');
    });
    it('should contain class name and message', function() {
      let ex = new Exception('message');
      assert.strictEqual(ex.toString(), 'Exception: message');
    });
  });

  describe('#stack', function() {
    /**
     * Throws an exception (to give it a known stack frame to test).
     */
    function rethrow() {
      throw new Exception();
    }

    let ex: Exception;
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
      assert.strictEqual(stack[0], 'Exception');
    });
    it('first stack frame should be function where exception was thrown', function() {
      assert.strictEqual(stack[1].indexOf('at rethrow'), 4);
    });
  });

});
