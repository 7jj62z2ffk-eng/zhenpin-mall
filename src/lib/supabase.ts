import { createClient } from '@supabase/supabase-js';

// Supabase 项目配置 —— 创建项目后替换下方的值
// 1. 访问 https://supabase.com 创建项目
// 2. 左侧菜单 → Project Settings → API → 复制 Project URL 和 anon public key
// 3. 创建 orders 表（SQL 在下方）
//
// 创建 orders 表的 SQL：
// create table orders (
//   id uuid default gen_random_uuid() primary key,
//   order_number text not null unique,
//   customer_name text not null,
//   customer_phone text not null,
//   customer_address text,
//   customer_city text,
//   payment_method text not null,
//   items jsonb not null,
//   total numeric(10,2) not null,
//   status text default 'pending',
//   created_at timestamp with time zone default now()
// );
//
// 开启 RLS（行级别安全），允许匿名插入订单，但只能管理员查看：
// create policy "Anyone can insert orders" on orders
//   for insert with check (true);
//
// 管理员查看需要登录，暂时先用 service_role key 在管理页面验证（不推荐）
// 更好的方式：创建 admin_users 表 + 登录逻辑

const SUPABASE_URL = 'https://xvmbgacopbpmaftewmbk.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh2bWJnYWNvcGJtcGFmdGV3bWJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM0MTg0ODgsImV4cCI6MjA5ODk5NDQ4OH0.VKMeyOtiZnokM5jU4d7FZvHaArZo6_S4onrmr7wOZkk';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export const isSupabaseConfigured = () => {
  return SUPABASE_URL !== 'YOUR_SUPABASE_URL' && SUPABASE_ANON_KEY !== 'YOUR_SUPABASE_ANON_KEY';
};