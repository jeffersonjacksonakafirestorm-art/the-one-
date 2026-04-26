-- Actionable AI — Supabase Schema
-- Safe to re-run at any time. Handles existing tables, columns, and policies.

-- ── Tables ────────────────────────────────────────────────────────────────────

create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  session_token text,
  stripe_customer_id text,
  stripe_subscription_id text,
  plan text default 'none',
  subscription_status text default 'inactive',
  onboarding_data jsonb,
  onboarding_complete boolean default false,
  referral_code text unique default substr(md5(random()::text), 0, 9),
  referred_by text,
  referral_credits integer default 0,
  created_at timestamptz default now()
);

create table if not exists verification_codes (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  code text not null,
  expires_at timestamptz not null,
  used boolean default false,
  created_at timestamptz default now()
);

create table if not exists chats (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  title text default 'New Chat',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- If messages table already exists from an old schema, add missing columns
create table if not exists messages (
  id uuid primary key default gen_random_uuid(),
  chat_id uuid references chats(id) on delete cascade,
  role text not null,
  content text not null,
  image_url text,
  created_at timestamptz default now()
);
alter table messages add column if not exists chat_id uuid references chats(id) on delete cascade;
alter table messages add column if not exists image_url text;

create table if not exists stories (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  title text not null,
  content text not null,
  category text default 'general',
  flag_count integer default 0,
  hidden boolean default false,
  created_at timestamptz default now()
);

create table if not exists story_flags (
  id uuid primary key default gen_random_uuid(),
  story_id uuid references stories(id) on delete cascade,
  user_id uuid references users(id) on delete cascade,
  created_at timestamptz default now(),
  unique(story_id, user_id)
);

create table if not exists free_trial_sessions (
  id uuid primary key default gen_random_uuid(),
  ip text not null,
  created_at timestamptz default now()
);

-- ── Indexes ───────────────────────────────────────────────────────────────────

create index if not exists idx_chats_user_id        on chats(user_id);
create index if not exists idx_messages_chat_id     on messages(chat_id);
create index if not exists idx_stories_created      on stories(created_at desc);
create index if not exists idx_verification_email   on verification_codes(email);
create index if not exists idx_users_session        on users(session_token);
create index if not exists idx_free_trial_ip        on free_trial_sessions(ip);

-- ── Row Level Security ────────────────────────────────────────────────────────

alter table users              enable row level security;
alter table verification_codes enable row level security;
alter table chats              enable row level security;
alter table messages           enable row level security;
alter table stories            enable row level security;
alter table free_trial_sessions enable row level security;

-- Drop old policies if they exist (prevents "already exists" errors on re-run)
drop policy if exists "Service role full access" on users;
drop policy if exists "Service role full access" on verification_codes;
drop policy if exists "Service role full access" on chats;
drop policy if exists "Service role full access" on messages;
drop policy if exists "Service role full access" on stories;
drop policy if exists "Service role full access" on free_trial_sessions;
drop policy if exists "service_role_all" on users;
drop policy if exists "service_role_all" on verification_codes;
drop policy if exists "service_role_all" on chats;
drop policy if exists "service_role_all" on messages;
drop policy if exists "service_role_all" on stories;
drop policy if exists "service_role_all" on free_trial_sessions;

-- Create clean policies (service role key used by all API routes bypasses RLS anyway,
-- but these are needed for anon key access if ever used)
create policy "svc_users"               on users               for all using (true);
create policy "svc_verification_codes"  on verification_codes  for all using (true);
create policy "svc_chats"               on chats               for all using (true);
create policy "svc_messages"            on messages            for all using (true);
create policy "svc_stories"             on stories             for all using (true);
create policy "svc_free_trial"          on free_trial_sessions for all using (true);
