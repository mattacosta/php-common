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

import { List } from '../../../../src/common/collections/List';

describe('List<T>', function() {

  describe('#binarySearch()', function() {
    const data = [1, 2, 4, 5];
    const predicate = (a: number, b: number) => {
      return a == b ? 0 : (a > b ? 1 : -1);
    };

    it('should return -1 for empty lists', () => {
      assert.equal(List.binarySearch([], 1, predicate), -1);  // ~0 == -1
    });
    it('should return first index', () => {
      assert.equal(List.binarySearch(data, 1, predicate), 0);
    });
    it('should return second index', () => {
      assert.equal(List.binarySearch(data, 2, predicate), 1);
    });
    it('should return third index', () => {
      assert.equal(List.binarySearch(data, 4, predicate), 2);
    });
    it('should return last index', () => {
      assert.equal(List.binarySearch(data, 5, predicate), 3);
    });
    it('should return middle index', () => {
      assert.equal(List.binarySearch([1, 2, 3, 4, 5], 3, predicate), 2);
    });
    it('should return two\'s complement of index if value is not found', () => {
      assert.equal(List.binarySearch(data, 3, predicate), ~2);
    });
  });

});
