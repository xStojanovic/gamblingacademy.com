export async function askTutor(question,context={}){
 const res=await fetch('/api/ai/tutor',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({question,context})});
 const data=await res.json(); if(!res.ok) throw new Error(data.error||'Tutor unavailable'); return data;
}
