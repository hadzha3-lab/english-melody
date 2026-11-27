import {test} from 'node:test';
import assert from 'node:assert/strict';
import {songs,filterSongs} from './catalog.mjs';
test('empty filters return all songs',()=>assert.deepEqual(filterSongs(songs),songs));
test('case insensitive title',()=>assert.deepEqual(filterSongs(songs,'BLUE').map(s=>s.name),['Blue Sky']));
test('level filter',()=>assert.deepEqual(filterSongs(songs,'','B1').map(s=>s.name),['After the Rain']));
test('combined filters',()=>assert.deepEqual(filterSongs(songs,'blue','A1'),[]));
