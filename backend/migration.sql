-- Run this in your Neon SQL console

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE kod_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  uid TEXT UNIQUE NOT NULL,
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  balance NUMERIC DEFAULT 100000,
  phone TEXT,
  role TEXT DEFAULT 'Customer',
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE user_tokens (
  id SERIAL PRIMARY KEY,
  token TEXT NOT NULL,
  user_id UUID REFERENCES kod_users(id) ON DELETE CASCADE,
  expiry TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);
