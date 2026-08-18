import { NextResponse } from 'next/server';
import { requireServerRole } from '@/modules/auth/services/serverAuth';
import { env } from '@/modules/infrastructure/config/env';
import { release } from '@/modules/infrastructure/config/release';
import { dbInsert, dbSelect } from '@/modules/infrastructure/services/supabaseRest';

const demoHistory = [
  { version: '0.7.0', channel: 'V7 Deployment Ready', status: 'ready', provider: 'Hostinger', branch: 'main', next_version: '15.5.21', created_at: '2026-08-18T21:20:00.000Z' },
  { version: '0.6.1', channel: 'V6 Hostinger Hardening', status: 'superseded', provider: 'Hostinger', branch: 'main', next_version: '15.5.21', created_at: '2026-08-18T20:40:00.000Z' },
  { version: '0.6.0', channel: 'V6 Sellable Beta', status: 'superseded', provider: 'Hostinger', branch: 'main', next_version: '15.5.21', created_at: '2026-08-18T19:40:00.000Z' }
];

export async function GET() {
  const auth = await requireServerRole(['academy_admin']);
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status });
  if (env.demoMode) return NextResponse.json({ ok: true, demo: true, releases: demoHistory });
  const result = await dbSelect('platform_releases', 'select=*&order=created_at.desc&limit=20');
  return NextResponse.json({ ok: result.ok, releases: result.data || [], error: result.error || null }, { status: result.ok ? 200 : 500 });
}

export async function POST(request) {
  const auth = await requireServerRole(['academy_admin']);
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status });
  const body = await request.json().catch(() => ({}));
  const payload = {
    version: release.version,
    channel: release.channel,
    commit_sha: body.commitSha || process.env.GITHUB_SHA || process.env.COMMIT_SHA || null,
    branch: body.branch || 'main',
    next_version: release.next,
    react_version: release.react,
    node_version: process.version,
    status: body.status || 'deployed',
    release_notes: body.notes || null,
    built_at: body.builtAt || new Date().toISOString(),
    deployed_at: body.deployedAt || new Date().toISOString(),
    metadata: { provider: body.provider || 'hostinger', buildId: body.buildId || null }
  };
  if (env.demoMode) return NextResponse.json({ ok: true, demo: true, data: payload });
  const result = await dbInsert('platform_releases', payload);
  return NextResponse.json(result, { status: result.ok ? 200 : 500 });
}
