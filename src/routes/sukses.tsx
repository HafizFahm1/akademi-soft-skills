import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Check, MessageCircle, Home } from "lucide-react";
import { z } from "zod";
import { waLink } from "@/lib/site-data";

const search = z.object({ produk: z.string().optional() });

export const Route = createFileRoute("/sukses")({
  validateSearch: search,
  head: () => ({ meta: [{ title: "Pembayaran Sukses — Akademi Soft Skills Indonesia" }]}),
  component: SuksesPage,
});

function SuksesPage() {
  const { produk } = Route.useSearch();
  const namaProduk = produk ?? "Produk Akademi Soft Skills";
  const invoice = "INV-" + Date.now().toString().slice(-8);

  return (
    <section className="mx-auto max-w-2xl px-4 md:px-8 py-16">
      <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 180, damping: 15 }}
        className="mx-auto h-24 w-24 rounded-full gradient-lime grid place-items-center shadow-elegant relative">
        <div className="absolute inset-0 rounded-full gradient-lime animate-ping opacity-30" />
        <Check className="h-12 w-12 text-white" strokeWidth={3} />
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-center mt-6">
        <h1 className="text-3xl md:text-4xl font-extrabold text-[var(--brand-navy)]">Pembayaran Berhasil!</h1>
        <p className="mt-2 text-muted-foreground">Terima kasih, kami telah menerima konfirmasi pembayaranmu.</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
        className="mt-8 rounded-3xl bg-card border shadow-soft p-6 md:p-8">
        <div className="text-xs font-semibold text-[var(--brand-orange)] uppercase tracking-wider">Invoice</div>
        <div className="text-lg font-bold text-[var(--brand-navy)]">{invoice}</div>
        <div className="mt-5 space-y-3 text-sm border-t pt-5">
          <div className="flex justify-between"><span className="text-muted-foreground">Produk</span><span className="font-semibold text-right">{namaProduk}</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Tanggal</span><span className="font-semibold">{new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Status</span><span className="font-semibold text-[var(--brand-lime)]">Lunas</span></div>
        </div>

        <div className="mt-6 grid sm:grid-cols-2 gap-3">
          <a href={waLink(namaProduk)} target="_blank" rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full gradient-lime py-3.5 text-sm font-semibold text-white shadow-glow hover:scale-[1.02] transition">
            <MessageCircle className="h-4 w-4" /> Hubungi Admin
          </a>
          <Link to="/" className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-border py-3.5 text-sm font-semibold hover:bg-secondary transition">
            <Home className="h-4 w-4" /> Kembali ke Beranda
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
