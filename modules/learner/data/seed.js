export function createLearnerSeed(){return {
 progress:{'operations-foundations':67,'product-management-foundations':18},
 completedLessons:{'operations-foundations':9,'product-management-foundations':2},
 savedResources:['incident-report','product-requirements','risk-register'],
 assessmentScores:{'operations-foundations':91},
 certificates:[{id:'OA-OF-2026-02491',program:'Operations Foundation',score:'91%',issued:'09 Aug 2026'}],
 goals:[
  {id:'g1',title:'Complete Product Professional path',target:'Sep 30, 2026',progress:32,status:'In progress'},
  {id:'g2',title:'Earn Operations Foundation credential',target:'Nov 15, 2026',progress:0,status:'Planned'}
 ],
 notifications:[
  {id:'n1',title:'New assignment',body:'Product Core has been assigned to you.',time:'Today',read:false,type:'assignment'},
  {id:'n2',title:'Credential earned',body:'Your Industry Foundation credential is ready.',time:'Today',read:false,type:'certificate'},
  {id:'n3',title:'Course update',body:'The Payments Fundamentals course was updated.',time:'Yesterday',read:true,type:'content'}
 ],
 transcript:[
  {id:'t1',item:'Operations Foundations',type:'Course',completed:'Aug 9, 2026',result:'91%',hours:3.5},
  {id:'t2',item:'Industry Ecosystem',type:'Module',completed:'Aug 7, 2026',result:'Completed',hours:0.7}
 ],
 profile:{name:'Demo Learner',title:'Product Manager',company:'Demo Operations Co.',linkedin:'',publicCredentials:true,locale:'English',timezone:'Europe/Belgrade'}
}}
