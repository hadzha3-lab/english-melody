import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readProgress } from './progress.mjs';
const storage = (points, history) => ({getItem: key => key === 'melodyPoints' ? points : history});
test('valid saved progress', () => assert.deepEqual(readProgress(storage('20','[{"song":"A","mode":"B","score":"1/1"}]')), {points:20,history:[{song:'A',mode:'B',score:'1/1'}]}));
test('invalid numbers', () => {for(const value of ['NaN','Infinity','-1','1.5']) assert.equal(readProgress(storage(value,'[]')).points,0);});
test('invalid history', () => {for(const value of ['null','{}','bad','[null,1,{}]']) assert.deepEqual(readProgress(storage('0',value)).history,[]);});
test('unavailable storage', () => assert.deepEqual(readProgress({getItem(){throw Error('blocked')}}),{points:0,history:[]}));
