import {Suspense} from 'react';import LoginForm from '@/modules/auth/components/LoginForm';
export default function Page(){return <Suspense fallback={<div className="auth-shell"><div className="auth-card">Loading…</div></div>}><LoginForm/></Suspense>}
