import { NextResponse } from 'next/server';
import { release, deploymentDefaults } from '@/modules/infrastructure/config/release';
import { env, serviceReadiness } from '@/modules/infrastructure/config/env';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json({
    ok: true,
    release,
    runtime: {
      node: process.version,
      environment: process.env.NODE_ENV || 'unknown',
      demoMode: env.demoMode,
      commit: process.env.GITHUB_SHA || process.env.COMMIT_SHA || process.env.VERCEL_GIT_COMMIT_SHA || null
    },
    expectedDeployment: deploymentDefaults,
    services: serviceReadiness(),
    checkedAt: new Date().toISOString()
  }, {
    headers: {
      'Cache-Control': 'no-store, max-age=0'
    }
  });
}
