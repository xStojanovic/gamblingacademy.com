'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { adminNavigation } from '@/modules/shared/config/routes';

export default function AdminNav({ active = 'overview' }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');

  const groups = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return adminNavigation;
    return adminNavigation
      .map((group) => ({
        ...group,
        items: group.items.filter((item) => `${item.label} ${group.label}`.toLowerCase().includes(q))
      }))
      .filter((group) => group.items.length);
  }, [query]);

  return (
    <>
      <button className="workspace-mobile-toggle" type="button" onClick={() => setOpen(!open)}>Admin Menu {open ? '↑' : '↓'}</button>
      <aside className={`dashboard-nav admin-nav ${open ? 'mobile-open' : ''}`}>
        <div className="admin-brand">
          <span className="admin-mark">OA</span>
          <div><b>OpsAcademy</b><small>Owner Admin</small></div>
        </div>

        <div className="admin-nav-search-wrap">
          <input
            className="admin-nav-search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Find a control…"
            aria-label="Search owner admin navigation"
          />
          {query ? <button className="admin-nav-search-clear" type="button" onClick={() => setQuery('')} aria-label="Clear navigation search">×</button> : null}
        </div>

        {groups.length ? groups.map((group) => (
          <div className="admin-nav-group" key={group.label}>
            <span className="admin-nav-label">{group.label}</span>
            {group.items.map((item) => (
              <Link key={item.key} href={item.href} className={active === item.key ? 'active' : ''} onClick={() => setOpen(false)}>{item.label}</Link>
            ))}
          </div>
        )) : <div className="admin-nav-empty">No admin controls match “{query}”.</div>}

        <div className="nav-divider" />
        <Link href="/admin/deployments" className={active === 'deployments' ? 'active' : ''}>Deployment diagnostics →</Link>
        <Link href="/dashboard">Learner demo →</Link>
        <Link href="/company">Company admin →</Link>
        <Link href="/">Public website →</Link>
      </aside>
    </>
  );
}
