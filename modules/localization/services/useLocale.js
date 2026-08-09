'use client';
import {useEffect,useState} from 'react';import {dictionary} from '@/modules/localization/data/dictionary';
const KEY='opsacademy-locale';
export function useLocale(){const [locale,setLocaleState]=useState('en');useEffect(()=>{const saved=localStorage.getItem(KEY)||'en';setLocaleState(saved)},[]);function setLocale(next){localStorage.setItem(KEY,next);setLocaleState(next);document.documentElement.lang=next;window.dispatchEvent(new CustomEvent('opsacademy-locale',{detail:next}))}function t(key){return dictionary[locale]?.[key]||dictionary.en[key]||key}return {locale,setLocale,t}}
