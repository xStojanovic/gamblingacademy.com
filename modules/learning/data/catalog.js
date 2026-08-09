export const courses = [
  {
    slug:'operations-foundations', title:'Operations Foundations', eyebrow:'Foundation',
    description:'Understand how modern service organizations connect people, processes, technology, risk, customers, data and suppliers.',
    duration:'3.5 hours', lessons:12, level:'Beginner', certificate:true, progress:67,
    skills:['Operating model','Cross-functional awareness','Process literacy','Risk awareness'],
    modules:['How operating models work','Teams and ownership','Customer journeys','Technology and systems','Payments and service flows','Risk and controls','Customer operations','Product and delivery','Data and KPI literacy','Vendor ecosystem','How departments interact','Final assessment']
  },
  {slug:'product-management-foundations',title:'Product Management Foundations',eyebrow:'Product',description:'Learn how professional products are planned, specified, prioritized, delivered, released and measured across cross-functional teams.',duration:'2.5 hours',lessons:10,level:'Beginner',certificate:true,progress:18,skills:['Requirements','Roadmaps','Prioritization','Launch readiness'],modules:['Product operating model','Product ownership and stakeholders','Requirements and acceptance criteria','Roadmaps and prioritization','Dependencies and integrations','Discovery and validation','QA and launch readiness','Analytics and product health','Governance and controls','Final assessment']},
  {slug:'service-operations',title:'Service Operations',eyebrow:'Operations',description:'Build a practical understanding of daily operations, incident handling, escalation, reporting, vendors and cross-team workflows.',duration:'2.75 hours',lessons:11,level:'Beginner',certificate:true,progress:0,skills:['Incident handling','Escalations','Vendor coordination','Operational reporting'],modules:['What operations owns','Daily operational monitoring','Incident severity and triage','Escalation frameworks','Vendor coordination','Service exceptions','Customer issue patterns','Cross-functional ownership','Operational reporting','Documentation and SOPs','Final assessment']},
  {slug:'project-delivery',title:'Project Delivery for Operations Teams',eyebrow:'Project Management',description:'Run launches and integrations with stronger stakeholder mapping, dependencies, risk management, testing and launch control.',duration:'2.25 hours',lessons:9,level:'Intermediate',certificate:true,progress:0,skills:['Stakeholder mapping','Risk management','Launch control','Documentation'],modules:['Projects in operational environments','Stakeholder mapping','Requirements and scope','Dependencies and suppliers','Planning and documentation','Risk registers and blockers','Testing and launch readiness','Post-launch review','Final assessment']},
  {slug:'payments-risk',title:'Payments & Risk Fundamentals',eyebrow:'Payments',description:'Understand payment flows, provider relationships, reconciliation, disputes, operational failures, fraud risk indicators and escalation ownership.',duration:'2 hours',lessons:9,level:'Beginner',certificate:true,progress:0,skills:['Payment flows','Provider operations','Disputes','Risk escalation'],modules:['Payment ecosystem overview','Incoming payment flow','Outgoing payment flow','Providers and acquiring','Payment failures','Reconciliation basics','Disputes and chargebacks','Fraud risk indicators','Final assessment']},
  {slug:'kyc-aml-controls',title:'KYC, AML & Control Fundamentals',eyebrow:'Compliance',description:'A practical introduction to identity verification, AML controls, sanctions awareness, monitoring concepts and employee escalation responsibilities.',duration:'2.25 hours',lessons:10,level:'Beginner',certificate:true,progress:0,skills:['KYC','AML awareness','Escalation','Control literacy'],modules:['Why controls matter','KYC fundamentals','Verification workflows','AML fundamentals','Sanctions awareness','Monitoring concepts','Source-of-funds concepts','Control responsibilities','Escalation and documentation','Final assessment']},
  {slug:'customer-support',title:'Professional Customer Support',eyebrow:'Customer Operations',description:'Learn support structures, ticket and live-chat workflows, complaint handling, verification and payment escalations, QA and service metrics.',duration:'2 hours',lessons:9,level:'Beginner',certificate:true,progress:0,skills:['Ticket handling','Escalation','Complaint handling','Support QA'],modules:['Support team structure','Ticket and chat workflows','Account questions','Payment questions','Verification support','Complaint handling','Escalation standards','QA and service metrics','Final assessment']},
  {slug:'data-kpi-literacy',title:'Data & KPI Literacy',eyebrow:'Analytics',description:'Learn metric definitions, business context and common interpretation mistakes used across professional operations teams.',duration:'1.75 hours',lessons:8,level:'Beginner',certificate:true,progress:0,skills:['Metric definitions','Business context','Dashboard literacy','Reporting'],modules:['How to read operating metrics','Revenue and cost concepts','Acquisition and activation concepts','Payments metrics','Retention and service concepts','Product and service metrics','Reporting pitfalls','Final assessment']},
  {slug:'crm-communications',title:'CRM & Customer Communications Fundamentals',eyebrow:'CRM',description:'Understand lifecycle communications, channel governance, consent, segmentation concepts, campaign QA and responsible customer communication.',duration:'2 hours',lessons:9,level:'Beginner',certificate:true,progress:0,skills:['Lifecycle communication','Channel governance','Campaign QA','Consent awareness'],modules:['Role of CRM','Lifecycle communication','Segmentation concepts','Email, SMS and push','Consent and preferences','Campaign QA','Measurement terminology','Responsible communication','Final assessment']},
  {slug:'leadership',title:'Leadership in Operations Organizations',eyebrow:'Leadership',description:'Build stronger team structures, governance, reporting, cross-functional ownership, performance systems and knowledge continuity.',duration:'2.5 hours',lessons:10,level:'Advanced',certificate:true,progress:0,skills:['Team design','Governance','Performance management','Operational leadership'],modules:['Leadership context','Team structure','Ownership and accountability','KPIs and OKRs','Performance management','Delegation','Cross-functional leadership','Reporting and governance','Knowledge continuity','Final assessment']},
  {slug:'vendor-management',title:'Vendor & Supplier Management',eyebrow:'Business Operations',description:'Evaluate suppliers, define ownership, manage service expectations, document dependencies and run recurring vendor reviews.',duration:'1.5 hours',lessons:7,level:'Intermediate',certificate:true,progress:0,skills:['Vendor evaluation','Service ownership','Dependency mapping','Reviews'],modules:['Supplier landscape','Evaluation framework','Commercial and operational ownership','SLAs and service health','Dependency mapping','Vendor reviews','Final assessment']},
  {slug:'market-launch-readiness',title:'Market & Service Launch Readiness',eyebrow:'Launch Operations',description:'Coordinate product, technology, controls, payments, support and operational readiness before entering a new market or launching a new service.',duration:'2 hours',lessons:8,level:'Intermediate',certificate:true,progress:0,skills:['Launch planning','Readiness gates','Cross-team dependencies','Post-launch review'],modules:['Launch operating model','Requirements map','Product readiness','Payments readiness','Customer operations readiness','Launch war room','Go-live criteria','Post-launch review']}
];

