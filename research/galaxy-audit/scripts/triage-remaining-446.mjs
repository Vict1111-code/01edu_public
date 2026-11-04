#!/usr/bin/env node
// Phase 24: conservative README-based automated triage of the 446 archive-unmatched subjects.
// Educational inference only; this is NOT official 01Edu curriculum placement or grading.
import {readFileSync, writeFileSync, mkdirSync} from 'node:fs';
import {resolve, join} from 'node:path';
import {pathToFileURL} from 'node:url';

const normalize = s => String(s).replace(/\s+/g, ' ').trim();
const evidence = (s, re) => {
 const m = re.exec(s);
 if (!m) return null;
 const line = s.slice(Math.max(0, s.lastIndexOf('\n',m.index)+1),
   Math.min(s.length, s.indexOf('\n',m.index)<0?s.length:s.indexOf('\n',m.index))).trim();
 return normalize(line).slice(0,240);
};
const flag = (s,regex,label) => {
 const quote = evidence(s,regex);
 return quote ? {signal:label,source_excerpt:quote} : null;
};
const langSignals = [
 ['go', [/\bfunc\s+[A-Za-z]\w*\s*\(/m,/\bgo run\b/i,/\bpackage\s+main\b/m,/\bpackage\s+piscine\b/m]],
 ['rust', [/\bpub\s+fn\s+\w+\s*\(/m,/\bfn\s+\w+\s*\([^)]*\)\s*->/m,/\bcargo run\b/i,/\buse\s+\w+::/m]],
 ['javascript', [/\bquerySelector\s*\(/,/\baddEventListener\s*\(/,/\bconst\s+\w+\s*=/,/\blet\s+\w+\s*=/,/\bconsole\.log\s*\(/]],
 ['python', [/\bdef\s+\w+\s*\(/m,/\bpython3?\s+\w+\.py\b/i]],
 ['shell', [/^#!\/bin\/(?:ba)?sh/m,/\bsh\s+\w+\.sh\b/]]
];
export function detectLanguages(text) {
 const scores = langSignals.map(([language,regexes])=>({
  language,signals:regexes.filter(re=>re.test(text)).length
 })).filter(x=>x.signals>0).sort((a,b)=>b.signals-a.signals||a.language.localeCompare(b.language));
 const max = scores[0]?.signals||0;
 return {candidate: max>=2 && scores.filter(s=>s.signals===max).length===1?scores[0].language:null,
   candidates:scores,confidence:max>=2&&scores.filter(s=>s.signals===max).length===1?'medium':'unresolved'};
}
export function triageOne(id,text,readmeSha) {
 const inspected=text.trim();
 const evidenceList=[];
 const add=(regex,name)=>{const x=flag(inspected,regex,name);if(x)evidenceList.push(x);return Boolean(x);};
 const h={
  quest:(inspected.match(/^\s*(?:[-*]\s*)?(?:#{1,5}\s*)?Quest\s*\d+\s*:/gim)||[]).length,
  raid:(inspected.match(/^\s*(?:[-*]\s*)?(?:#{1,5}\s*)?Raid\s*\d+\s*:/gim)||[]).length
 };
 const heading=add(/^#{1,4}\s+Instructions\b/im,'instructions_heading');
 const expected=add(/^#{1,4}\s+Expected\s+(?:function|output|program)\b/im,'expected_signature_or_output');
 const functionStmt=add(/\b(?:write|create|define|implement)\s+(?:(?:a|the)\s+)?function\b/i,'function_instruction');
 const programStmt=add(/\b(?:write|create)\s+(?:(?:a|the)\s+)?program\b/i,'program_instruction');
 const domStmt=add(/\b(?:DOM|querySelector|addEventListener|HTML\s+element)\b/i,'browser_dom_term');
 const projectStmt=add(/\b(?:your\s+project|this\s+project|complete\s+project|build\s+a\s+(?:website|web\s+app|server|application)|implement\s+a\s+(?:server|game|website))\b/i,'project_language');
 const deliverable=add(/\b(?:README\.md|Dockerfile|database|HTTP\s+server|authentication|deploy|test\s+suite|API\s+endpoint|client\s+and\s+server)\b/i,'system_deliverable_term');
 const blank = inspected.length===0;
 const resourceOnly=add(/^#{1,4}\s+Resources?\b/im,'resource_section') &&
   !heading&&!functionStmt&&!programStmt&&!projectStmt&&inspected.length<850;
 let category='needs_manual_review',confidence='low';
 if(blank) {category='empty_readme';confidence='high';}
 else if(h.quest>=2 && (h.raid>=1||h.quest>=3)){
  category='track_or_course_overview';confidence='high';
  add(/\bQuest\s*\d+\s*:/i,'multi_quest_structure');
 }else if(expected&&functionStmt) {
  category='function_exercise_candidate';confidence='high';
 }else if(expected&&inspected.length<2400){
  category='small_exercise_candidate';confidence='medium';
 }else if(programStmt && inspected.length<3000 && !projectStmt){
  category='cli_or_program_exercise_candidate';confidence='medium';
 }else if(domStmt&&heading&&!projectStmt&&inspected.length<4000){
  category='browser_dom_exercise_candidate';confidence='medium';
 }else if(projectStmt&&deliverable&&inspected.length>1600){
  category='multi_component_project_candidate';confidence='medium';
 }else if(resourceOnly){
  category='resource_or_background_candidate';confidence='low';
 }else if(functionStmt&&heading&&inspected.length<2700){
  category='function_exercise_candidate';confidence='medium';
 }else if(projectStmt&&inspected.length>=1700){
  category='project_candidate';confidence='low';
 }
 const language=detectLanguages(inspected);
 return {id,source_path:'subjects/'+id+'/README.md',source_readme_sha:readmeSha,
  observed_readme_characters:inspected.length,has_instructions_heading:heading,
  suggested_content_category:category,category_confidence:confidence,
  detected_language:language.candidate,language_evidence_confidence:language.confidence,
  possible_languages:language.candidates,readme_evidence:evidenceList.slice(0,7),
  official_galaxy_track:null,official_unlock:null,official_piscine_membership:null,
  visual_galaxy_placement:null,review_status:'automatic_heuristic_not_manual_semantic_validation'};
}
export function build(index,phase22,visual,readSource){
 if(index.tree_sha!==phase22.source_tree_sha||index.tree_sha!==visual.source_repository_tree_sha)throw Error('pinned source tree SHA mismatch');
 const source=new Map(index.nodes.map(n=>[n.path,n]));
 const alreadyReviewed=phase22.other_unaudited_subjects.filter(n=>n.source_review);
 const work=phase22.other_unaudited_subjects.filter(n=>!n.source_review);
 const seen=new Set(),records=[];
 for(const n of work){
  if(seen.has(n.id))throw Error('duplicate backlog id: '+n.id);
  seen.add(n.id);
  const indexed=source.get(n.id);
  if(!indexed||indexed.depth!==1||indexed.readme_sha!==n.readme_sha||indexed.audit_readme_sha)
   throw Error('source identity mismatch: '+n.id);
  const path='subjects/'+n.id+'/README.md';
  const text=readSource(path);
  records.push(triageOne(n.id,text,indexed.readme_sha));
 }
 records.sort((a,b)=>a.id.localeCompare(b.id));
 if(records.length!==phase22.counts.unreviewed_archive_unmatched ||
   records.length+alreadyReviewed.length!==phase22.counts.archive_unmatched_without_audit)
  throw Error('missing or duplicated archive-unmatched subject');
 const screenshotPaths=new Set(visual.tracks.flatMap(t=>t.nodes.map(n=>n.subject_id)));
 const byCategory={};const byLanguage={};
 for(const r of records){
  byCategory[r.suggested_content_category]=(byCategory[r.suggested_content_category]||0)+1;
  const l=r.detected_language||'unresolved';
  byLanguage[l]=(byLanguage[l]||0)+1;
 }
 const manualQueue=records.filter(r=>r.category_confidence!=='high'||r.detected_language===null)
   .sort((a,b)=>(a.category_confidence==='low'?0:1)-(b.category_confidence==='low'?0:1)||a.id.localeCompare(b.id));
 return {schema_version:'1.0',phase:24,as_of:'2026-11-04',
  method:'Full-README deterministic pattern triage, not human semantic verification; multiple language signals may conflict.',
  caution:'These are provisional source-derived category candidates. Do not treat any as verified official quest, Galaxy orbit or unlock; verify every consequential classification manually.',
  source_tree_sha:index.tree_sha,
  counts:{total_readmes_read:records.length,preexisting_manually_reviewed_excluded:alreadyReviewed.length,
   covered_archive_unmatched_total:records.length+alreadyReviewed.length,
   high_category_confidence:records.filter(x=>x.category_confidence==='high').length,
   medium_category_confidence:records.filter(x=>x.category_confidence==='medium').length,
   low_category_confidence:records.filter(x=>x.category_confidence==='low').length,
   unambiguous_language_heuristic:records.filter(x=>x.detected_language!==null).length,
   priority_manual_review_queue:manualQueue.length,category_counts:byCategory,language_counts:byLanguage,
   screenshot_anchors_in_this_backlog:records.filter(x=>screenshotPaths.has(x.id)).length},
  records,priority_manual_review_queue:manualQueue.map(x=>({id:x.id,category:x.suggested_content_category,
    confidence:x.category_confidence,language:x.detected_language,readme_sha:x.source_readme_sha,
    evidence:x.readme_evidence.slice(0,3)}))};
}
export function report(x) {
 const c=x.counts;
 const out=['# Phase 24 — Full-source triage for archive-unmatched public subjects','',
  'This is an automated first-pass **source text classification**, not final manual validation or official Galaxy ordering.','',
  'README files inspected: '+c.total_readmes_read+'. Previously manually reviewed in this subgroup: '+c.preexisting_manually_reviewed_excluded+'.',
  'Category confidence: high '+c.high_category_confidence+', medium '+c.medium_category_confidence+', low '+c.low_category_confidence+'.',
  'Candidate language identifiable from multiple explicit signals: '+c.unambiguous_language_heuristic+'.',
  'Priority manual review queue (anything other than high category confidence or with unresolved language): '+c.priority_manual_review_queue+'.','',
  '## Pattern-derived educational category candidates','',
  '| Candidate category | Count |','| --- | ---: |'];
 for(const [k,v] of Object.entries(c.category_counts).sort((a,b)=>b[1]-a[1]))out.push('| '+k+' | '+v+' |');
 out.push('','## Readme-derived language candidates','',
  '| Candidate language | Count |','| --- | ---: |');
 for(const [k,v] of Object.entries(c.language_counts).sort((a,b)=>b[1]-a[1]))out.push('| '+k+' | '+v+' |');
 out.push('','## Interpretation limits','',
  '- High category confidence is a match to specific wording such as “Expected function”, **not** a manually audited project identity.',
  '- Detecting a language from usage snippets is fallible; mixed-language READMEs stay unresolved.',
  '- A visible Galaxy node that lacks a current README match remains separate from source-derived records.',
  '- No program was executed, no curriculum membership verified and no official prerequisites or unlocks asserted.',
  '','The JSON output includes individual README SHA, candidate category, source excerpts, candidate languages and a prioritized review queue.','');
 return out.join('\n');
}
if(process.argv[1]&&import.meta.url===pathToFileURL(resolve(process.argv[1])).href){
 const root=resolve(process.argv[2]||'.'),out=resolve(process.argv[3]||'research/galaxy-audit/generated');
 const load=p=>JSON.parse(readFileSync(join(root,'research/galaxy-audit/data',p),'utf8'));
 const r=build(load('subject-node-index.json'),load('phase22-nonaudited-coverage.json'),
  load('phase23-galaxy-visual-anchors.json'),p=>readFileSync(join(root,p),'utf8'));
 mkdirSync(out,{recursive:true});
 writeFileSync(join(out,'phase24-unmatched-readme-triage.json'),JSON.stringify(r,null,2)+'\n');
 writeFileSync(join(out,'phase24-triage-report.md'),report(r)+'\n');
 writeFileSync(join(out,'phase24-summary.json'),JSON.stringify(r.counts,null,2)+'\n');
 console.log(JSON.stringify(r.counts,null,2));
}
