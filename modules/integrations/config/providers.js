export const integrationProviders=[
 {key:'supabase',name:'Supabase',category:'Database & Auth',env:['NEXT_PUBLIC_SUPABASE_URL','NEXT_PUBLIC_SUPABASE_ANON_KEY','SUPABASE_SERVICE_ROLE_KEY']},
 {key:'stripe',name:'Stripe',category:'Billing',env:['STRIPE_SECRET_KEY','STRIPE_WEBHOOK_SECRET']},
 {key:'resend',name:'Resend',category:'Transactional Email',env:['RESEND_API_KEY']},
 {key:'openai',name:'OpenAI',category:'AI Tutor',env:['OPENAI_API_KEY']},
 {key:'posthog',name:'PostHog',category:'Product Analytics',env:['NEXT_PUBLIC_POSTHOG_KEY']},
 {key:'mux',name:'Mux / Vimeo',category:'Protected Video',env:['MUX_TOKEN_ID','MUX_TOKEN_SECRET']},
 {key:'hubspot',name:'HubSpot',category:'B2B CRM',env:['HUBSPOT_ACCESS_TOKEN']}
];
