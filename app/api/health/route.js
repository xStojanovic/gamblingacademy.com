import {NextResponse} from 'next/server';import {serviceReadiness} from '@/modules/infrastructure/config/env';
export async function GET(){return NextResponse.json({ok:true,version:'4.0.0',time:new Date().toISOString(),services:serviceReadiness()})}
