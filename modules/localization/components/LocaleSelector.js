'use client';
import {locales} from '@/modules/localization/config/locales';import {useLocale} from '@/modules/localization/services/useLocale';
export default function LocaleSelector({compact=false}){const {locale,setLocale}=useLocale();return <select className={`locale-selector ${compact?'compact':''}`} value={locale} onChange={e=>setLocale(e.target.value)} aria-label="Language">{locales.map(l=><option key={l.code} value={l.code}>{compact?l.code.toUpperCase():l.label}</option>)}</select>}