export const learningPaths = [
  {slug:'new-to-operations',title:'New to Operations',description:'Build the cross-functional foundation every new employee should understand before specializing.',courseSlugs:['operations-foundations','data-kpi-literacy','kyc-aml-controls'],duration:'7.5 hours',badge:'Most popular'},
  {slug:'product-professional',title:'Product Professional',description:'Learn product ownership, integrations, release processes and cross-functional collaboration.',courseSlugs:['operations-foundations','product-management-foundations','project-delivery','data-kpi-literacy'],duration:'10 hours'},
  {slug:'operations-professional',title:'Operations Professional',description:'Understand operational ownership, incidents, escalations, suppliers, reporting and customer workflows.',courseSlugs:['operations-foundations','service-operations','payments-risk','customer-support','data-kpi-literacy'],duration:'12 hours'},
  {slug:'project-manager',title:'Project Manager',description:'Connect project management skills to complex service launches and integrations.',courseSlugs:['operations-foundations','product-management-foundations','project-delivery','vendor-management','market-launch-readiness'],duration:'11.75 hours'},
  {slug:'team-lead',title:'Team Lead',description:'Develop the cross-functional and management foundations needed to lead operational teams.',courseSlugs:['operations-foundations','service-operations','data-kpi-literacy','leadership'],duration:'10.5 hours'}
].map(path=>({...path,courses:path.courseSlugs.map(slug=>courses.find(c=>c.slug===slug)).filter(Boolean)}));

export const getCourse=slug=>courses.find(course=>course.slug===slug);
export const getLearningPath=slug=>learningPaths.find(path=>path.slug===slug);

