import {env} from '@/modules/infrastructure/config/env';

function baseHeaders(service=true){
  const key=service?env.supabaseServiceRoleKey:env.supabaseAnonKey;
  return {'apikey':key,'Authorization':`Bearer ${key}`,'Content-Type':'application/json'};
}

export async function dbSelect(table,query='select=*'){
  if(!env.supabaseUrl||!env.supabaseServiceRoleKey) return {ok:false,demo:true,data:[]};
  const res=await fetch(`${env.supabaseUrl}/rest/v1/${table}?${query}`,{headers:baseHeaders(),cache:'no-store'});
  return {ok:res.ok,status:res.status,data:res.ok?await res.json():[],error:res.ok?null:await res.text()};
}
export async function dbInsert(table,payload){
  if(!env.supabaseUrl||!env.supabaseServiceRoleKey) return {ok:false,demo:true,data:payload};
  const res=await fetch(`${env.supabaseUrl}/rest/v1/${table}`,{method:'POST',headers:{...baseHeaders(),'Prefer':'return=representation'},body:JSON.stringify(payload)});
  return {ok:res.ok,status:res.status,data:res.ok?await res.json():null,error:res.ok?null:await res.text()};
}
export async function dbUpdate(table,filter,payload){
  if(!env.supabaseUrl||!env.supabaseServiceRoleKey) return {ok:false,demo:true,data:payload};
  const res=await fetch(`${env.supabaseUrl}/rest/v1/${table}?${filter}`,{method:'PATCH',headers:{...baseHeaders(),'Prefer':'return=representation'},body:JSON.stringify(payload)});
  return {ok:res.ok,status:res.status,data:res.ok?await res.json():null,error:res.ok?null:await res.text()};
}
export async function dbDelete(table,filter){
  if(!env.supabaseUrl||!env.supabaseServiceRoleKey) return {ok:false,demo:true};
  const res=await fetch(`${env.supabaseUrl}/rest/v1/${table}?${filter}`,{method:'DELETE',headers:baseHeaders()});
  return {ok:res.ok,status:res.status,error:res.ok?null:await res.text()};
}
