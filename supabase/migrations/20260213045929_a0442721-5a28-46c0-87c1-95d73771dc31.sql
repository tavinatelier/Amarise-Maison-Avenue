
-- Block anonymous access to profiles
CREATE POLICY "deny_anonymous_profiles"
ON public.profiles
FOR SELECT
TO anon
USING (false);

-- Block anonymous access to client_preferences
CREATE POLICY "deny_anonymous_client_preferences"
ON public.client_preferences
FOR SELECT
TO anon
USING (false);
