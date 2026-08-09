'use client';
import {useEffect,useMemo,useState} from 'react';
import {createAdminSeed} from '@/modules/admin/data/seed';
const KEY='opsacademy-owner-admin-v5';
const seed=createAdminSeed();
export function useAdmin(){
 const [data,setData]=useState(seed); const [ready,setReady]=useState(false);
 useEffect(()=>{try{const saved=localStorage.getItem(KEY);if(saved)setData({...seed,...JSON.parse(saved)});}catch(e){}setReady(true)},[]);
 useEffect(()=>{if(ready)localStorage.setItem(KEY,JSON.stringify(data));},[data,ready]);
 const api=useMemo(()=>({
  setCollection:(key,value)=>setData(d=>({...d,[key]:value})),
  addItem:(key,item)=>setData(d=>({...d,[key]:[{id:item.id||`${key}-${Date.now()}`,...item},...(d[key]||[])]})),
  updateItem:(key,id,patch)=>setData(d=>({...d,[key]:(d[key]||[]).map(x=>(x.id===id||x.slug===id)?{...x,...patch,updated:'Today'}:x)})),
  removeItem:(key,id)=>setData(d=>({...d,[key]:(d[key]||[]).filter(x=>x.id!==id&&x.slug!==id)})),
  updateObject:(key,patch)=>setData(d=>({...d,[key]:{...d[key],...patch}})),
  log:(action,target)=>setData(d=>({...d,audit:[{id:`a-${Date.now()}`,time:'Now',actor:'Stefan Admin',action,target,ip:'Admin session'},...d.audit].slice(0,250)})),
  reset:()=>setData(createAdminSeed())
 }),[]);
 return {data,ready,...api};
}
