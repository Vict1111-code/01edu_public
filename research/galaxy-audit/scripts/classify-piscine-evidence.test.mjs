import test from 'node:test';
import assert from 'node:assert/strict';
import {scoreLanguage,classify} from './classify-piscine-evidence.mjs';

test('detects Go from go run',()=>assert.equal(scoreLanguage('Run: go run .').dominant,'go'));
test('detects Rust from cargo and code fence',()=>assert.equal(scoreLanguage('Use cargo run and pub fn fibonacci(n: u32)->u32').dominant,'rust'));
test('detects JavaScript from code fence',()=>assert.equal(scoreLanguage('\x60\x60\x60js\nconst x = 2\n\x60\x60\x60').dominant,'javascript'));
test('does not force language on ordinary prose',()=>assert.equal(scoreLanguage('Complete this task.').dominant,null));
test('identifies first Rust Piscine exercise but not a quest number',()=>{
 const r=classify('hello_rust','The goal of this first exercise is to give you rules for the whole piscine rust. cargo new --vcs=none');
 assert.equal(r.explicit_piscine_language,'rust');assert.equal(r.first_exercise_phrase,true);assert.equal(r.piscine_membership_verified,true);assert.equal(r.exact_quest_number,null);
});
test('later core reference to a Piscine does not prove membership',()=>{
 const r=classify('smart-road','Remember the road_intersection raid in the Rust Piscine?');
 assert.equal(r.explicit_piscine_language,'rust');assert.equal(r.piscine_membership_verified,false);
});
test('raid phrase is not equivalent to official exercise sequence',()=>{
 const r=classify('quadchecker','This raid is based on the quad functions. $ go run .');
 assert.equal(r.raid_phrase,true);assert.equal(r.official_sequence_position,null);
});
