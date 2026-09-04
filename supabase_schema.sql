-- ==============================================================================
-- LONGRIDE Database Schema for Supabase
-- Run this in the Supabase SQL Editor (SQL Editor -> New Query -> Paste & Run)
-- ==============================================================================

-- 1. Create Users Table
CREATE TABLE IF NOT EXISTS public.users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role TEXT NOT NULL, -- 'driver', 'dealer', 'emergency'
  name TEXT,
  phone TEXT,
  vehicle TEXT,
  vehicle_number TEXT,
  org_name TEXT,
  is_open_to_work BOOLEAN DEFAULT TRUE,
  is_empty BOOLEAN DEFAULT TRUE,
  capacity_str TEXT DEFAULT '10 Tons',
  load_details TEXT DEFAULT 'Completely Empty',
  status TEXT DEFAULT 'Empty',
  time_to_empty_mins INTEGER DEFAULT 0,
  location TEXT DEFAULT 'Offline',
  lat DOUBLE PRECISION,
  lng DOUBLE PRECISION,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW())
);

-- 2. Create Orders Table (Dealer Freight Loads)
CREATE TABLE IF NOT EXISTS public.orders (
  id BIGINT PRIMARY KEY,
  target_driver TEXT,
  dealer TEXT NOT NULL,
  dealer_phone TEXT,
  load TEXT NOT NULL,
  from_location TEXT NOT NULL,
  to_location TEXT NOT NULL,
  payment TEXT NOT NULL,
  profit TEXT,
  fuel_efficiency TEXT,
  duration TEXT,
  is_charity BOOLEAN DEFAULT FALSE,
  status TEXT DEFAULT 'open',
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW())
);

-- 3. Create Charity Orders Table (Emergency Humanitarian Broadcasts)
CREATE TABLE IF NOT EXISTS public.charity_orders (
  id BIGINT PRIMARY KEY,
  dealer TEXT NOT NULL,
  load TEXT NOT NULL,
  from_location TEXT NOT NULL,
  to_location TEXT NOT NULL,
  payment TEXT DEFAULT 'Charity (Urgent)',
  is_charity BOOLEAN DEFAULT TRUE,
  status TEXT DEFAULT 'open',
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW())
);

-- 4. Enable Row Level Security (RLS) & Allow Anonymous Read/Write for Prototype
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.charity_orders ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public access to users" ON public.users;
CREATE POLICY "Public access to users" ON public.users FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public access to orders" ON public.orders;
CREATE POLICY "Public access to orders" ON public.orders FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public access to charity_orders" ON public.charity_orders;
CREATE POLICY "Public access to charity_orders" ON public.charity_orders FOR ALL USING (true) WITH CHECK (true);

-- 5. Enable Supabase Realtime for instant multi-device synchronization
ALTER PUBLICATION supabase_realtime ADD TABLE public.users;
ALTER PUBLICATION supabase_realtime ADD TABLE public.orders;
ALTER PUBLICATION supabase_realtime ADD TABLE public.charity_orders;
