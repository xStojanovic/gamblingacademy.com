'use client';
import {useEffect,useMemo,useState} from 'react';
import {createCompanySeed} from '@/modules/company/data/seed';
import {loadCompanyState,createTeam,createAssignment,createCompanyModule,saveCompanyModule,saveCompanySettings,inviteEmployee,removeCompanyEmployee,saveSsoSettings} from '@/modules/company/services/companyRepository';

const KEY='opsacademy-company-v5';const seed=createCompanySeed();
export function useCompany(){
  const [data,setData]=useState(seed);const [ready,setReady]=useState(false);
  useEffect(()=>{let active=true;try{const s=localStorage.getItem(KEY);if(s)setData({...seed,...JSON.parse(s)})}catch(e){}setReady(true);loadCompanyState().then(remote=>{if(active&&remote)setData(d=>({...d,...remote,settings:{...d.settings,...(remote.settings||{})},billing:remote.billing?{...d.billing,...remote.billing}:d.billing,sso:remote.sso?{...d.sso,...remote.sso}:d.sso}))});return()=>{active=false}},[]);
  useEffect(()=>{if(ready)localStorage.setItem(KEY,JSON.stringify(data))},[data,ready]);
  const api=useMemo(()=>({
    addEmployee:e=>{setData(d=>({...d,employeesList:[{...e,status:'Invited'},...d.employeesList],employees:d.employees+1}));return inviteEmployee(e);},
    addEmployees:list=>{setData(d=>({...d,employeesList:[...list.map(x=>({...x,status:'Invited'})),...d.employeesList],employees:d.employees+list.length,imports:[{id:`im-${Date.now()}`,rows:list.length,status:'Imported',date:new Date().toLocaleDateString()},...(d.imports||[])]}));return Promise.all(list.map(inviteEmployee));},
    removeEmployee:email=>{setData(d=>({...d,employeesList:d.employeesList.filter(e=>e.email!==email),employees:Math.max(0,d.employees-1)}));void removeCompanyEmployee(email);},
    addTeam:t=>{setData(d=>({...d,teams:[...d.teams,t]}));void createTeam(t);},
    addAssignment:a=>{setData(d=>({...d,assignments:[a,...d.assignments]}));void createAssignment(a);},
    addModule:m=>{setData(d=>({...d,academyModules:[m,...d.academyModules]}));void createCompanyModule(m);},
    updateModule:(id,p)=>{setData(d=>({...d,academyModules:d.academyModules.map(m=>m.id===id?{...m,...p}:m)}));void saveCompanyModule(id,p);},
    updateSettings:p=>{setData(d=>({...d,settings:{...d.settings,...p}}));void saveCompanySettings(p);},
    updateSso:p=>{setData(d=>({...d,sso:{...d.sso,...p}}));void saveSsoSettings({...data.sso,...p});},
    setSeatLimit:n=>setData(d=>({...d,billing:{...d.billing,seatLimit:n},seats:n})),
    reset:()=>setData(createCompanySeed())
  }),[data.sso]);
  return {data,ready,...api};
}
