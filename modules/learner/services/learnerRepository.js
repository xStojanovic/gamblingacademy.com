export async function loadLearnerState(){const res=await fetch('/api/learner/state',{cache:'no-store'});if(!res.ok)return null;const json=await res.json();return json.demo?null:json.data||null;}
export function saveProgress(slug,progressPercent,completedLessons){return fetch('/api/learner/progress',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({slug,progressPercent,completedLessons})}).catch(()=>null);}
export function createGoal(goal){return fetch('/api/learner/goals',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(goal)}).catch(()=>null);}
export function saveGoal(id,patch){return fetch('/api/learner/goals',{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({id,...patch})}).catch(()=>null);}
export function readNotification(id,all=false){return fetch('/api/learner/notifications',{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({id,all})}).catch(()=>null);}

export function saveProfile(patch){return fetch('/api/learner/profile',{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify(patch)}).catch(()=>null);}
export function saveResource(slug,saved){return fetch('/api/learner/resources',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({slug,saved})}).catch(()=>null);}