export const resources = [
  ['incident-report','Incident Report Template','Operations','DOCX','Structure incidents by impact, timeline, owners, actions and follow-up.'],
  ['escalation-matrix','Escalation Matrix','Operations','XLSX','Define severity, owners, response channels and escalation thresholds.'],
  ['daily-ops-checklist','Daily Operations Checklist','Operations','XLSX','A repeatable opening and monitoring checklist for operational teams.'],
  ['weekly-ops-report','Weekly Operations Report','Operations','DOCX','Summarize service health, incidents, risks and actions for management.'],
  ['raci-matrix','RACI Matrix','Operations','XLSX','Clarify accountable, responsible, consulted and informed stakeholders.'],
  ['product-requirements','Product Requirements Template','Product','DOCX','Capture context, users, scope, acceptance criteria and dependencies.'],
  ['feature-brief','Feature Brief','Product','DOCX','A lightweight product brief for early alignment before full specification.'],
  ['roadmap-template','Roadmap Template','Product','XLSX','Track initiatives, owners, status, dependencies and release windows.'],
  ['launch-readiness','Launch Readiness Checklist','Product','XLSX','Coordinate QA, controls, operations, support and rollback readiness.'],
  ['post-launch-review','Post-Launch Review','Product','DOCX','Capture outcomes, incidents, lessons and follow-up actions.'],
  ['project-charter','Project Charter','Project Management','DOCX','Define objectives, scope, ownership, milestones and success criteria.'],
  ['risk-register','Risk Register','Project Management','XLSX','Track risks by impact, likelihood, owner and mitigation plan.'],
  ['dependency-tracker','Dependency Tracker','Project Management','XLSX','Visualize cross-team and supplier dependencies before they become blockers.'],
  ['stakeholder-matrix','Stakeholder Matrix','Project Management','XLSX','Map influence, ownership, communication needs and decision rights.'],
  ['status-report','Project Status Report','Project Management','DOCX','Provide concise progress, risk, decision and next-step reporting.'],
  ['weekly-team-report','Weekly Team Report','Management','DOCX','A structured weekly management update for priorities, metrics and blockers.'],
  ['kpi-scorecard','KPI Scorecard','Management','XLSX','Track operational or team KPIs with owners and commentary.'],
  ['one-to-one','1:1 Meeting Template','Management','DOCX','Structure recurring manager conversations around progress and development.'],
  ['okr-template','OKR Template','Management','XLSX','Define objectives, measurable results, owners and review cadence.'],
  ['quarterly-review','Quarterly Review Template','Management','DOCX','Review outcomes, capability, risks and next-quarter priorities.']
].map(([slug,title,category,format,description])=>({slug,title,category,format,description}));

export const glossary = [
  ['KPI','Key Performance Indicator — a measurable signal used to monitor performance against a defined objective.'],
  ['SLA','Service Level Agreement — a documented service expectation between teams or suppliers.'],
  ['KYC','Know Your Customer — identity and customer verification controls used for compliance and risk management.'],
  ['AML','Anti-Money Laundering — controls designed to detect and prevent financial crime.'],
  ['PSP','Payment Service Provider — a company that enables or routes payment processing.'],
  ['RACI','A responsibility model identifying who is Responsible, Accountable, Consulted and Informed.'],
  ['OKR','Objectives and Key Results — a framework linking outcomes to measurable key results.'],
  ['RBAC','Role-Based Access Control — permissions assigned based on user roles.'],
  ['SCORM','A standard used for packaging and tracking e-learning content across compatible learning systems.'],
  ['SSO','Single Sign-On — authentication that lets users access multiple services through one identity provider.'],
  ['SCIM','A standard used to automate user provisioning and deprovisioning between identity systems and SaaS tools.'],
  ['LMS','Learning Management System — software used to deliver, manage and measure structured learning.']
];

