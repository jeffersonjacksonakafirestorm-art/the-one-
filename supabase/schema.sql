-- Actionable AI — Supabase Schema
-- Run this in your Supabase SQL Editor (supabase.com → your project → SQL Editor)

-- Users
create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  session_token text,
  stripe_customer_id text,
  stripe_subscription_id text,
  plan text default 'none', -- 'none', 'basic', 'pro'
  subscription_status text default 'inactive',
  onboarding_data jsonb,
  onboarding_complete boolean default false,
  referral_code text unique default substr(md5(random()::text), 0, 9),
  referred_by text,
  referral_credits integer default 0,
  created_at timestamptz default now()
);

-- Email verification codes
create table if not exists verification_codes (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  code text not null,
  expires_at timestamptz not null,
  used boolean default false,
  created_at timestamptz default now()
);

-- Chats
create table if not exists chats (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  title text default 'New Chat',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Messages
create table if not exists messages (
  id uuid primary key default gen_random_uuid(),
  chat_id uuid references chats(id) on delete cascade,
  role text not null, -- 'user' or 'assistant'
  content text not null,
  image_url text,
  created_at timestamptz default now()
);

-- Community stories
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

-- Story flags (prevent duplicate flags)
create table if not exists story_flags (
  id uuid primary key default gen_random_uuid(),
  story_id uuid references stories(id) on delete cascade,
  user_id uuid references users(id) on delete cascade,
  created_at timestamptz default now(),
  unique(story_id, user_id)
);

-- Free trial tracking (by IP)
create table if not exists free_trial_sessions (
  id uuid primary key default gen_random_uuid(),
  ip text not null,
  created_at timestamptz default now()
);

-- Indexes
create index if not exists idx_chats_user_id on chats(user_id);
create index if not exists idx_messages_chat_id on messages(chat_id);
create index if not exists idx_stories_created on stories(created_at desc);
create index if not exists idx_verification_email on verification_codes(email);
create index if not exists idx_users_session on users(session_token);
create index if not exists idx_free_trial_ip on free_trial_sessions(ip);

-- RLS (Row Level Security) — disabled for service role access
-- Enable if using client-side Supabase with user JWTs
alter table users enable row level security;
alter table chats enable row level security;
alter table messages enable row level security;
alter table stories enable row level security;

-- Allow service role full access (API routes use service role key)
create policy "Service role full access" on users for all using (true);
create policy "Service role full access" on chats for all using (true);
create policy "Service role full access" on messages for all using (true);
create policy "Service role full access" on stories for all using (true);
