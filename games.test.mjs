import {test} from 'node:test';
import assert from 'node:assert/strict';
import {gapIndices} from './games.mjs';
test('basic modes hide final word',()=>{for(const mode of [1,2,3])assert.deepEqual(gapIndices(['a','b','c'],mode),[2])});
test('expert and timed modes hide alternating words',()=>{for(const mode of [4,10])assert.deepEqual(gapIndices(['a','b','c','d'],mode),[1,3])});
test('empty input has no gaps',()=>assert.deepEqual(gapIndices([],1),[]));
test('single word basic exercise',()=>assert.deepEqual(gapIndices(['a'],2),[0]));

import { answerOptions } from './games.mjs';
test('options contain correct answer and no case duplicates',()=>{const options=answerOptions('Light',['light','ROAD','road','wind','sky'],()=>0);assert.equal(options.length,4);assert.equal(new Set(options.map(x=>x.toLowerCase())).size,4);assert.ok(options.includes('Light'))});
test('small vocabulary does not invent answers',()=>assert.deepEqual(answerOptions('light',['LIGHT'],()=>0),['light']));

import { scrambleExercise } from './games.mjs';
test('phrase scramble preserves answer and words',()=>assert.deepEqual(scrambleExercise(['I','sing'],5,()=>0),{answer:'I sing',prompt:'sing / I'}));
test('word scramble preserves letters',()=>assert.deepEqual(scrambleExercise(['I','sing'],6,()=>0),{answer:'sing',prompt:'i n g s'}));
test('empty scramble is safe',()=>assert.deepEqual(scrambleExercise([],6),{answer:'',prompt:''}));
