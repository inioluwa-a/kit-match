-- Add state_code and flag_count for enhanced security and moderation
ALTER TABLE public.swap_requests
  ADD COLUMN IF NOT EXISTS state_code TEXT,
  ADD COLUMN IF NOT EXISTS flag_count INT NOT NULL DEFAULT 0;

-- Update the SELECT policy to hide listings with 3 or more flags
DROP POLICY IF EXISTS "Anyone can view available listings" ON public.swap_requests;
CREATE POLICY "Anyone can view available listings"
ON public.swap_requests FOR SELECT
USING (status = 'available' AND expires_at > now() AND flag_count < 3);

-- Re-grant SELECT on the new state_code column
REVOKE SELECT ON public.swap_requests FROM anon, authenticated;
GRANT SELECT (id, camp, name, platoon, whatsapp, item, have_size, need_size, status, created_at, expires_at, state_code)
  ON public.swap_requests TO anon, authenticated;

-- RPC: allow users to report a listing
CREATE OR REPLACE FUNCTION public.report_listing(p_id uuid)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.swap_requests
     SET flag_count = flag_count + 1
   WHERE id = p_id
     AND status = 'available';
  RETURN FOUND;
END;
$$;

GRANT EXECUTE ON FUNCTION public.report_listing(uuid) TO anon, authenticated;
