export async function startCheckout(planId,companyId){
 const res=await fetch('/api/billing/checkout',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({planId,companyId})});
 const data=await res.json(); if(!res.ok) throw new Error(data.error||'Unable to start checkout'); if(data.url) location.href=data.url; return data;
}
export async function openBillingPortal(companyId){
 const res=await fetch('/api/billing/portal',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({companyId})});
 const data=await res.json(); if(!res.ok) throw new Error(data.error||'Unable to open billing portal'); if(data.url) location.href=data.url; return data;
}
