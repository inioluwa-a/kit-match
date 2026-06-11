CREATE TABLE public.swap_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  camp TEXT NOT NULL,
  name TEXT NOT NULL,
  platoon TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  item TEXT NOT NULL,
  have_size TEXT NOT NULL,
  need_size TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'available',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  expires_at TIMESTAMPTZ NOT NULL DEFAULT (now() + INTERVAL '14 days')
);

CREATE INDEX idx_swap_requests_camp ON public.swap_requests(camp);
CREATE INDEX idx_swap_requests_status ON public.swap_requests(status);

GRANT SELECT, INSERT, UPDATE ON public.swap_requests TO anon, authenticated;
GRANT ALL ON public.swap_requests TO service_role;

ALTER TABLE public.swap_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view available listings"
ON public.swap_requests FOR SELECT
USING (status = 'available' AND expires_at > now());

CREATE POLICY "Anyone can create listings"
ON public.swap_requests FOR INSERT
WITH CHECK (
  status = 'available'
  AND length(name) BETWEEN 1 AND 50
  AND length(whatsapp) BETWEEN 10 AND 15
  AND length(camp) BETWEEN 1 AND 100
);

CREATE POLICY "Anyone can mark as swapped"
ON public.swap_requests FOR UPDATE
USING (true)
WITH CHECK (status IN ('available', 'swapped'));