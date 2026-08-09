async function jsonFetch(url,options={}){try{const res=await fetch(url,{...options,headers:{'Content-Type':'application/json',...(options.headers||{})},cache:'no-store'});const json=await res.json();return res.ok?json:null}catch(e){return null}}
export async function loadCompanyState(){const r=await jsonFetch('/api/company/state');return r?.demo?null:r?.data||null;}
export function createTeam(team){return jsonFetch('/api/company/teams',{method:'POST',body:JSON.stringify(team)});}
export function createAssignment(assignment){return jsonFetch('/api/company/assignments',{method:'POST',body:JSON.stringify(assignment)});}
export function createCompanyModule(module){return jsonFetch('/api/company/modules',{method:'POST',body:JSON.stringify(module)});}
export function saveCompanyModule(id,patch){return jsonFetch(`/api/company/modules/${id}`,{method:'PATCH',body:JSON.stringify(patch)});}
export function saveCompanySettings(settings){return jsonFetch('/api/company/settings',{method:'PATCH',body:JSON.stringify(settings)});}
export function inviteEmployee(invite){return jsonFetch('/api/company/invitations',{method:'POST',body:JSON.stringify(invite)});}
export function removeCompanyEmployee(email){return jsonFetch(`/api/company/employees?email=${encodeURIComponent(email)}`,{method:'DELETE'});}
export function saveSsoSettings(settings){return jsonFetch('/api/company/sso',{method:'PATCH',body:JSON.stringify(settings)});}
