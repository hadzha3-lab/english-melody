import {test} from 'node:test';
import assert from 'node:assert/strict';
import {gapIndices} from './games.mjs';
test('basic modes hide final word',()=>{for(const mode of [1,2,3])assert.deepEqual(gapIndices(['a','b','c'],mode),[2])});
test('expert and timed modes hide alternating words',()=>{for(const mode of [4,10])assert.deepEqual(gapIndices(['a','b','c','d'],mode),[1,3])});
test('empty input has no gaps',()=>assert.deepEqual(gapIndices([],1),[]));
test('single word basic exercise',()=>assert.deepEqual(gapIndices(['a'],2),[0]));
