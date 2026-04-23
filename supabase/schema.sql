-- Actionable AI — Supabase Schema
-- Run this in your Supabase SQL Editor

-- Users
create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  -- profile
  age text,
  employment text,
  income text,
  debt text,
  goal text,
  risk_tolerance text,
  timeline text,
  -- stripe
  stripe_customer_id text,
  stripe_plan text,
  stripe_subscription_id text,
  -- referral
  referral_code text unique,
  referred_by text,
  -- activity
  last_active timestamptz,
  created_at timestamptz default now()
);

-- Sessions
create table if not exists sessions (
  id uuid primary key default gen_random_uuid(),
  token text unique not null,
  user_id uuid references users(id) on delete cascade,
  expires_at timestamptz not null,
  created_at timestamptz default now()
);

-- Verification codes
create table if not exists verification_codes (
  email text primary key,
  code text not null,
  expires_at timestamptz not null,
  created_at timestamptz default now()
);

-- Chat messages
create table if not exists messages (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  role text not null check (role in ('user', 'assistant')),
  content text not null,
  created_at timestamptz default now()
);

-- Community stories
create table if not exists stories (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  content text not null,
  flag_count integer default 0,
  hidden boolean default false,
  created_at timestamptz default now()
);

-- Milestones
create table if not exists milestones (
  id uuid primary key default gen_random_uuid(),
  user_id uuid unique references users(id) on delete cascade,
  completed integer[] default '{}',
  updated_at timestamptz default now()
);

-- Referrals
create table if not exists referrals (
  id uuid primary key default gen_random_uuid(),
  referrer_id uuid references users(id) on delete cascade,
  referred_id uuid references users(id) on delete cascade,
  credited boolean default false,
  created_at timestamptz default now()
);

-- Indexes
create index if not exists idx_sessions_token on sessions(token);
create index if not exists idx_messages_user on messages(user_id);
create index if not exists idx_stories_hidden on stories(hidden, created_at desc);
create index if not exists idx_users_email on users(email);

-- Row Level Security (disable for service role)
alter table users enable row level security;
alter table sessions enable row level security;
alter table messages enable row level security;
alter table stories enable row level security;
alter table milestones enable row level security;
alter table referrals enable row level security;

-- Allow service role full access (your backend uses service_role key)
create policy "service_role_all" on users for all using (true);
create policy "service_role_all" on sessions for all using (true);
create policy "service_role_all" on verification_codes for all using (true);
create policy "service_role_all" on messages for all using (true);
create policy "service_role_all" on stories for all using (true);
create policy "service_role_all" on milestones for all using (true);
create policy "service_role_all" on referrals for all using (true);
