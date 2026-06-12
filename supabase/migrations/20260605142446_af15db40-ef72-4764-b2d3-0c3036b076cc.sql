
REVOKE EXECUTE ON FUNCTION public.set_updated_at() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon;

DROP POLICY "anyone can checkout" ON public.transactions;
CREATE POLICY "anyone can checkout" ON public.transactions
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    length(nama) BETWEEN 1 AND 200
    AND length(email) BETWEEN 3 AND 200
    AND length(whatsapp) BETWEEN 3 AND 30
    AND total >= 0
    AND status = 'menunggu'
  );
