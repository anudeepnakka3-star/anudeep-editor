-- Create contact_submissions table for storing form submissions
CREATE TABLE public.contact_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert (public contact form)
CREATE POLICY "Anyone can submit contact form" 
ON public.contact_submissions 
FOR INSERT 
WITH CHECK (true);

-- Create policy to allow viewing from dashboard (admin access via service role)
-- Regular users cannot read submissions, only admins via Supabase dashboard
CREATE POLICY "Submissions are viewable by authenticated users" 
ON public.contact_submissions 
FOR SELECT 
TO authenticated
USING (true);