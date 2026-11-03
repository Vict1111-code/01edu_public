#!/usr/bin/env node
// Phase 15: source-backed concept scan of complete public subject README files.
// Terminology matches and stage suggestions are NOT official 01Edu classifications.
import {readFileSync,writeFileSync,mkdirSync,existsSync} from 'node:fs';
import {join,resolve} from 'node:path';
import {pathToFileURL} from 'node:url';
import {CONCEPTS} from './build-concept-prerequisites.mjs';

export const RULES={
 go:{
 shell_git:/\b(shell|terminal|git|chmod|symlink|symbolic link|permissions|bash|curl|jq)\b/i,
 control_flow:/\b(loop|iterate|iteration|conditional|negative|positive|odd|even)\b/i,
 recursion:/\b(recurs(?:ion|ive|ivity)|backtrack|eight queens)\b/i,
 runes_strings:/\b(rune|unicode|characters?|strings?|alphabet|vowels?|upper.?case|lower.?case|substring)\b/i,
 slices:/\b(slices?|arrays?|append|elements of (?:a|the) list)\b/i,
 parsing:/\b(convert|conversion|base (?:[2-9]|10|16)|digits?|hexadecimal|binary|decimal|atoi)\b/i,
 files_cli:/\b(files?|directories|directory|arguments?|program name|standard input|standard output|command line|os\.Args)\b/i,
 callbacks:/\b(callback|function passed|apply (?:the|a) function|function as (?:an )?argument)\b/i,
 sorting:/\b(sort(?:ed|ing)?|ascending|descending|lexicographic|order(?:ed|ing)?)\b/i,
 pointers:/\b(pointers?|addresses?|dereference)\b/i,
 linked_lists:/\b(linked.list|NodeL|List(?:Push|Remove|Merge|At|Find)|(?:head|tail) of (?:the|a) list)\b/i,
 binary_trees:/\b(binary.tree|TreeNode|BTree[A-Z]|binary search tree)\b/i,
 tree_traversal:/\b(in.?order|pre.?order|post.?order|level.order|breadth.first|travers(?:e|al)|height of (?:the|a) tree)\b/i,
 functions:/\b(function|func|return(?:s)? a value)\b/i,
 variables:/\b(variable|declare|initiali[sz]e|integer)\b/i
 },
 rust:{
 cargo:/\b(cargo|crates?|repository setup|rust project)\b/i,
 types:/\b(primitive|integers?|boolean|tuples?|scalar|numbers?|variables?|f64|u64|i32)\b/i,
 control_flow:/\b(loops?|iteration|conditional|match (?:expression|statement)|for each)\b/i,
 strings:/\b(strings?|characters?|&str|text|substring|prefix|suffix)\b/i,
 ownership:/\b(ownership|owned|moves?|clon(?:e|ing)|Copy trait)\b/i,
 borrowing:/\b(borrow(?:ing|ed)?|references?|&mut|&str)\b/i,
 enums_results:/\b(enums?|Result|Option|errors?|panic|unwrap|expect)\b/i,
 collections:/\b(collections?|HashMap|HashSet|Vec<|vectors?|arrays?|lists?|deck|cards?)\b/i,
 iterators:/\b(iterators?|\.iter\(|enumerate|fold|\.map\(|\.filter\()\b/i,
 traits:/\b(traits?|impl(?:ement)?|derive|FromStr|Display)\b/i,
 generics:/\b(generics?|type parameters?|compile.time generic)\b/i,
 lifetimes:/\b(lifetimes?|lifetime annotations?)\b/i,
 matrix_structures:/\b(matri(?:x|ces)|linear algebra|scalar products?|vectors? (?:product|operation))\b/i,
 operator_traits:/\b(operator overload|Add.*Sub.*Mul|implement (?:the )?operators?|std::ops)\b/i,
 applications:/\b(todos?|games?|simulation|API|JSON|files?|command.line|statistics|calculator)\b/i
 },
 javascript:{
 runtime:/\b(node|deno|browser|console|runtime|environment)\b/i,
 values_functions:/\b(functions?|variables?|returns?|arguments?|parameters?|declarations?|primitive|const|let|values?)\b/i,
 control_flow:/\b(condition(?:al)?|loops?|comparison|boolean|true|false|greater than|less than)\b/i,
 arrays_objects:/\b(arrays?|objects?|properties|keys?|values?|entries|slices?|copies|lists?|elements?)\b/i,
 closures:/\b(closures?|currying|curry|lexical|scope)\b/i,
 higher_order_functions:/\b(callbacks?|higher.order|reduce|filter|map|forEach|compose|each element.*function)\b/i,
 promises:/\b(promises?|async|await|resolve|reject|then\()\b/i,
 fetch_json:/\b(fetch|JSON|APIs?|HTTP|requests?|query parameters?)\b/i,
 dom:/\b(DOM|document|HTML|elements?|styles?|CSS|createElement|web page|page displaying)\b/i,
 events:/\b(events?|clicks?|keyboard|keydown|mouse|listeners?|oninput|onchange)\b/i,
 regex_dates:/\b(RegEx|regular expressions?|patterns?|dates?|years?|months?|weekends?|cron|IP addresses?|URL matching|quantifiers?)\b/i,
 ui_state:/\b(forms?|buttons?|sliders?|inputs?|render|display|updates?|interactive|controls?)\b/i,
 applications:/\b(games?|applications?|simulations?|interactive (?:page|website)|projects?|interfaces?)\b/i
 }
};
function stripCode(s){
 const tick=String.fromCharCode(96);
 const fenced=new RegExp(tick+'{3}[\\s\\S]*?'+tick+'{3}','g');
 const inline=new RegExp(tick+'([^'+tick+']+)'+tick,'g');
 return s.replace(fenced,' [code example] ').replace(inline,'$1').replace(/!\[[^\]]*\]\([^)]+\)/g,'');
}
export function sections(md){
 const headers=[...md.matchAll(/^#{2,5}\s+([^\n#]+)\s*$/gm)].map(m=>({title:m[1].trim().toLowerCase(),at:m.index,end:m.index+m[0].length}));
 const part=re=>{const h=headers.find(x=>re.test(x.title));if(!h)return '';const n=headers.find(x=>x.at>h.at);return md.slice(h.end,n?.at??md.length);};
 const ins=part(/^instructions?$/),not=part(/^notions?$|^resources?$/);
 return {instructions:stripCode(ins||md.slice(0,Math.min(md.length,3000))),
 notions:stripCode(not),instructions_section_found:!!ins,notions_section_found:!!not};
}
export function classifyREADME(lang,md){
 const ss=sections(md),hits=[];
 const allowed=new Set(CONCEPTS[lang].nodes);
 for(const [concept,re] of Object.entries(RULES[lang])){
  if(!allowed.has(concept))throw Error('Unknown concept: '+lang+'/'+concept);
  let match=re.exec(ss.instructions),part='instructions';
  if(!match&&ss.notions){match=re.exec(ss.notions);part='notions';}
  if(!match)continue;
  const source=part==='instructions'?ss.instructions:ss.notions;
  hits.push({concept,source_section:part,matched_text:match[0],
   excerpt:source.slice(Math.max(0,match.index-45),Math.min(source.length,match.index+match[0].length+65)).replace(/\s+/g,' ').trim().slice(0,145),
   evidence_type:part==='instructions'?'source_instruction_keyword':'source_notions_keyword'});
 }
 return {hits,instructions_section_found:ss.instructions_section_found,notions_section_found:ss.notions_section_found};
}
const GENERIC={
 go:new Set(['functions','variables','control_flow','runes_strings']),
 rust:new Set(['types','strings','control_flow']),
 javascript:new Set(['values_functions','control_flow','arrays_objects'])
};
export function reconcile(phase13,phase14,manual,root){
 const previous=new Map(phase13.exercise_cards.map(x=>[x.language+'::'+x.exercise,x]));
 const reviews=new Map(manual.reviews.map(x=>[x.language+'::'+x.exercise,x]));
 const languages={},outlier_review=[];
 for(const [lang,group] of Object.entries(phase14.languages)){
  const rows=[];
  for(const x of group.exercise_concept_cards){
   const key=lang+'::'+x.exercise,p=previous.get(key);
   if(!p)throw Error('Missing source record '+key);
   const path=p.official_readme;
   const valid=typeof path==='string'&&/^subjects\/[^/]+\/README\.md$/.test(path);
   const file=valid?join(root,path):null,hasReadme=!!file&&existsSync(file);
   const scan=hasReadme?classifyREADME(lang,readFileSync(file,'utf8')):{hits:[]};
   const reviewed=reviews.get(key);
   const manualConcepts=reviewed?.manual_concept_interpretation||[];
   for(const c of manualConcepts)if(!CONCEPTS[lang].nodes.includes(c))throw Error('Unknown reviewed concept '+key+'/'+c);
   const specific=scan.hits.filter(h=>!GENERIC[lang].has(h.concept));
   const specificInstruction=specific.filter(h=>h.source_section==='instructions');
   const generic=scan.hits.filter(h=>GENERIC[lang].has(h.concept));
   const nameOnly=x.concept_classification==='name_only_low_confidence'?x.concepts:[];
   const concepts=[...new Set([...manualConcepts,...x.concepts,...scan.hits.map(h=>h.concept)])];
   let status;
   if(reviewed)status='manual_full_readme_review';
   else if(x.concept_classification==='manually_curated_concept_anchor')status='manual_concept_anchor';
   else if(specificInstruction.length)status='README_specific_instruction_keyword';
   else if(specific.length)status='README_specific_notions_keyword';
   else if(scan.hits.length)status='README_generic_terms_only';
   else if(x.concept_classification==='name_only_low_confidence')status='name_only_unverified';
   else status=hasReadme?'README_inspected_no_match':'no_public_README';
   const recommendedStage=reviewed?.suggested_stage??x.proposed_stage;
   const row={language:lang,exercise:x.exercise,public_readme:path,readme_inspected:hasReadme,
    source_concept_evidence:scan.hits,concepts,concept_evidence_layers:{manual_readme_interpretation:manualConcepts,README_specific:specific.map(h=>h.concept),README_generic:generic.map(h=>h.concept),name_only_low_confidence:nameOnly},previous_classification:x.concept_classification,
    evidence_status:status,original_proposed_stage:x.proposed_stage,recommended_stage:recommendedStage,
    stage_changed_by_manual_review:!!reviewed&&recommendedStage!==x.proposed_stage,
    estimated_difficulty:x.estimated_difficulty,manual_outlier_review:reviewed||null,
    official_galaxy_order:null,official_unlock_conditions:null};
   rows.push(row);
   if(reviewed)outlier_review.push({language:lang,exercise:x.exercise,previous_stage:x.proposed_stage,
    recommended_stage:recommendedStage,previous_score:x.estimated_difficulty,
    decision:reviewed.decision,reason:reviewed.reason,source_url:reviewed.source_url});
  }
  languages[lang]={summary:{total:rows.length,readmes_inspected:rows.filter(x=>x.readme_inspected).length,
   manual_anchors:rows.filter(x=>x.evidence_status==='manual_concept_anchor').length,
   manual_full_readme_reviews:rows.filter(x=>x.evidence_status==='manual_full_readme_review').length,
   specific_instruction_keyword:rows.filter(x=>x.evidence_status==='README_specific_instruction_keyword').length,
   specific_notions_keyword:rows.filter(x=>x.evidence_status==='README_specific_notions_keyword').length,
   generic_terms_only:rows.filter(x=>x.evidence_status==='README_generic_terms_only').length,
   name_only_unverified:rows.filter(x=>x.evidence_status==='name_only_unverified').length,
   readme_no_match:rows.filter(x=>x.evidence_status==='README_inspected_no_match').length,
   no_public_readme:rows.filter(x=>x.evidence_status==='no_public_README').length},exercise_cards:rows};
 }
 if(outlier_review.length!==manual.reviews.length)throw Error('Unjoined manual review(s)');
 return {schema_version:'1.0',as_of:'2026-11-03',
  caveat:'README keyword signals are source-text evidence, not proof of conceptual prerequisites. Stage changes are independent educational suggestions, not official Galaxy ordering.',
  summary:{total:Object.values(languages).reduce((n,d)=>n+d.summary.total,0),manual_outliers_reviewed:outlier_review.length},
  languages,outlier_review};
}
export function guide(data,lang){
 const rows=data.languages[lang].exercise_cards,lines=['# '+lang.toUpperCase()+' Piscine — source-checked concept review and revised stages','',
 '**Pedagogical recommendation only; NOT official 01Edu Galaxy order or difficulty.**',''];
 for(let stage=1;stage<=8;stage++){
  const xs=rows.filter(x=>x.recommended_stage===stage).sort((a,b)=>(a.estimated_difficulty??999)-(b.estimated_difficulty??999)||a.exercise.localeCompare(b.exercise));
  lines.push('## Stage '+stage,'',xs.length+' exercise candidates, sorted by provisional requirement complexity.','');
  for(const x of xs){
   const label=x.public_readme?'['+x.exercise+'](https://github.com/01-edu/public/blob/master/'+x.public_readme+')':x.exercise;
   lines.push('- '+label+' — '+x.evidence_status+'; concepts: '+(x.concepts.join(', ')||'unknown')+
    (x.stage_changed_by_manual_review?' **[reviewed stage change]**':''));
  }
  lines.push('');
 }
 lines.push('## Manual difficulty outlier reviews','');
 for(const x of data.outlier_review.filter(x=>x.language===lang))
  lines.push('- '+x.exercise+': stage '+x.previous_stage+' → '+x.recommended_stage+'; '+x.decision+'. '+x.reason);
 lines.push('','## Remaining low-evidence cases','');
 for(const x of rows.filter(x=>['name_only_unverified','README_generic_terms_only','README_inspected_no_match','no_public_README'].includes(x.evidence_status)))
  lines.push('- '+x.exercise+' — '+x.evidence_status);
 lines.push('','**Interpretation:** A term in a README does not guarantee a concept is a strict prerequisite. Follow linked complete instructions, restrictions, and public tests.','');
 return lines.join('\n');
}
if(process.argv[1]&&import.meta.url===pathToFileURL(resolve(process.argv[1])).href){
 try{
  const root=resolve(process.argv[2]||'.'),out=resolve(process.argv[3]||'research/galaxy-audit/generated');
  const p13=JSON.parse(readFileSync(join(out,'piscine-difficulty-and-dependency-review.json'),'utf8'));
  const p14=JSON.parse(readFileSync(join(out,'piscine-concept-prerequisite-graph.json'),'utf8'));
  const manual=JSON.parse(readFileSync(join(root,'research/galaxy-audit/data/phase15-manual-outlier-review.json'),'utf8'));
  const data=reconcile(p13,p14,manual,root);mkdirSync(out,{recursive:true});
  writeFileSync(join(out,'piscine-readme-concept-evidence-phase15.json'),JSON.stringify(data,null,2)+'\n');
  for(const lang of Object.keys(CONCEPTS))writeFileSync(join(out,lang+'-source-checked-study-guide.md'),guide(data,lang));
  console.log(JSON.stringify(Object.fromEntries(Object.entries(data.languages).map(([l,d])=>[l,d.summary])),null,2));
  if(data.summary.total!==316||data.summary.manual_outliers_reviewed!==29)throw Error('Unexpected coverage or review count');
 }catch(e){console.error(e.stack||String(e));process.exitCode=1;}
}
