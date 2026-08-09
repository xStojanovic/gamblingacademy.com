create table if not exists certificates (
  id uuid primary key default uuid_generate_v4(), credential_id text unique not null,
  user_id uuid references profiles(id) on delete cascade, course_id uuid references courses(id),
  program_name text not null, score integer, metadata jsonb default '{}'::jsonb,
  issued_at timestamptz default now(), revoked_at timestamptz
);
create index if not exists idx_certificates_credential on certificates(credential_id);
create index if not exists idx_certificates_user on certificates(user_id);
