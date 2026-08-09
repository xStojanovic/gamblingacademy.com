import {courses,learningPaths,resources,knowledgeArticles,certificates} from '@/modules/learning/data/catalog';
import {locales} from '@/modules/localization/config/locales';

const now='Aug 9, 2026';
export function createAdminSeed(){return {
  courses:courses.map((c,i)=>({...c,id:c.slug,status:i<8?'Published':i<10?'Review':'Draft',price:i===0?0:149+i*10,enrollments:420-i*17,completion:68+(i%5)*4,rating:(4.5+(i%4)*.1).toFixed(1),updated:i<2?'Today':now,owner:i%2?'Maya Editor':'Stefan Admin',certificate:i!==2,language:'English',version:i<8?'1.0':'0.9',reviewer:i%3===0?'Alex Reviewer':'Maya Editor',publishedAt:i<8?'2026-08-01':null})),
  paths:learningPaths.map((p,i)=>({...p,id:p.slug,status:'Published',learners:190-i*21,updated:now})),
  assessments:[
    {id:'as-1',title:'Operations Foundations Final Assessment',course:'Operations Foundations',questions:30,passing:80,attempts:682,passRate:84,status:'Published'},
    {id:'as-2',title:'Product Fundamentals Assessment',course:'Product Management Foundations',questions:24,passing:80,attempts:291,passRate:79,status:'Published'},
    {id:'as-3',title:'Operations Scenario Assessment',course:'Service Operations',questions:20,passing:80,attempts:266,passRate:82,status:'Published'},
    {id:'as-4',title:'Leadership Case Review',course:'Leadership in Operations Organizations',questions:12,passing:75,attempts:37,passRate:73,status:'Draft'}
  ],
  reviews:[
    {id:'rv-1',type:'Course',item:'Leadership in Operations Organizations',submittedBy:'Maya Editor',reviewer:'Alex Reviewer',status:'In review',priority:'High',submitted:'Today'},
    {id:'rv-2',type:'Article',item:'KYC Basics for Non-Compliance Teams',submittedBy:'Stefan Admin',reviewer:'Alex Reviewer',status:'Changes requested',priority:'High',submitted:'Yesterday'},
    {id:'rv-3',type:'Lesson',item:'Payments / Chargebacks and disputes',submittedBy:'Maya Editor',reviewer:'Stefan Admin',status:'Ready for review',priority:'Normal',submitted:'Aug 7'}
  ],
  resources:resources.map((r,i)=>({...r,id:r.slug||`res-${i}`,status:i<16?'Published':'Draft',downloads:120+i*17,updated:now})),
  media:[
    {id:'md-1',name:'operations-ecosystem-map.svg',type:'Diagram',size:'184 KB',usage:4,status:'Ready',updated:'Today'},
    {id:'md-2',name:'course-cover-product.webp',type:'Image',size:'264 KB',usage:2,status:'Ready',updated:'Yesterday'},
    {id:'md-3',name:'fundamentals-intro.mp4',type:'Video',size:'186 MB',usage:1,status:'Processing',updated:'Today'},
    {id:'md-4',name:'incident-management.pdf',type:'PDF',size:'1.8 MB',usage:3,status:'Ready',updated:'Aug 6'}
  ],
  knowledge:knowledgeArticles.map((a,i)=>({...a,id:a.slug,status:i<9?'Published':'Draft',views:350+i*73,seoScore:76+(i%5)*4,updated:now})),
  certificates:certificates.map((c,i)=>({...c,id:c.id||`cert-${i}`,status:'Valid',issued:220+i*71,expires:'No expiry'})),
  companies:[
    {id:'co-1',name:'Demo Operations Co.',plan:'Business',seats:75,used:47,mrr:825,status:'Active',renewal:'May 12, 2027',admin:'people@demoops.example',health:91,lifecycle:'Customer',owner:'Mila Customer Success',nextReview:'Sep 15, 2026',lastContact:'Aug 7, 2026',openTickets:1,adoption:88,renewalRisk:'Low'},
    {id:'co-2',name:'Northstar Services',plan:'Team',seats:25,used:23,mrr:408,status:'Active',renewal:'Jan 8, 2027',admin:'hr@northstar.example',health:78,lifecycle:'Customer',owner:'Mila Customer Success',nextReview:'Aug 28, 2026',lastContact:'Aug 3, 2026',openTickets:0,adoption:73,renewalRisk:'Medium'},
    {id:'co-3',name:'Nova Systems',plan:'Scale',seats:200,used:154,mrr:1658,status:'Active',renewal:'Mar 2, 2027',admin:'learning@nova.example',health:86,lifecycle:'Customer',owner:'Stefan Admin',nextReview:'Oct 2, 2026',lastContact:'Aug 8, 2026',openTickets:1,adoption:82,renewalRisk:'Low'},
    {id:'co-4',name:'Orbit Studio',plan:'Pilot',seats:10,used:8,mrr:0,status:'Pilot',renewal:'Sep 2, 2026',admin:'ops@orbitstudio.example',health:72,lifecycle:'Pilot',owner:'Stefan Admin',nextReview:'Aug 20, 2026',lastContact:'Aug 9, 2026',openTickets:0,adoption:64,renewalRisk:'Medium'}
  ],
  learners:[
    {id:'l-1',name:'Stefan Learner',email:'stefan@example.com',company:'Individual',plan:'Professional',courses:6,certificates:2,lastActive:'Today',status:'Active'},
    {id:'l-2',name:'Ana Petrović',email:'ana@demoops.example',company:'Demo Operations Co.',plan:'Company',courses:4,certificates:1,lastActive:'Today',status:'Active'},
    {id:'l-3',name:'Marco Silva',email:'marco@nova.example',company:'Nova Systems',plan:'Company',courses:8,certificates:4,lastActive:'Yesterday',status:'Active'},
    {id:'l-4',name:'Elena Ivanova',email:'elena@northstar.example',company:'Northstar Services',plan:'Company',courses:3,certificates:1,lastActive:'3 days ago',status:'Active'}
  ],
  instructors:[
    {id:'i-1',name:'Stefan Stojanović',title:'Operations & Product',courses:5,role:'Lead Faculty',status:'Active',reviewQueue:2},
    {id:'i-2',name:'Maya Reed',title:'CRM & Customer Operations',courses:3,role:'Instructor',status:'Active',reviewQueue:1},
    {id:'i-3',name:'Alex Morgan',title:'Payments & Compliance',courses:4,role:'Expert Reviewer',status:'Active',reviewQueue:4}
  ],
  plans:[
    {id:'p-free',name:'Free',audience:'Individual',price:'€0',billing:'Forever',members:412,features:'Starter course, glossary, limited resources',status:'Active'},
    {id:'p-pro',name:'Professional',audience:'Individual',price:'€29',billing:'Monthly',members:126,features:'All core courses, paths, certificates, resources',status:'Active'},
    {id:'p-team',name:'Team',audience:'Company',price:'€4,900',billing:'Yearly',members:7,features:'25 seats, reporting, assignments',status:'Active'},
    {id:'p-business',name:'Business',audience:'Company',price:'€9,900',billing:'Yearly',members:4,features:'75 seats, advanced reporting, custom paths',status:'Active'},
    {id:'p-scale',name:'Scale',audience:'Company',price:'€19,900',billing:'Yearly',members:2,features:'200 seats, onboarding programs, reviews',status:'Active'}
  ],

  accountNotes:[
    {id:'note-1',companyId:'co-1',author:'Mila Customer Success',body:'Quarterly review scheduled. Team asked for a manager onboarding path and more granular completion exports.',created:'Aug 7, 2026',type:'Customer success'},
    {id:'note-2',companyId:'co-1',author:'Stefan Admin',body:'Business plan renewed verbally; confirm procurement timeline before the next billing cycle.',created:'Aug 2, 2026',type:'Commercial'},
    {id:'note-3',companyId:'co-2',author:'Mila Customer Success',body:'High seat utilization. Recommend Business plan if the next hiring cohort is approved.',created:'Aug 5, 2026',type:'Expansion'}
  ],
  support:[
    {id:'sp-1042',subject:'Employee invitation not received',customer:'Demo Operations Co.',priority:'Normal',status:'Open',owner:'Support Admin',updated:'12 min ago'},
    {id:'sp-1041',subject:'Certificate name correction',customer:'Individual learner',priority:'Low',status:'Waiting on customer',owner:'Maya Editor',updated:'1 hour ago'},
    {id:'sp-1038',subject:'SSO domain verification',customer:'Nova Systems',priority:'High',status:'In progress',owner:'Stefan Admin',updated:'Yesterday'}
  ],
  pages:[
    {id:'pg-home',title:'Home',slug:'/',template:'Landing',nav:'Main',status:'Published',seoTitle:'OpsAcademy — Professional Operations Education',updated:'Today'},
    {id:'pg-courses',title:'Courses',slug:'/courses',template:'Catalogue',nav:'Main',status:'Published',seoTitle:'Operations Courses | OpsAcademy',updated:now},
    {id:'pg-companies',title:'For Companies',slug:'/for-companies',template:'B2B Landing',nav:'Main',status:'Published',seoTitle:'Corporate Operations Training',updated:now},
    {id:'pg-about',title:'About',slug:'/about',template:'Content',nav:'Footer',status:'Published',seoTitle:'About OpsAcademy',updated:now}
  ],
  navigation:[
    {id:'nav-1',label:'Courses',href:'/courses',location:'Main',order:1,visible:true},
    {id:'nav-2',label:'Learning Paths',href:'/learning-paths',location:'Main',order:2,visible:true},
    {id:'nav-3',label:'For Companies',href:'/for-companies',location:'Main',order:3,visible:true},
    {id:'nav-4',label:'Certifications',href:'/certifications',location:'Main',order:4,visible:true},
    {id:'nav-5',label:'Resources',href:'/resources',location:'Main',order:5,visible:true},
    {id:'nav-6',label:'Knowledge Hub',href:'/knowledge',location:'Main',order:6,visible:true}
  ],
  emailTemplates:[
    {id:'em-1',name:'Welcome / Account Created',trigger:'User created',subject:'Welcome to OpsAcademy',status:'Active',sent:884,openRate:'64%'},
    {id:'em-2',name:'Course Assigned',trigger:'Assignment created',subject:'A new course has been assigned to you',status:'Active',sent:521,openRate:'71%'},
    {id:'em-3',name:'Certificate Earned',trigger:'Assessment passed',subject:'Your OpsAcademy certificate is ready',status:'Active',sent:303,openRate:'78%'},
    {id:'em-4',name:'Incomplete Learning Reminder',trigger:'7 days inactive',subject:'Continue your learning path',status:'Draft',sent:0,openRate:'—'}
  ],
  announcements:[
    {id:'an-1',title:'New Operations learning path available',audience:'All learners',channel:'In-app + email',status:'Scheduled',publishAt:'Aug 12, 2026'},
    {id:'an-2',title:'Company reporting update',audience:'Company admins',channel:'In-app',status:'Draft',publishAt:'—'}
  ],
  integrations:[
    {id:'int-supabase',name:'Supabase',category:'Database & Auth',status:'Needs credentials',environment:'Production',lastSync:'—'},
    {id:'int-stripe',name:'Stripe',category:'Billing',status:'Needs credentials',environment:'Production',lastSync:'—'},
    {id:'int-resend',name:'Resend',category:'Email',status:'Needs credentials',environment:'Production',lastSync:'—'},
    {id:'int-mux',name:'Mux / Vimeo',category:'Video',status:'Needs credentials',environment:'Production',lastSync:'—'},
    {id:'int-posthog',name:'PostHog',category:'Analytics',status:'Needs credentials',environment:'Production',lastSync:'—'},
    {id:'int-hubspot',name:'HubSpot',category:'CRM',status:'Optional',environment:'Production',lastSync:'—'}
  ],
  featureFlags:[
    {id:'ff-ai',name:'Ask OpsAcademy AI Tutor',key:'ai_tutor',enabled:true,scope:'All learners',description:'AI answers constrained to reviewed Academy content.'},
    {id:'ff-company',name:'Custom Company Academy',key:'company_academy',enabled:true,scope:'Business & Scale',description:'Private company learning modules and internal onboarding.'},
    {id:'ff-community',name:'Professional Community',key:'community',enabled:false,scope:'Beta',description:'Professional peer discussion and expert Q&A.'},
    {id:'ff-jobs',name:'Career & Job Board',key:'jobs',enabled:false,scope:'Beta',description:'Career opportunities connected to learning profiles.'},
    {id:'ff-localization',name:'Localized Learning',key:'localized_learning',enabled:true,scope:'Beta',description:'Localized course metadata and translated content.'}
  ],
  roles:[
    {id:'r-super',name:'Super Admin',users:1,permissions:'All platform permissions',system:true},
    {id:'r-content',name:'Content Admin',users:2,permissions:'Courses, paths, resources, knowledge, certificates',system:false},
    {id:'r-commercial',name:'Commercial Admin',users:1,permissions:'Companies, learners, billing, plans',system:false},
    {id:'r-reviewer',name:'Expert Reviewer',users:3,permissions:'Review assigned course content',system:false},
    {id:'r-support',name:'Support Admin',users:1,permissions:'Users, companies, certificates; read-only billing',system:false}
  ],
  localization:locales.map((x,i)=>({...x,id:`loc-${x.code}`,courses:i===0?12:i===1?4:1,articles:i===0?12:i===1?3:0,lastUpdated:i<2?'Today':'—'})),
  enterprise:{ssoEnabled:true,scimEnabled:true,domainVerification:true,customRetention:true,ipAllowlist:false,dataResidency:'EU',sessionTimeout:'8 hours'},
  imports:[
    {id:'im-1',type:'Learner CSV',customer:'Demo Operations Co.',rows:47,status:'Completed',created:'Aug 8, 2026'},
    {id:'im-2',type:'Course metadata',customer:'Platform',rows:12,status:'Validated',created:'Aug 9, 2026'}
  ],
  apiKeys:[
    {id:'key-1',name:'Reporting API — Nova Systems',prefix:'oa_live_•••91K2',scope:'reports:read users:read',created:'Jul 22, 2026',lastUsed:'Today',status:'Active'}
  ],
  webhooks:[
    {id:'wh-1',name:'Certificate issued → HRIS',url:'https://example.invalid/webhook',events:'certificate.issued',status:'Paused',lastDelivery:'—'},
    {id:'wh-2',name:'Learning completion → CRM',url:'https://example.invalid/learning',events:'course.completed,path.completed',status:'Draft',lastDelivery:'—'}
  ],
  backups:[
    {id:'bk-1',type:'Platform export',scope:'All metadata',created:'Aug 9, 2026',size:'2.4 MB',status:'Ready'},
    {id:'bk-2',type:'Audit export',scope:'90 days',created:'Aug 1, 2026',size:'620 KB',status:'Ready'}
  ],
  activity:[
    {id:'act-1',time:'Now',event:'Course completed',detail:'Ana Petrović completed Operations Foundations',type:'Learning'},
    {id:'act-2',time:'4 min',event:'Company admin login',detail:'Demo Operations Co.',type:'Security'},
    {id:'act-3',time:'12 min',event:'Assessment passed',detail:'Marco Silva · 88%',type:'Assessment'},
    {id:'act-4',time:'22 min',event:'Content updated',detail:'Product Fundamentals / Requirements',type:'Content'}
  ],
  community:[
    {id:'cm-1',title:'How do you document cross-team incident ownership?',author:'Maya Reed',topic:'Operations',reports:0,status:'Published',created:'Today'},
    {id:'cm-2',title:'Best way to map provider dependencies?',author:'Nina Petrović',topic:'Product',reports:1,status:'Published',created:'Yesterday'}
  ],
  jobs:[
    {id:'job-1',title:'Product Manager — Service Platform',company:'Example Platform Co.',location:'Remote / Europe',type:'Full-time',status:'Draft'},
    {id:'job-2',title:'Operations Specialist',company:'Example Services Co.',location:'Malta / Hybrid',type:'Full-time',status:'Draft'}
  ],
  audit:[
    {id:'a1',time:'00:31',actor:'Stefan Admin',action:'Published course',target:'Operations Foundations',ip:'Admin session'},
    {id:'a2',time:'00:14',actor:'Maya Editor',action:'Updated lesson',target:'Product Fundamentals / Module 3',ip:'Admin session'},
    {id:'a3',time:'Yesterday',actor:'System',action:'Issued certificate',target:'OA-2026-01084',ip:'Automation'},
    {id:'a4',time:'Yesterday',actor:'Stefan Admin',action:'Changed plan',target:'Demo Operations Co. → Business',ip:'Admin session'}
  ],
  seo:{siteTitle:'OpsAcademy',titleTemplate:'%s | OpsAcademy',description:'Professional education for people and companies working in operations.',canonical:'https://opsacademy.example',indexing:true,sitemap:true,robots:true,ogImage:'/og-default.png',schemaOrg:true,aiDiscovery:true,llmsTxt:true},
  branding:{logoText:'OpsAcademy',primary:'#4BE1A0',secondary:'#7C8CFF',lightLogo:'OpsAcademy',darkLogo:'OpsAcademy',favicon:'OA',radius:'16',font:'Geist / Inter',defaultTheme:'System'},
  settings:{siteName:'OpsAcademy',supportEmail:'support@opsacademy.example',salesEmail:'sales@opsacademy.example',defaultLocale:'English',timezone:'Europe/Belgrade',certificatePrefix:'OA',passingScore:80,selfSignup:true,maintenance:false,tutor:true,publicProfiles:false,requireEmailVerification:true,dataRetentionDays:3650,sessionTimeoutHours:8},
  system:{api:'Healthy',database:'Configuration required',auth:'Configuration required',storage:'Demo/local',video:'Configuration required',email:'Configuration required',billing:'Configuration required',ai:'Local fallback',analytics:'Local fallback',lastBackup:'Demo mode',version:'Platform V5 Production Core'}
}}
