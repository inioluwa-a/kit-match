-- Add is_outside_camp column
ALTER TABLE public.swap_requests ADD COLUMN IF NOT EXISTS is_outside_camp BOOLEAN NOT NULL DEFAULT false;

-- Update SELECT grants to include the new column
REVOKE SELECT ON public.swap_requests FROM anon, authenticated;
GRANT SELECT (id, camp, name, platoon, whatsapp, item, have_size, need_size, status, created_at, expires_at, is_outside_camp)
  ON public.swap_requests TO anon, authenticated;
