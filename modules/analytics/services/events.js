export function track(name,properties={}){
  if(typeof window==='undefined') return;
  const event={name,properties,at:new Date().toISOString(),path:location.pathname};
  try{const key='opsacademy-analytics-events';const items=JSON.parse(localStorage.getItem(key)||'[]');localStorage.setItem(key,JSON.stringify([event,...items].slice(0,500)));}catch(e){}
  try{navigator.sendBeacon?.('/api/analytics/event',new Blob([JSON.stringify(event)],{type:'application/json'}));}catch(e){}
}
