create table public.companies (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  name text not null,
  nuit text,
  phone text,
  address text,
  province text,
  sector text,
  description text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.companies enable row level security;

create policy "Users can view their own company"
on public.companies for select
using (auth.uid() = user_id);

create policy "Users can insert their own company"
on public.companies for insert
with check (auth.uid() = user_id);

create policy "Users can update their own company"
on public.companies for update
using (auth.uid() = user_id);

