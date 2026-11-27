import {test} from 'node:test';
import assert from 'node:assert/strict';
import {shuffle} from './shuffle.mjs';
test('does not mutate input',()=>{const a=[1,2,3];shuffle(a);assert.deepEqual(a,[1,2,3]);});
test('preserves elements',()=>assert.deepEqual(shuffle([1,2,2]).sort(),[1,2,2]));
test('handles empty and singleton arrays',()=>{assert.deepEqual(shuffle([]),[]);assert.deepEqual(shuffle([1]),[1]);});
test('supports deterministic random source',()=>assert.deepEqual(shuffle([1,2,3],()=>0),[2,3,1]));
