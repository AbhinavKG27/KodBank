
-- Allow anon users to look up email by username (needed for login flow)
CREATE POLICY "Anon can lookup user by username"
  ON public.kod_users FOR SELECT
  TO anon
  USING (true);
