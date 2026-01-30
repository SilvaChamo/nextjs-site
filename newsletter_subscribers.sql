create table if not exists newsletter_subscribers (
  id uuid default gen_random_uuid() primary key,
  email text not null unique,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table newsletter_subscribers enable row level security;

create policy "Enable insert for everyone" on newsletter_subscribers
  for insert with check (true);

create policy "Enable read for authenticated users only" on newsletter_subscribers
  for select using (auth.role() = 'authenticated');
