import {test} from 'node:test';
import assert from 'node:assert/strict';
import {createAudioController} from './audio.mjs';
function fixture() {
  const revoked = [];
  let count = 0;
  const audio = {hidden:true,pause(){},load(){},removeAttribute(){delete this.src}};
  const controller = createAudioController(audio,{createObjectURL:()=> 'blob:'+ ++count,revokeObjectURL:url=>revoked.push(url)});
  return {audio,controller,revoked};
}
test('loads audio',()=>{const {audio,controller}=fixture();controller.setFile({});assert.equal(audio.src,'blob:1');assert.equal(audio.hidden,false)});
test('replacing audio releases old URL',()=>{const {controller,revoked}=fixture();controller.setFile({});controller.setFile({});assert.deepEqual(revoked,['blob:1'])});
test('clearing twice releases URL only once',()=>{const {audio,controller,revoked}=fixture();controller.setFile({});controller.clear();controller.clear();assert.deepEqual(revoked,['blob:1']);assert.equal(audio.hidden,true);assert.equal(audio.src,undefined)});
