export const competencies=[
 {id:'ops',name:'Operations',category:'Core',description:'Run reliable services through clear ownership, controls and cross-team coordination.',levels:['Awareness','Working','Proficient','Advanced','Expert']},
 {id:'product',name:'Product Management',category:'Functional',description:'Translate user and business needs into prioritized, measurable product outcomes.',levels:['Awareness','Working','Proficient','Advanced','Expert']},
 {id:'delivery',name:'Project Delivery',category:'Functional',description:'Plan, coordinate and deliver complex initiatives across stakeholders and dependencies.',levels:['Awareness','Working','Proficient','Advanced','Expert']},
 {id:'data',name:'Data Literacy',category:'Core',description:'Interpret metrics, dashboards and evidence with appropriate context and caution.',levels:['Awareness','Working','Proficient','Advanced','Expert']},
 {id:'risk',name:'Risk & Controls',category:'Core',description:'Understand control responsibilities, escalation boundaries and documented evidence.',levels:['Awareness','Working','Proficient','Advanced','Expert']},
 {id:'customer',name:'Customer Operations',category:'Functional',description:'Manage support, service recovery, communication quality and customer outcomes.',levels:['Awareness','Working','Proficient','Advanced','Expert']},
 {id:'vendor',name:'Supplier Management',category:'Functional',description:'Evaluate, govern and improve external supplier relationships and dependencies.',levels:['Awareness','Working','Proficient','Advanced','Expert']},
 {id:'leadership',name:'Leadership',category:'Leadership',description:'Create clarity, accountability, capability and performance across teams.',levels:['Awareness','Working','Proficient','Advanced','Expert']}
];

export const roleProfiles=[
 {id:'operations-specialist',title:'Operations Specialist',family:'Operations',level:'Professional',competencies:{ops:3,data:2,risk:2,customer:2,vendor:2,delivery:2}},
 {id:'operations-manager',title:'Operations Manager',family:'Operations',level:'Manager',competencies:{ops:4,data:3,risk:3,customer:3,vendor:3,delivery:3,leadership:3}},
 {id:'product-manager',title:'Product Manager',family:'Product',level:'Professional',competencies:{product:3,data:3,delivery:3,ops:2,risk:2,customer:2}},
 {id:'project-manager',title:'Project Manager',family:'Delivery',level:'Professional',competencies:{delivery:4,ops:2,data:2,risk:2,vendor:3,leadership:2}},
 {id:'team-lead',title:'Team Lead',family:'Leadership',level:'Manager',competencies:{leadership:3,ops:3,data:2,risk:2,delivery:2,customer:2}},
 {id:'head-of-operations',title:'Head of Operations',family:'Operations',level:'Leadership',competencies:{ops:5,leadership:4,data:4,risk:4,vendor:4,delivery:3,customer:4}}
];

export const learnerSkillSeed={ops:3,product:2,delivery:3,data:3,risk:2,customer:2,vendor:2,leadership:1};
