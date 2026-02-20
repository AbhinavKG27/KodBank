
-- KodUser profiles table
CREATE TABLE public.kod_users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  uid TEXT NOT NULL UNIQUE,
  username TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL UNIQUE,
  phone TEXT,
  role TEXT NOT NULL DEFAULT 'Customer' CHECK (role = 'Customer'),
  balance NUMERIC NOT NULL DEFAULT 100000,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.kod_users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own profile"
  ON public.kod_users FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON public.kod_users FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- UserToken tracking table
CREATE TABLE public.user_tokens (
  tid BIGSERIAL PRIMARY KEY,
  token TEXT NOT NULL,
  uid UUID NOT NULL REFERENCES public.kod_users(id) ON DELETE CASCADE,
  expiry TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.user_tokens ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own tokens"
  ON public.user_tokens FOR SELECT
  TO authenticated
  USING (auth.uid() = uid);

CREATE POLICY "Users can insert own tokens"
  ON public.user_tokens FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = uid);
