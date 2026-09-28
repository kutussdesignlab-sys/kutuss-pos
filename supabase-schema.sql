-- ==============================================================
-- KUTUSS POS & WORKSHOP HUB - SUPABASE SQL SCHEMA
-- --------------------------------------------------------------
-- Run this entire script in your Supabase SQL Editor:
-- Supabase Dashboard -> Select Project -> SQL Editor -> New Query -> Run
-- ==============================================================

-- 1. Sales Table
create table if not exists kutuss_sales (
    id text primary key,
    data jsonb not null,
    updated_at bigint default (extract(epoch from now()) * 1000)
);
alter table kutuss_sales enable row level security;
drop policy if exists "Public sales access" on kutuss_sales;
create policy "Public sales access" on kutuss_sales for all using (true) with check (true);

-- 2. Expenses Table
create table if not exists kutuss_expenses (
    id text primary key,
    data jsonb not null,
    updated_at bigint default (extract(epoch from now()) * 1000)
);
alter table kutuss_expenses enable row level security;
drop policy if exists "Public expenses access" on kutuss_expenses;
create policy "Public expenses access" on kutuss_expenses for all using (true) with check (true);

-- 3. Projects Table
create table if not exists kutuss_projects (
    id text primary key,
    data jsonb not null,
    updated_at bigint default (extract(epoch from now()) * 1000)
);
alter table kutuss_projects enable row level security;
drop policy if exists "Public projects access" on kutuss_projects;
create policy "Public projects access" on kutuss_projects for all using (true) with check (true);

-- 4. Inquiries Table
create table if not exists kutuss_inquiries (
    id text primary key,
    data jsonb not null,
    updated_at bigint default (extract(epoch from now()) * 1000)
);
alter table kutuss_inquiries enable row level security;
drop policy if exists "Public inquiries access" on kutuss_inquiries;
create policy "Public inquiries access" on kutuss_inquiries for all using (true) with check (true);

-- 5. Suppliers Table
create table if not exists kutuss_suppliers (
    id text primary key,
    data jsonb not null,
    updated_at bigint default (extract(epoch from now()) * 1000)
);
alter table kutuss_suppliers enable row level security;
drop policy if exists "Public suppliers access" on kutuss_suppliers;
create policy "Public suppliers access" on kutuss_suppliers for all using (true) with check (true);

-- 6. Salary Paysheets Table
create table if not exists kutuss_salaryPaysheets (
    id text primary key,
    data jsonb not null,
    updated_at bigint default (extract(epoch from now()) * 1000)
);
alter table kutuss_salaryPaysheets enable row level security;
drop policy if exists "Public salaryPaysheets access" on kutuss_salaryPaysheets;
create policy "Public salaryPaysheets access" on kutuss_salaryPaysheets for all using (true) with check (true);

-- 7. Team Members Table
create table if not exists kutuss_teamMembers (
    id text primary key,
    data jsonb not null,
    updated_at bigint default (extract(epoch from now()) * 1000)
);
alter table kutuss_teamMembers enable row level security;
drop policy if exists "Public teamMembers access" on kutuss_teamMembers;
create policy "Public teamMembers access" on kutuss_teamMembers for all using (true) with check (true);

-- 8. Member Project Payments Table
create table if not exists kutuss_memberProjectPayments (
    id text primary key,
    data jsonb not null,
    updated_at bigint default (extract(epoch from now()) * 1000)
);
alter table kutuss_memberProjectPayments enable row level security;
drop policy if exists "Public memberProjectPayments access" on kutuss_memberProjectPayments;
create policy "Public memberProjectPayments access" on kutuss_memberProjectPayments for all using (true) with check (true);

-- 9. Payable Bills Table
create table if not exists kutuss_payableBills (
    id text primary key,
    data jsonb not null,
    updated_at bigint default (extract(epoch from now()) * 1000)
);
alter table kutuss_payableBills enable row level security;
drop policy if exists "Public payableBills access" on kutuss_payableBills;
create policy "Public payableBills access" on kutuss_payableBills for all using (true) with check (true);

-- 10. 3D Print Orders Table (Fusion 3D Outsourcing)
create table if not exists kutuss_printOrders (
    id text primary key,
    data jsonb not null,
    updated_at bigint default (extract(epoch from now()) * 1000)
);
alter table kutuss_printOrders enable row level security;
drop policy if exists "Public printOrders access" on kutuss_printOrders;
create policy "Public printOrders access" on kutuss_printOrders for all using (true) with check (true);

-- 11. Settings Table
create table if not exists kutuss_settings (
    id text primary key,
    data jsonb not null,
    updated_at bigint default (extract(epoch from now()) * 1000)
);
alter table kutuss_settings enable row level security;
drop policy if exists "Public settings access" on kutuss_settings;
create policy "Public settings access" on kutuss_settings for all using (true) with check (true);

-- 12. Add tables to Realtime Publication (so changes stream to all connected devices)
do $$
begin
    alter publication supabase_realtime add table 
        kutuss_sales, 
        kutuss_expenses, 
        kutuss_projects, 
        kutuss_inquiries, 
        kutuss_suppliers, 
        kutuss_salaryPaysheets, 
        kutuss_teamMembers, 
        kutuss_memberProjectPayments, 
        kutuss_payableBills, 
        kutuss_printOrders, 
        kutuss_settings;
exception when others then
    -- Table already in publication or publication not found, safely ignore
end $$;
