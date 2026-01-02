-- Fix PUBLIC_DATA_EXPOSURE: Remove overly permissive SELECT policy
-- Contact submissions should only be accessible via service role (Lovable Cloud dashboard)
-- No authenticated users need to read these - only the site owner via admin tools

DROP POLICY IF EXISTS "Submissions are viewable by authenticated users" ON public.contact_submissions;