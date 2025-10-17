-- Resume Builder Database Schema
-- Run these SQL commands in your Supabase SQL Editor

-- 1. Create resumes table
CREATE TABLE public.resumes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    title VARCHAR(255) NOT NULL,
    template_layout VARCHAR(50) NOT NULL,
    resume_data JSONB NOT NULL,
    pdf_url TEXT,
    pdf_file_name TEXT,
    pdf_file_size BIGINT,
    status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'completed', 'published')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Enable Row Level Security
ALTER TABLE public.resumes ENABLE ROW LEVEL SECURITY;

-- 3. Create RLS policies for resumes table
CREATE POLICY "Users can view own resumes" ON public.resumes
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own resumes" ON public.resumes
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own resumes" ON public.resumes
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own resumes" ON public.resumes
    FOR DELETE USING (auth.uid() = user_id);

-- 4. Create storage bucket for resume PDFs (make it public for easier access)
INSERT INTO storage.buckets (id, name, public) VALUES ('resume-pdfs', 'resume-pdfs', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- 5. Create storage policies for PDF files
CREATE POLICY "Users can upload their own resume PDFs"
ON storage.objects FOR INSERT 
WITH CHECK (
  bucket_id = 'resume-pdfs' AND 
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can view their own resume PDFs"
ON storage.objects FOR SELECT 
USING (
  bucket_id = 'resume-pdfs' AND 
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can update their own resume PDFs"
ON storage.objects FOR UPDATE 
USING (
  bucket_id = 'resume-pdfs' AND 
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can delete their own resume PDFs"
ON storage.objects FOR DELETE 
USING (
  bucket_id = 'resume-pdfs' AND 
  auth.uid()::text = (storage.foldername(name))[1]
);

-- 6. Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 7. Create trigger to automatically update updated_at
CREATE TRIGGER on_resumes_updated
    BEFORE UPDATE ON public.resumes
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- 8. Create indexes for better performance
CREATE INDEX idx_resumes_user_id ON public.resumes(user_id);
CREATE INDEX idx_resumes_created_at ON public.resumes(created_at DESC);
CREATE INDEX idx_resumes_status ON public.resumes(status);

-- Schema refresh and verification queries
-- Run these if you get "table not found in schema cache" errors

-- 1. Refresh the schema cache
NOTIFY pgrst, 'reload schema';

-- 2. Verify table exists
SELECT * FROM pg_tables WHERE schemaname = 'public' AND tablename = 'resumes';

-- 3. Check table structure
SELECT column_name, data_type, is_nullable, column_default 
FROM information_schema.columns 
WHERE table_schema = 'public' AND table_name = 'resumes'
ORDER BY ordinal_position;

-- 4. Test table access
SELECT COUNT(*) FROM public.resumes;

-- 5. Verify storage bucket
SELECT * FROM storage.buckets WHERE id = 'resume-pdfs';

-- Fix storage bucket if you're getting "Bucket not found" errors:
-- Make the bucket public for easier PDF access
UPDATE storage.buckets SET public = true WHERE id = 'resume-pdfs';

-- Alternatively, recreate the bucket:
-- DELETE FROM storage.buckets WHERE id = 'resume-pdfs';
-- INSERT INTO storage.buckets (id, name, public) VALUES ('resume-pdfs', 'resume-pdfs', true);

-- If the table still doesn't appear, try recreating it:
-- DROP TABLE IF EXISTS public.resumes CASCADE;
-- Then re-run the CREATE TABLE command above