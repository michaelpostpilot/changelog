-- Create the entries table
create table entries (
  id bigint primary key generated always as identity,
  text text not null,
  timestamp timestamptz not null default now(),
  edited boolean not null default false,
  last_edited timestamptz
);

-- Enable Row Level Security (RLS)
alter table entries enable row level security;

-- Create a policy that allows all operations (for this example)
create policy "Allow all operations" on entries
  for all using (true);

-- Create an index on timestamp for faster sorting
create index entries_timestamp_idx on entries (timestamp desc); 