'use client';
import {useMemo,useState} from 'react';
import ResourceCard from '@/modules/public/components/ResourceCard';

export default function ResourceLibrary({resources}){
  const [query,setQuery]=useState('');
  const [category,setCategory]=useState('All');
  const categories=['All',...new Set(resources.map(r=>r.category))];
  const filtered=useMemo(()=>resources.filter(r=>(category==='All'||r.category===category)&&(`${r.title} ${r.description}`.toLowerCase().includes(query.toLowerCase()))),[resources,query,category]);
  return <><div className="filter-bar"><input className="search-input" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search templates and resources..."/><div className="filter-chips">{categories.map(c=><button key={c} className={category===c?'chip active':'chip'} onClick={()=>setCategory(c)}>{c}</button>)}</div></div><div className="grid-2">{filtered.map(r=><ResourceCard key={r.slug} resource={r}/>)}</div>{filtered.length===0&&<div className="empty-state"><h3>No resources found</h3><p className="muted">Try a different search or category.</p></div>}</>;
}
