export const env = {
  demoMode: process.env.NEXT_PUBLIC_DEMO_MODE !== 'false',
  appUrl: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || '',
  supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
  supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY || '',
  supabaseMediaBucket: process.env.SUPABASE_MEDIA_BUCKET || 'academy-media',
  stripeSecretKey: process.env.STRIPE_SECRET_KEY || '',
  stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET || '',
  resendApiKey: process.env.RESEND_API_KEY || '',
  openAiApiKey: process.env.OPENAI_API_KEY || '',
  posthogKey: process.env.NEXT_PUBLIC_POSTHOG_KEY || '',
  posthogHost: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com',
  openAiTutorModel: process.env.OPENAI_TUTOR_MODEL || 'gpt-5-mini',
  muxTokenId: process.env.MUX_TOKEN_ID || '',
  muxTokenSecret: process.env.MUX_TOKEN_SECRET || '',
  muxSigningKeyId: process.env.MUX_SIGNING_KEY_ID || '',
  muxSigningPrivateKey: process.env.MUX_SIGNING_PRIVATE_KEY || '',
  hubspotAccessToken: process.env.HUBSPOT_ACCESS_TOKEN || ''
};

export function serviceReadiness(){
  return {
    database:Boolean(env.supabaseUrl && env.supabaseServiceRoleKey),
    auth:Boolean(env.supabaseUrl && env.supabaseAnonKey),
    billing:Boolean(env.stripeSecretKey),
    email:Boolean(env.resendApiKey),
    ai:Boolean(env.openAiApiKey),
    analytics:Boolean(env.posthogKey),
    media:Boolean(env.supabaseUrl && env.supabaseServiceRoleKey),
    video:Boolean(env.muxTokenId && env.muxTokenSecret),
    crm:Boolean(env.hubspotAccessToken)
  };
}
