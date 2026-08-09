export const onboardingPrograms=[
 {id:'onb-new-hire',title:'New Employee — First 30 Days',audience:'All new employees',duration:'30 days',status:'Published',completion:84,steps:[
  {id:'s1',week:'Day 1',title:'Welcome & company context',type:'Company module',required:true},
  {id:'s2',week:'Week 1',title:'Operations Foundations',type:'Course',required:true},
  {id:'s3',week:'Week 1',title:'Policies & controls',type:'Company module',required:true},
  {id:'s4',week:'Week 2',title:'Role learning path',type:'Learning path',required:true},
  {id:'s5',week:'Week 3',title:'Manager check-in',type:'Manager task',required:true},
  {id:'s6',week:'Week 4',title:'Final onboarding assessment',type:'Assessment',required:true},
  {id:'s7',week:'Day 30',title:'Onboarding completion credential',type:'Credential',required:false}
 ]},
 {id:'onb-manager',title:'New Manager — First 60 Days',audience:'New managers',duration:'60 days',status:'Draft',completion:0,steps:[
  {id:'m1',week:'Week 1',title:'Leadership operating model',type:'Course',required:true},
  {id:'m2',week:'Week 2',title:'Performance systems',type:'Company module',required:true},
  {id:'m3',week:'Week 4',title:'Team capability review',type:'Manager task',required:true},
  {id:'m4',week:'Day 60',title:'Manager readiness review',type:'Assessment',required:true}
 ]}
];
