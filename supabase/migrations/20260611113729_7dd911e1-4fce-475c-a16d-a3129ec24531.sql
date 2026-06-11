-- Add owner_token to enforce that only the original poster can mark a listing as swapped.
ALTER TABLE public.swap_requests
  ADD COLUMN IF NOT EXISTS owner_token uuid NOT NULL DEFAULT gen_random_uuid();

-- Revoke direct UPDATE access from anon/authenticated; updates go through a SECURITY DEFINER RPC.
DROP POLICY IF EXISTS "Anyone can mark available as swapped" ON public.swap_requests;

-- Prevent owner_token from being read via the Data API (column-level grant).
-- Re-grant SELECT only on the safe columns.
REVOKE SELECT ON public.swap_requests FROM anon, authenticated;
GRANT SELECT (id, camp, name, platoon, whatsapp, item, have_size, need_size, status, created_at, expires_at)
  ON public.swap_requests TO anon, authenticated;

-- RPC: caller proves ownership by supplying the owner_token issued at insert time.
CREATE OR REPLACE FUNCTION public.mark_swap_swapped(p_id uuid, p_token uuid)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  updated_count int;
BEGIN
  UPDATE public.swap_requests
     SET status = 'swapped'
   WHERE id = p_id
     AND owner_token = p_token
     AND status = 'available';
  GET DIAGNOSTICS updated_count = ROW_COUNT;
  RETURN updated_count > 0;
END;
$$;

GRANT EXECUTE ON FUNCTION public.mark_swap_swapped(uuid, uuid) TO anon, authenticated;