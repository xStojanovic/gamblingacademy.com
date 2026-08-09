export async function sendNotification(template,to,variables={}){
 const res=await fetch('/api/notifications/send',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({template,to,variables})});
 return res.json();
}
