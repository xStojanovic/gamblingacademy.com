'use client';
import {useEffect,useMemo,useState} from 'react';
import {createLearnerSeed} from '@/modules/learner/data/seed';
import {loadLearnerState,saveProgress,createGoal,saveGoal,readNotification,saveProfile,saveResource} from '@/modules/learner/services/learnerRepository';

const KEY='opsacademy-learning-v5';
const seed=createLearnerSeed();

export function useLearning(){
  const [data,setData]=useState(seed);const [ready,setReady]=useState(false);
  useEffect(()=>{
    let active=true;
    try{const s=localStorage.getItem(KEY);if(s)setData({...seed,...JSON.parse(s)});}catch(e){}
    setReady(true);
    loadLearnerState().then(remote=>{if(active&&remote)setData(d=>({...d,...remote,profile:remote.profile?{...d.profile,name:remote.profile.full_name||d.profile.name,email:remote.profile.email||d.profile.email,locale:remote.profile.locale||d.profile.locale,timezone:remote.profile.timezone||d.profile.timezone,...(remote.profile.preferences||{})}:d.profile}));});
    return()=>{active=false};
  },[]);
  useEffect(()=>{if(ready)localStorage.setItem(KEY,JSON.stringify(data))},[data,ready]);

  const api=useMemo(()=>({
    setCourseProgress:(slug,pct,lessons)=>{setData(d=>({...d,progress:{...d.progress,[slug]:pct},completedLessons:{...d.completedLessons,[slug]:lessons??d.completedLessons[slug]}}));void saveProgress(slug,pct,lessons);},
    toggleResource:slug=>{const nextSaved=!data.savedResources.includes(slug);setData(d=>({...d,savedResources:nextSaved?[...d.savedResources,slug]:d.savedResources.filter(x=>x!==slug)}));void saveResource(slug,nextSaved);},
    setAssessment:(slug,score,program,credentialId)=>setData(d=>{const id=credentialId||`OA-${slug==='operations-foundations'?'OF':'PR'}-${new Date().getFullYear()}-${String(Date.now()).slice(-5)}`;const passed=score>=80;const exists=d.certificates.some(c=>c.program===program);return {...d,assessmentScores:{...d.assessmentScores,[slug]:score},certificates:passed&&!exists?[...d.certificates,{id,program,score:`${score}%`,issued:new Date().toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'})}]:d.certificates}}),
    updateProfile:p=>{setData(d=>({...d,profile:{...d.profile,...p}}));void saveProfile(p);},
    addGoal:g=>{const goal={id:`g-${Date.now()}`,status:'Planned',progress:0,...g};setData(d=>({...d,goals:[goal,...d.goals]}));void createGoal(goal);},
    updateGoal:(id,p)=>{setData(d=>({...d,goals:d.goals.map(g=>g.id===id?{...g,...p}:g)}));void saveGoal(id,p);},
    markNotification:(id)=>{setData(d=>({...d,notifications:d.notifications.map(n=>n.id===id?{...n,read:true}:n)}));void readNotification(id,false);},
    markAllNotifications:()=>{setData(d=>({...d,notifications:d.notifications.map(n=>({...n,read:true}))}));void readNotification(null,true);},
    reset:()=>setData(createLearnerSeed())
  }),[data.savedResources]);
  return {data,ready,...api};
}
