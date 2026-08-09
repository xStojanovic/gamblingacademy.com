export async function login(email,password,role='learner'){
  const res=await fetch('/api/auth/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email,password,role})});
  const data=await res.json().catch(()=>({})); if(!res.ok) throw new Error(data.error||'Login failed'); return data;
}
export async function logout(){await fetch('/api/auth/logout',{method:'POST'});location.href='/login'}
export async function getSession(){const res=await fetch('/api/auth/session',{cache:'no-store'});return res.json()}
