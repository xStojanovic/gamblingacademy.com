import {company as seedCompany} from '@/modules/learning/data/catalog';
export function createCompanySeed(){return {...seedCompany,
 certificates:[
  {id:'OA-OF-2026-02019',name:'Sara Ahmed',program:'Industry Foundation',issued:'Aug 06, 2026',score:'94%'},
  {id:'OA-PD-2026-01942',name:'Daniel Lee',program:'Product Foundation',issued:'Aug 02, 2026',score:'91%'},
  {id:'OA-OF-2026-01873',name:'Nina Petrović',program:'Industry Foundation',issued:'Jul 29, 2026',score:'89%'}
 ],
 academyModules:[
  {id:'m1',title:'Welcome to Demo Operations Co.',audience:'All employees',type:'Onboarding',status:'Published'},
  {id:'m2',title:'How Our Product Works',audience:'All employees',type:'Company context',status:'Published'},
  {id:'m3',title:'Internal Operations & Escalations',audience:'Operations',type:'Process',status:'Draft'},
  {id:'m4',title:'Approved Tools & Systems',audience:'All employees',type:'Tools',status:'Draft'},
  {id:'m5',title:'Compliance Procedures',audience:'All employees',type:'Compliance',status:'Review required'}
 ],
 integrations:[
  {name:'Google Workspace',type:'SSO / Directory',status:'Connected'},
  {name:'Slack',type:'Notifications',status:'Available'},
  {name:'Microsoft Entra ID',type:'SSO / Directory',status:'Available'},
  {name:'HRIS API',type:'Employee provisioning',status:'Planned'}
 ],
 imports:[],
 sso:{provider:'Google Workspace',enabled:true,verifiedDomain:'demo-ops.example',scim:false,autoProvision:true,defaultTeam:'New Employees',defaultPath:'New to Operations'},
 billing:{plan:'Business',renewal:'July 31, 2027',annualPrice:'€9,900',payment:'•••• 4242',seatLimit:75,stripeCustomerId:''},
 settings:{companyName:'Demo Operations Co.',academyName:'Demo Operations Co. Academy',domain:'demo-ops.example',reminders:true,managerReports:true,certificateEmails:true,logo:'DG',primary:'#7C8CFF',defaultLocale:'English'}
}}