export const knowledgeArticles = [
  {slug:'how-operating-models-work',category:'Operations Basics',title:'How Modern Operating Models Work',summary:'A business-focused introduction to teams, systems, ownership and cross-functional dependencies.',read:'7 min'},
  {slug:'product-vs-project-vs-operations',category:'Operations Basics',title:'Product vs Project vs Operations',summary:'Understand three functions that new employees frequently confuse and how they work together.',read:'6 min'},
  {slug:'how-payments-flow',category:'Payments',title:'How Payment Flows Work',summary:'A high-level map of customer, business, provider and reconciliation responsibilities.',read:'8 min'},
  {slug:'what-does-product-manager-do',category:'Career',title:'What Does a Product Manager Do?',summary:'Responsibilities, stakeholders, common deliverables and skills for product professionals.',read:'9 min'},
  {slug:'incident-management-basics',category:'Operations',title:'Incident Management Basics',summary:'Severity, ownership, communication and post-incident learning in cross-functional operations.',read:'8 min'},
  {slug:'kyc-basics-for-non-compliance-teams',category:'Compliance',title:'KYC Basics for Non-Compliance Teams',summary:'What employees should understand about identity verification and escalation boundaries.',read:'7 min'},
  {slug:'reading-business-metrics',category:'Data',title:'How to Read Business Metrics Responsibly',summary:'A practical guide to definitions, context, comparability and common reporting mistakes.',read:'5 min'},
  {slug:'how-to-map-stakeholders',category:'Project Management',title:'How to Map Project Stakeholders',summary:'A straightforward framework for identifying owners, dependencies and decision makers.',read:'7 min'},
  {slug:'supplier-management',category:'Operations',title:'A Practical Supplier Management Framework',summary:'How to define ownership, service reviews, issues, dependencies and escalation paths.',read:'8 min'},
  {slug:'new-hire-learning-plan',category:'Career',title:'A 30-Day Learning Plan for New Employees',summary:'A structured first-month path covering operating context, role knowledge, controls and collaboration.',read:'6 min'},
  {slug:'product-launch-checklist',category:'Product',title:'What Belongs in a Launch Checklist?',summary:'The major readiness areas product and project teams should coordinate before go-live.',read:'9 min'},
  {slug:'build-company-academy',category:'Learning & Development',title:'How to Build an Internal Company Academy',summary:'A framework for combining professional foundations with company-specific products, tools and processes.',read:'10 min'}
];

export const certificates = [
  {id:'OA-OF-2026-01842',name:'Alex Morgan',program:'Operations Foundation',issued:'18 July 2026',score:'91%',status:'Verified'},
  {id:'OA-PM-2026-00611',name:'Maya Chen',program:'Project Delivery Professional',issued:'02 August 2026',score:'88%',status:'Verified'}
];

export const company = {
  name:'Demo Operations Co.',seats:75,employees:47,activeLearners:39,averageCompletion:72,certificates:61,coursesAssigned:14,learningHours:416,
  teams:[
    {name:'New Employees',members:9,completion:92,assignment:'New to Operations'},
    {name:'Product',members:12,completion:76,assignment:'Product Professional'},
    {name:'Operations',members:14,completion:81,assignment:'Operations Professional'},
    {name:'Customer Support',members:12,completion:68,assignment:'Operations Foundations'}
  ],
  employeesList:[
    {name:'Nina Petrović',email:'nina@example.com',team:'Product',progress:83,certificate:'Foundation'},
    {name:'Marco Silva',email:'marco@example.com',team:'Operations',progress:74,certificate:'Foundation'},
    {name:'Ana Kovač',email:'ana@example.com',team:'Customer Support',progress:61,certificate:'—'},
    {name:'Daniel Lee',email:'daniel@example.com',team:'Product',progress:92,certificate:'Product'},
    {name:'Sara Ahmed',email:'sara@example.com',team:'New Employees',progress:100,certificate:'Foundation'},
    {name:'Luka Jovanović',email:'luka@example.com',team:'Operations',progress:48,certificate:'—'}
  ],
  assignments:[
    {title:'New Hire Foundation',audience:'New Employees',content:'New to Operations',due:'Aug 21, 2026',completion:92},
    {title:'Product Core',audience:'Product',content:'Product Professional',due:'Aug 31, 2026',completion:76},
    {title:'Operations Core',audience:'Operations',content:'Operations Professional',due:'Sep 04, 2026',completion:81}
  ]
};

export const assessmentQuestions = {
  'operations-foundations':[
    {question:'Why is cross-functional awareness important in modern operations?',options:['Because every department performs the same tasks','Because product, technology, controls and operations depend on one another','Because suppliers replace internal ownership'],correct:1,explanation:'Complex services are interconnected, so decisions and incidents often cross team and supplier boundaries.'},
    {question:'What should happen when a potential control or compliance issue is unclear?',options:['Resolve it privately without documentation','Escalate through the approved risk or compliance process','Ignore it until a customer raises it again'],correct:1,explanation:'Employees should follow approved escalation and documentation procedures rather than make unsupported control decisions.'},
    {question:'Which statement best describes operational ownership?',options:['Owning every task personally','Ensuring the right owner, process and outcome are clear','Avoiding escalation to keep metrics low'],correct:1,explanation:'Operational ownership is about clear accountability, coordination and outcomes.'}
  ]
};

export const getPath=slug=>learningPaths.find(path=>path.slug===slug);
