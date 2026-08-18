import { NextResponse } from 'next/server';
import { serviceReadiness, env } from '@/modules/infrastructure/config/env';
import { release } from '@/modules/infrastructure/config/release';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json({
    ok: true,
    version: release.version,
    release: release.channel,
    runtime: process.version,
    demoMode: env.demoMode,
    time: new Date().toISOString(),
    services: serviceReadiness()
  }, { headers: { 'Cache-Control': 'no-store, max-age=0' } });
}
