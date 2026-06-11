DROP POLICY "Anyone can mark as swapped" ON public.swap_requests;

CREATE POLICY "Anyone can mark available as swapped"
ON public.swap_requests FOR UPDATE
USING (status = 'available')
WITH CHECK (status IN ('available', 'swapped'));