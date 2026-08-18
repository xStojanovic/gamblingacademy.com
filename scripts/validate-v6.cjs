const fs=require('fs');const path=require('path');
const root=path.resolve(__dirname,'..');let failures=[];
function check(ok,msg){if(!ok)failures.push(msg)}
const pkg=JSON.parse(fs.readFileSync(path.join(root,'package.json'),'utf8'));
check(pkg.dependencies?.next==='15.5.21',`Expected Next.js 15.5.21, got ${pkg.dependencies?.next}`);
check(pkg.dependencies?.react==='19.2.6',`Expected React 19.2.6, got ${pkg.dependencies?.react}`);
check(pkg.engines?.node==='22.x',`Expected Node engine 22.x, got ${pkg.engines?.node}`);
const pathCard=fs.readFileSync(path.join(root,'modules/public/components/PathCard.js'),'utf8');
check(!/\{c\}<\/div>/.test(pathCard),'Legacy raw course-object rendering is still present in PathCard');
check(pathCard.includes('normalizePathCourse'),'PathCard defensive normalization missing');
const required=[
 'app/admin/cohorts/page.js','app/admin/white-label/page.js','app/admin/sales/page.js','app/admin/interoperability/page.js','app/admin/quality/page.js','app/admin/scheduled-reports/page.js',
 'app/company/cohorts/page.js','app/company/white-label/page.js','app/company/reports/scheduled/page.js','app/dashboard/cohorts/page.js',
 'db/migrations/014_v6_sellable_beta.sql'
];
for(const f of required)check(fs.existsSync(path.join(root,f)),`Missing V6 file: ${f}`);
const routes=fs.readFileSync(path.join(root,'modules/shared/config/routes.js'),'utf8');
for(const href of ['/admin/cohorts','/admin/white-label','/admin/sales','/admin/interoperability','/admin/quality','/admin/scheduled-reports','/company/cohorts','/company/white-label','/dashboard/cohorts'])check(routes.includes(href),`Navigation route missing: ${href}`);
if(failures.length){console.error(`V6 validation failed (${failures.length})`);failures.forEach(x=>console.error(' - '+x));process.exit(1)}
console.log('V6 production-core validation: PASS');
console.log(`Next.js ${pkg.dependencies.next} · React ${pkg.dependencies.react} · Node ${pkg.engines.node}`);
console.log(`${required.length} required V6 assets confirmed`);
