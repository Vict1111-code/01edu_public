#!/usr/bin/env node
// Phase 14: explicit concept DAGs + manual source-file identity corrections.
// Educational prerequisites are NOT official Galaxy unlock rules.
import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
import {join,resolve} from 'node:path';
import {pathToFileURL} from 'node:url';

export const CONCEPTS={
 go:{
  nodes:['shell_git','variables','control_flow','functions','recursion','runes_strings','slices','parsing','files_cli','callbacks','sorting','pointers','linked_lists','binary_trees','tree_traversal'],
  edges:[['shell_git','variables'],['variables','control_flow'],['control_flow','functions'],['functions','recursion'],['functions','runes_strings'],['control_flow','slices'],['runes_strings','parsing'],['slices','sorting'],['functions','callbacks'],['functions','files_cli'],['functions','pointers'],['pointers','linked_lists'],['pointers','binary_trees'],['recursion','tree_traversal'],['binary_trees','tree_traversal']],
  anchors:{'printalphabet':['control_flow'],'basicatoi':['parsing'],'eightqueens':['recursion'],'firstrune':['runes_strings'],'split':['runes_strings','slices'],'foreach':['callbacks','slices'],'sortintegertable':['sorting'],'listat':['linked_lists','pointers'],'btreeapplybylevel':['tree_traversal'],'btreeinsertdata':['binary_trees']}
 },
 rust:{
  nodes:['cargo','types','control_flow','strings','ownership','borrowing','enums_results','collections','iterators','traits','generics','lifetimes','matrix_structures','operator_traits','applications'],
  edges:[['cargo','types'],['types','control_flow'],['types','strings'],['types','ownership'],['ownership','borrowing'],['control_flow','enums_results'],['ownership','collections'],['collections','iterators'],['ownership','traits'],['traits','generics'],['borrowing','lifetimes'],['generics','matrix_structures'],['matrix_structures','operator_traits'],['traits','operator_traits'],['enums_results','applications'],['collections','applications']],
  anchors:{'expected_variable':['types'],'arrays':['control_flow'],'ownership':['ownership'],'borrow':['borrowing'],'error_types':['enums_results'],'collect':['collections'],'traits':['traits'],'generics':['generics'],'lifetimes':['lifetimes'],'matrix':['matrix_structures'],'lalgebra_scalar':['matrix_structures'],'matrix_ops':['operator_traits'],'boxing_todo':['applications','enums_results']}
 },
 javascript:{
  nodes:['runtime','values_functions','control_flow','arrays_objects','closures','higher_order_functions','promises','fetch_json','dom','events','regex_dates','ui_state','applications'],
  edges:[['runtime','values_functions'],['values_functions','control_flow'],['control_flow','arrays_objects'],['values_functions','closures'],['closures','higher_order_functions'],['arrays_objects','higher_order_functions'],['values_functions','promises'],['promises','fetch_json'],['values_functions','dom'],['dom','events'],['arrays_objects','regex_dates'],['events','ui_state'],['arrays_objects','ui_state'],['ui_state','applications'],['fetch_json','applications']],
  anchors:{'how-2-js':['runtime'],'abs':['control_flow'],'collections':['arrays_objects'],'using-map':['higher_order_functions'],'get-json':['fetch_json','promises'],'build-brick-and-break':['dom','events'],'gossip-grid':['dom','events','ui_state'],'valid-ip':['regex_dates'],'block-chain':['applications']}
 }
};
const SIGNAL_MAP={
 go:{recursion:'recursion',pointers:'pointers',trees:'binary_trees',files:'files_cli',algorithms:'recursion'},
 rust:{ownership:'ownership',pointers:'borrowing',generics:'generics',matrix:'matrix_structures',errors:'enums_results',files:'applications'},
 javascript:{async:'promises',dom:'dom',algorithms:'regex_dates',errors:'promises'}
};
export function topological(nodes,edges){
 const indegree=new Map(nodes.map(x=>[x,0])),children=new Map(nodes.map(x=>[x,[]]));
 for(const [from,to] of edges){
  if(!indegree.has(from)||!indegree.has(to))throw Error('Unknown concept edge: '+from+' -> '+to);
  indegree.set(to,indegree.get(to)+1);children.get(from).push(to);
 }
 const queue=nodes.filter(x=>indegree.get(x)===0),order=[];
 while(queue.length){
  const x=queue.shift();order.push(x);
  for(const next of children.get(x)){indegree.set(next,indegree.get(next)-1);if(indegree.get(next)===0)queue.push(next);}
 }
 if(order.length!==nodes.length)throw Error('Concept prerequisite cycle detected');
 return order;
}
export function assemble(phase13,identity){
 const cards=phase13.exercise_cards||[],languages={},identityByKey=new Map(identity.records.map(x=>[x.language+'::'+x.archive_exercise_id,x]));
 for(const [language,config] of Object.entries(CONCEPTS)){
  const order=topological(config.nodes,config.edges);
  const local=cards.filter(x=>x.language===language);
  const exercises=local.map(x=>{
   const reviewed=config.anchors[x.exercise]||[];
   const heur=(x.difficulty?.signals||[]).map(s=>SIGNAL_MAP[language][s.id]).filter(Boolean);
   const concepts=[...new Set([...reviewed,...heur])].filter(c=>config.nodes.includes(c));
   const source=identityByKey.get(language+'::'+x.exercise);
   return {exercise:x.exercise,proposed_stage:x.proposed_stage,estimated_difficulty:x.difficulty?.score??null,
    concepts,concept_classification:reviewed.length?'manually_curated_concept_anchor':heur.length?'README_keyword_heuristic':'not_classified',
    identity_disposition:source?.disposition||null,
    suggested_public_identity:source?.possible_public_subject||null,
    source_identity_confirmed:false,official_galaxy_order:null};
  });
  const documented=local.flatMap(x=>(x.source_based_prerequisite_candidates||[]).map(e=>({
   from:e.from,to:x.exercise,relation:e.relation,evidence_source:e.evidence_source||x.official_readme,
   evidence_type:'public_source_reference',official_unlock:'not_established'
  })));
  const ranked=local.filter(x=>x.difficulty?.score!==null&&x.difficulty?.score!==undefined);
  const outliers=ranked.filter(x=>(x.proposed_stage<=4&&x.difficulty.score>=45)||
    (x.proposed_stage>=7&&x.difficulty.score>=68)||
    (x.proposed_stage>=7&&x.difficulty.score<=55))
    .map(x=>({exercise:x.exercise,stage:x.proposed_stage,score:x.difficulty.score,
      reason:'heuristic score/stage combination merits manual requirements review',official_rating:false}))
    .sort((a,b)=>b.score-a.score||a.exercise.localeCompare(b.exercise)).slice(0,25);
  languages[language]={concepts:config.nodes.map(id=>({id,source:'independently_authored_pedagogical_taxonomy'})),
   concept_edges:config.edges.map(([from,to])=>({from,to,relation:'recommended_concept_prerequisite',
    evidence_type:'educational_inference',official_unlock:'not_established'})),
   topological_order:order,exercise_concept_cards:exercises,
   documented_subject_references:documented,
   difficulty_review_queue:outliers,
   summary:{exercise_count:exercises.length,manual_concept_anchors:exercises.filter(x=>x.concept_classification==='manually_curated_concept_anchor').length,
    heuristic_concept_matches:exercises.filter(x=>x.concept_classification==='README_keyword_heuristic').length,
    unclassified_concepts:exercises.filter(x=>x.concept_classification==='not_classified').length,
    documented_subject_edges:documented.length,outliers_for_review:outliers.length}};
 }
 return {schema_version:'1.0',as_of:'2026-11-03',
  methodology:'Manually curated concept prerequisites and source-backed exercise references are separate edge types; neither establishes official Galaxy unlocks.',
  identity_source_review_count:identity.records.length,languages};
}
export function report(data,language){
 const d=data.languages[language],lines=['# '+language.toUpperCase()+' Piscine — concept prerequisites and source-identity corrections','',
 '**Educational concept prerequisites are recommendations, not official 01Edu Galaxy gates.**','',
 '## Concept learning order (a valid topological ordering, not a single mandatory route)','',
 d.topological_order.map(x=>'\x60'+x+'\x60').join(' → '),'',
 '## Recommended concept dependencies',''];
 for(const e of d.concept_edges)lines.push('- '+e.from+' → '+e.to+' — independently inferred');
 lines.push('','## Explicit public subject references','');
 for(const e of d.documented_subject_references)lines.push('- '+e.from+' → '+e.to+' — '+e.relation+'; public source relationship, **not official unlock**');
 if(!d.documented_subject_references.length)lines.push('No direct subject reference edge was established in this source snapshot.');
 lines.push('','## Exercise-to-concept examples','');
 for(const x of d.exercise_concept_cards.filter(x=>x.concepts.length))lines.push('- '+x.exercise+': '+x.concepts.join(', ')+' ('+x.concept_classification+')');
 lines.push('','## Difficulty outliers for manual review','');
 for(const x of d.difficulty_review_queue)lines.push('- '+x.exercise+': stage '+x.stage+', provisional '+x.score+'/100');
 lines.push('','## Source identity caveat','',
 'Names from user-supplied community solution archives are not authoritative 01Edu assignment IDs. Source-file inspection can reject false matches or identify exported function similarities, but does not verify solution correctness.','');
 return lines.join('\n');
}
if(process.argv[1]&&import.meta.url===pathToFileURL(resolve(process.argv[1])).href){
 try{
  const root=resolve(process.argv[2]||'.'),out=resolve(process.argv[3]||'research/galaxy-audit/generated');
  const p13=JSON.parse(readFileSync(join(out,'piscine-difficulty-and-dependency-review.json'),'utf8'));
  const review=JSON.parse(readFileSync(join(root,'research/galaxy-audit/data/phase14-source-inspected-identity-review.json'),'utf8'));
  const data=assemble(p13,review);mkdirSync(out,{recursive:true});
  writeFileSync(join(out,'piscine-concept-prerequisite-graph.json'),JSON.stringify(data,null,2)+'\n');
  for(const lang of Object.keys(CONCEPTS))writeFileSync(join(out,lang+'-concept-prerequisite-guide.md'),report(data,lang));
  console.log(JSON.stringify(Object.fromEntries(Object.entries(data.languages).map(([k,v])=>[k,v.summary])),null,2));
  if(data.identity_source_review_count!==34)throw Error('Unexpected source-review record count');
 }catch(e){console.error(e.stack||String(e));process.exitCode=1;}
}
