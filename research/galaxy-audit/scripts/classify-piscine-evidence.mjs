#!/usr/bin/env node
/** Classify evidence from public subjects READMEs. NOT official Piscine quest order. */
import {readdirSync,readFileSync,writeFileSync,mkdirSync} from 'node:fs';
import {resolve,join,relative,sep} from 'node:path';
import {pathToFileURL} from 'node:url';

export function scoreLanguage(text) {
  const rules={
    go:[[/\bgo (?:run|test|build)\b/gi,5,'Go CLI'],[/\x60{3}(?:go|golang)\b/gi,5,'Go code fence'],[/\bpackage main\b|\bfunc main\s*\(/g,5,'Go syntax'],[/github\.com\/01-edu\/z01/g,5,'Go library']],
    rust:[[/\x60{3}rust\b/gi,5,'Rust code fence'],[/\bcargo (?:run|test|build|new)\b/gi,5,'Cargo CLI'],[/\bpub fn\b|\bfn main\s*\(\s*\)/g,5,'Rust syntax']],
    javascript:[[/\x60{3}(?:js|javascript|jsx)\b/gi,5,'JS code fence'],[/\bnode [\w./-]+\.m?js\b/g,5,'Node CLI'],[/\b(?:const|let)\s+[A-Za-z_$][\w$]*\s*=/g,3,'JS syntax'],[/\bPromise\.all\b|\bdocument\.querySelector\b/g,4,'JS API']]
  };
  const scores={},evidence={};
  for(const [lang,patterns] of Object.entries(rules)){
    scores[lang]=0;evidence[lang]=[];
    for(const [regex,points,label] of patterns){
      const count=[...text.matchAll(regex)].length;
      if(count){scores[lang]+=Math.min(2,count)*points;evidence[lang].push({label,count});}
    }
  }
  const sorted=Object.entries(scores).sort((a,b)=>b[1]-a[1]);
  const dominant=sorted[0][1]>=5&&sorted[0][1]>=sorted[1][1]+3?sorted[0][0]:null;
  return {scores,evidence,dominant,confidence:dominant?(sorted[0][1]>=10?'strong':'moderate'):'ambiguous'};
}
export function classify(id,text){
  const lang=scoreLanguage(text);
  const mention=/\bpiscine\s+(?:go|golang|rust|js|javascript)\b|\b(?:go|rust|js|javascript)\s+piscine\b/i.exec(text);
  const raid=/\bthis raid\b|\braid (?:is|project|exercise|of|in)\b|\baudit of the raid\b/i.test(text);
  const first=/\bfirst (?:rust )?(?:piscine )?exercise\b/i.test(text);
  const explicit=mention?( /rust/i.test(mention[0])?'rust':/(?:javascript|js)\b/i.test(mention[0])?'javascript':'go'):null;
  return {id,dominant_language:lang.dominant,language_confidence:lang.confidence,
    language_scores:lang.scores,language_evidence:lang.evidence,
    explicit_piscine_language:explicit,piscine_mention_context:mention?text.slice(Math.max(0,mention.index-90),mention.index+mention[0].length+90).replace(/\s+/g,' ').slice(0,220):null,
    raid_phrase:raid,first_exercise_phrase:first,
    piscine_membership_verified:id==='hello_rust'&&first,
    exact_quest_number:null,official_sequence_position:null};
}
export function scan(root){
  const base=join(root,'subjects'),files=[];
  function walk(dir){for(const x of readdirSync(dir,{withFileTypes:true})){
    if(x.isSymbolicLink())continue;
    const p=join(dir,x.name);
    if(x.isDirectory())walk(p);
    else if(x.isFile()&&x.name==='README.md'){
      const rel=relative(base,p).split(sep).join('/');
      if(rel!=='README.md'&&!rel.endsWith('/audit/README.md'))files.push({id:rel.slice(0,-10),path:p});
    }
  }}
  walk(base);files.sort((a,b)=>a.id.localeCompare(b.id));
  const subjects=files.map(x=>classify(x.id,readFileSync(x.path,'utf8')));
  return {metadata:{schema_version:'1.0',subject_count:subjects.length,
    dominant_language_counts:Object.fromEntries(['go','rust','javascript'].map(k=>[k,subjects.filter(x=>x.dominant_language===k).length])),
    ambiguous_language:subjects.filter(x=>!x.dominant_language).length,
    explicit_piscine_mentions:subjects.filter(x=>x.explicit_piscine_language).length,
    raid_phrase_matches:subjects.filter(x=>x.raid_phrase).length,
    caveat:'Language indicators and Piscine mentions are not evidence of official quest membership or ordering.'},subjects};
}
if(process.argv[1]&&import.meta.url===pathToFileURL(resolve(process.argv[1])).href){
 try{const root=resolve(process.argv[2]||'.'),out=resolve(process.argv[3]||'research/galaxy-audit/generated');
  const r=scan(root);mkdirSync(out,{recursive:true});
  writeFileSync(join(out,'piscine-language-evidence.json'),JSON.stringify(r,null,2)+'\n');
  writeFileSync(join(out,'piscine-explicit-mentions.json'),JSON.stringify({metadata:r.metadata,subjects:r.subjects.filter(x=>x.explicit_piscine_language||x.raid_phrase||x.first_exercise_phrase)},null,2)+'\n');
  console.log(JSON.stringify(r.metadata,null,2));
  if(r.metadata.subject_count<1000)throw Error('Too few subjects');
 }catch(e){console.error(e.stack||String(e));process.exitCode=1;}
}
