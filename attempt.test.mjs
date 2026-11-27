import {test} from 'node:test';
import assert from 'node:assert/strict';
import {createAttempt} from './attempt.mjs';
test('repeated wrong checks do not add history',()=>{const a=createAttempt();assert.equal(a.check(0,2).record,true);assert.equal(a.check(0,2).record,false)});
test('corrected answer awards points once',()=>{const a=createAttempt();a.check(0,2);assert.deepEqual(a.check(2,2),{record:false,points:20});assert.equal(a.check(2,2).points,0)});
test('empty exercise is ignored',()=>assert.deepEqual(createAttempt().check(0,0),{record:false,points:0}));
