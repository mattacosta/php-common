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
    const data: ReadonlyArray<number> = [1, 2, 4, 5];
    const predicate = (a: number, b: number) => {
      return a == b ? 0 : (a > b ? 1 : -1);
    };

    it('should return -1 for empty lists', () => {
      assert.strictEqual(List.binarySearch([], 1, predicate), -1);  // ~0 == -1
    });
    it('should return first index', () => {
      assert.strictEqual(List.binarySearch(data, 1, predicate), 0);
    });
    it('should return second index', () => {
      assert.strictEqual(List.binarySearch(data, 2, predicate), 1);
    });
    it('should return third index', () => {
      assert.strictEqual(List.binarySearch(data, 4, predicate), 2);
    });
    it('should return last index', () => {
      assert.strictEqual(List.binarySearch(data, 5, predicate), 3);
    });
    it('should return middle index', () => {
      assert.strictEqual(List.binarySearch([1, 2, 3, 4, 5], 3, predicate), 2);
    });
    it('should return two\'s complement of index if value is not found', () => {
      assert.strictEqual(List.binarySearch(data, 3, predicate), ~2);
    });
  });

  describe('#toMap()', function() {
    const data: ReadonlyArray<number> = [1, 2, 3, 4];
    const selector = (value: number): number => {
      switch (value) {
        case 1:
        case 2:
          return 0;
        case 3:
          return 4;
        case 4:
          return 3;
        default:
          return value;
      }
    };

    it('should map value to a key', () => {
      const map = List.toMap(data, selector);
      const values = map.get(4)!;
      assert.strictEqual(values[0], 3);
    });
    it('should map values with same key', () => {
      const map = List.toMap(data, selector);
      const values = map.get(0)!;
      assert.strictEqual(values[0], 1);
      assert.strictEqual(values[1], 2);
    });
  });

});
