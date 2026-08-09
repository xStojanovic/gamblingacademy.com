create table if not exists resources (
  id uuid primary key default uuid_generate_v4(), slug text unique not null, title text not null,
  category text, format text, storage_path text, status text default 'draft', created_at timestamptz default now(), updated_at timestamptz default now()
);
create table if not exists saved_resources (
  user_id uuid references profiles(id) on delete cascade, resource_id uuid references resources(id) on delete cascade,
  saved_at timestamptz default now(), primary key(user_id,resource_id)
);
create table if not exists media_assets (
  id uuid primary key default uuid_generate_v4(), name text not null, media_type text not null,
  storage_path text, provider_asset_id text, mime_type text, byte_size bigint, metadata jsonb default '{}'::jsonb,
  status text default 'ready', created_by uuid references profiles(id) on delete set null,
  created_at timestamptz default now(), updated_at timestamptz default now()
);
create table if not exists knowledge_articles (
  id uuid primary key default uuid_generate_v4(), slug text unique not null, title text not null,
  category text, summary text, body jsonb default '[]'::jsonb, seo jsonb default '{}'::jsonb,
  status text default 'draft', published_at timestamptz, created_at timestamptz default now(), updated_at timestamptz default now()
);
create table if not exists glossary_terms (
  id uuid primary key default uuid_generate_v4(), term text unique not null, definition text not null,
  related_terms text[] default '{}', published boolean default true, updated_at timestamptz default now()
);
create table if not exists translations (
  id uuid primary key default uuid_generate_v4(), entity_type text not null, entity_id text not null,
  locale text not null, field_key text not null, value jsonb not null, status text default 'draft',
  updated_by uuid references profiles(id) on delete set null, updated_at timestamptz default now(),
  unique(entity_type,entity_id,locale,field_key)
);
create table if not exists site_pages (
  id uuid primary key default uuid_generate_v4(), title text not null, slug text unique not null,
  template text default 'content', body jsonb default '[]'::jsonb, seo jsonb default '{}'::jsonb,
  status text default 'draft', published_at timestamptz, created_at timestamptz default now(), updated_at timestamptz default now()
);
create table if not exists navigation_items (
  id uuid primary key default uuid_generate_v4(), label text not null, href text not null,
  location text not null default 'main', sort_order integer default 0, visible boolean default true,
  parent_id uuid references navigation_items(id) on delete cascade, created_at timestamptz default now(), updated_at timestamptz default now()
);
