-- Hirin' Hero — Supabase šema (pokrenuti u SQL editoru Supabase projekta)

create table if not exists candidates (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  full_name text not null,
  birth_year text,
  phone text,
  email text,
  work_status text,
  urgency text,
  answers jsonb not null default '{}'::jsonb,
  cv_path text,
  locale text default 'me',
  status text not null default 'nov',          -- nov / u obradi / predlozen / zaposlen (za buduci admin)
  notes text
);

create table if not exists inquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  kind text not null default 'employer',        -- employer / contact
  company text,
  industry text,
  role text,
  headcount int,
  contact_person text,
  contact text,
  answers jsonb not null default '{}'::jsonb,
  locale text default 'me',
  status text not null default 'nov',
  notes text
);

-- RLS: ukljucen, bez javnih politika — pristup samo preko service-role kljuca (API rute sajta)
alter table candidates enable row level security;
alter table inquiries enable row level security;

-- STORAGE: rucno kreirati PRIVATE bucket "cvs" (Storage > New bucket > name: cvs, public: OFF)
