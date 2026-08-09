'use client';
import { useEffect, useState } from 'react';

export default function ThemeToggle({compact=false}){
  const [theme,setTheme]=useState('dark');
  useEffect(()=>{
    const saved=localStorage.getItem('opsacademy-theme');
    const preferred=saved || (window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark');
    setTheme(preferred);
    document.documentElement.dataset.theme=preferred;
  },[]);
  function toggle(){
    const next=theme==='dark'?'light':'dark';
    setTheme(next);
    localStorage.setItem('opsacademy-theme',next);
    document.documentElement.dataset.theme=next;
  }
  return <button className={`theme-toggle ${compact?'compact':''}`} onClick={toggle} aria-label={`Switch to ${theme==='dark'?'light':'dark'} mode`} title={`Switch to ${theme==='dark'?'light':'dark'} mode`}>
    <span>{theme==='dark'?'☀':'☾'}</span>{!compact&&<span>{theme==='dark'?'Light':'Dark'}</span>}
  </button>;
}
