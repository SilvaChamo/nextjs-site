-- Add status column to presentations table for archive/delete functionality
ALTER TABLE public.presentations ADD COLUMN IF NOT EXISTS status text DEFAULT 'active';

-- Create index for faster filtering
CREATE INDEX IF NOT EXISTS idx_presentations_status ON public.presentations(status);
