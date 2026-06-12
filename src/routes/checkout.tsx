import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Copy, Check, QrCode, Building2, Wallet, ArrowRight, Loader2 } from "lucide-react";
import { z } from "zod";
import { rupiah } from "@/lib/site-data";
import { supabase } from "@/integrations/supabase/client";

const searchSchema = z.object({ produkId: z.string().optional() });

export const Route = createFileRoute("/checkout")({
  validateSearch: searchSchema,
  head: () => ({ meta: [{ title: "Checkout — Akademi Soft Skills Indonesia" }] }),
  component: CheckoutPage,
});

const METODE = [
  { id: "qris", label: "QRIS", icon: QrCode },
  { id: "transfer", label: "Transfer Bank", icon: Building2 },
  { id: "ewallet", label: "E-Wallet", icon: Wallet },
];

type Produk = { id: string; judul: string; harga: number; thumb: string | null; kategori: string; deskripsi?: string | null; };

async function fetchProduk(produkId: string): Promise<Produk | null> {
  // coba semua tabel
  const tables = [
    { name: "trainings", kategori: "training" },
    { name: "books", kategori: "book" },
    { name: "audio_videos", kategori: "media" },
  ];
  for (const t of tables) {
    const { data } = await (supabase.from(t.name as any).select("id,judul,harga,thumb,deskripsi").eq("id", produkId).single() as any);
    if (data) return { ...data, kategori: t.kategori };
  }
  return null;
}

function CheckoutPage() {
  const { produkId } = Route.useSearch();
  const navigate = useNavigate();

  const [produk, setProduk] = useState<Produk | null>(null);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState<1 | 2>(1);
  const [metode, setMetode] = useState("qris");
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({ nama: "", email: "", wa: "" });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!produkId) { setLoading(false); return; }
    fetchProduk(produkId).then(p => { setProduk(p); setLoading(false); });
  }, [produkId]);

  const copy = () => {
    navigator.clipboard.writeText("1234567890");
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const [buktiFile, setBuktiFile] = useState<File | null>(null);
  const [buktiError, setBuktiError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!produk) return;
    if (!buktiFile) { setBuktiError("Bukti pembayaran wajib diupload!"); return; }
    setBuktiError("");
    setSubmitting(true);

    const ext = buktiFile.name.split(".").pop();
    const filename = `bukti-${Date.now()}.${ext}`;
    const { error: uploadError } = await supabase.storage
      .from("media").upload(`bukti/${filename}`, buktiFile, { upsert: true });

    if (uploadError) {
      setSubmitting(false);
      alert("Gagal upload bukti: " + uploadError.message);
      return;
    }

    const { data: urlData } = supabase.storage.from("media").getPublicUrl(`bukti/${filename}`);
    const buktiUrl = urlData.publicUrl;

    const { error } = await supabase.from("transactions").insert({
      produk_nama: produk.judul,
      produk_kategori: produk.kategori,
      nama: form.nama,
      email: form.email,
      whatsapp: form.wa,
      metode,
      total: produk.harga,
      status: "menunggu",
      bukti_url: buktiUrl,
    });
    setSubmitting(false);
    if (error) { alert("Gagal menyimpan transaksi: " + error.message); return; }
    navigate({ to: "/sukses", search: { produk: produk.judul } });
  };

  if (loading) return (
    <div className="flex justify-center items-center py-40">
      <Loader2 className="h-10 w-10 animate-spin text-[var(--brand-tosca)]" />
    </div>
  );

  if (!produk) return (
    <div className="text-center py-40">
      <p className="text-muted-foreground">Produk tidak ditemukan.</p>
      <Link to="/training" className="mt-4 inline-block text-[var(--brand-tosca)] font-semibold">← Kembali ke Training</Link>
    </div>
  );

  return (
    <section className="mx-auto max-w-6xl px-4 md:px-8 py-12">
      {/* Progress */}
      <div className="flex items-center gap-3 mb-10 max-w-md mx-auto">
        {[1, 2].map(s => (
          <div key={s} className="flex-1 flex items-center gap-3">
            <div className={`h-9 w-9 rounded-full grid place-items-center font-bold text-sm transition ${step >= s ? "gradient-orange text-white shadow-glow" : "bg-secondary text-muted-foreground"}`}>{s}</div>
            <div className={`flex-1 h-1 rounded-full transition ${step > s ? "gradient-orange" : "bg-secondary"}`} />
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-2 rounded-3xl bg-card border shadow-soft p-6 md:p-8">
          {step === 1 && (
            <>
              <h2 className="text-2xl font-bold text-[var(--brand-navy)]">Data Pemesan</h2>
              <p className="text-sm text-muted-foreground mt-1">Lengkapi data untuk melanjutkan pembayaran.</p>
              <div className="mt-6 space-y-4">
                {[
                  { k: "nama", label: "Nama Lengkap", type: "text" },
                  { k: "email", label: "Email", type: "email" },
                  { k: "wa", label: "Nomor WhatsApp", type: "tel" },
                ].map(f => (
                  <div key={f.k}>
                    <label className="block text-xs font-semibold text-[var(--brand-navy)] mb-1.5">{f.label}</label>
                    <input required type={f.type} value={(form as any)[f.k]}
                      onChange={e => setForm({ ...form, [f.k]: e.target.value })}
                      className="w-full rounded-xl border bg-background px-4 py-3 text-sm outline-none focus:ring-2 ring-[var(--brand-tosca)]" />
                  </div>
                ))}
              </div>
              <button disabled={!form.nama || !form.email || !form.wa} onClick={() => setStep(2)}
                className="mt-6 w-full rounded-full gradient-orange py-3.5 text-sm font-semibold text-white shadow-glow disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                Lanjut ke Pembayaran <ArrowRight className="h-4 w-4" />
              </button>
            </>
          )}

          {step === 2 && (
            <form onSubmit={submit}>
              <h2 className="text-2xl font-bold text-[var(--brand-navy)]">Metode Pembayaran</h2>
              <div className="mt-5 grid grid-cols-3 gap-3">
                {METODE.map(m => (
                  <button type="button" key={m.id} onClick={() => setMetode(m.id)}
                    className={`rounded-2xl p-4 border-2 transition text-center ${metode === m.id ? "border-[var(--brand-orange)] bg-[var(--brand-orange)]/5" : "border-border hover:border-[var(--brand-tosca)]/40"}`}>
                    <m.icon className={`mx-auto h-7 w-7 ${metode === m.id ? "text-[var(--brand-orange)]" : "text-muted-foreground"}`} />
                    <div className="mt-2 text-xs font-semibold">{m.label}</div>
                  </button>
                ))}
              </div>
              <div className="mt-6 rounded-2xl bg-secondary/50 p-5">
                {metode === "qris" && (
                  <div className="text-center">
                    <div className="mx-auto h-44 w-44 bg-white rounded-2xl grid place-items-center shadow-soft">
                      <QrCode className="h-32 w-32 text-[var(--brand-navy)]" />
                    </div>
                    <p className="mt-3 text-xs text-muted-foreground">Scan dengan aplikasi QRIS apa pun</p>
                  </div>
                )}
                {metode === "transfer" && (
                  <div>
                    <div className="text-xs text-muted-foreground">Bank BCA</div>
                    <div className="mt-1 text-2xl font-extrabold text-[var(--brand-navy)] tracking-wider">1234 5678 90</div>
                    <div className="mt-1 text-xs">a.n. Akademi Soft Skills Indonesia</div>
                    <button type="button" onClick={copy} className="mt-3 inline-flex items-center gap-2 rounded-full bg-[var(--brand-navy)] text-white px-4 py-2 text-xs font-semibold">
                      {copied ? <><Check className="h-3 w-3" /> Tersalin</> : <><Copy className="h-3 w-3" /> Salin Nomor</>}
                    </button>
                  </div>
                )}
                {metode === "ewallet" && (
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between"><span>OVO</span><span className="font-semibold">081234567890</span></div>
                    <div className="flex justify-between"><span>DANA</span><span className="font-semibold">081234567890</span></div>
                    <div className="flex justify-between"><span>GoPay</span><span className="font-semibold">081234567890</span></div>
                  </div>
                )}
              </div>
              <div className="mt-6">
                <label className="block text-xs font-semibold text-[var(--brand-navy)] mb-1.5">
                  Upload Bukti Pembayaran <span className="text-red-500">*</span>
                </label>
                <input type="file" accept="image/*" required
                  onChange={e => { setBuktiFile(e.target.files?.[0] ?? null); setBuktiError(""); }}
                  className="w-full text-sm rounded-xl border bg-background px-4 py-3 file:mr-3 file:rounded-full file:border-0 file:bg-[var(--brand-tosca)] file:text-white file:px-3 file:py-1.5 file:text-xs" />
                {buktiError && <p className="mt-2 text-xs text-red-500 font-semibold">{buktiError}</p>}
                {buktiFile && <p className="mt-2 text-xs text-green-600">✓ File dipilih: {buktiFile.name}</p>}
              </div>
              <div className="mt-6 flex gap-3">
                <button type="button" onClick={() => setStep(1)} className="rounded-full border-2 border-border px-6 py-3 text-sm font-semibold">Kembali</button>
                <button type="submit" disabled={submitting || !buktiFile} className="flex-1 rounded-full gradient-orange py-3.5 text-sm font-semibold text-white shadow-glow disabled:opacity-50 disabled:cursor-not-allowed">
                  {submitting ? "Mengupload & Memproses..." : "Konfirmasi Pembayaran"}
                </button>
              </div>
            </form>
          )}
        </motion.div>

        {/* Ringkasan */}
        <motion.aside initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="rounded-3xl gradient-navy text-white p-6 shadow-elegant h-fit sticky top-28">
          <h3 className="font-bold text-lg">Ringkasan Pesanan</h3>
          <div className="mt-4 rounded-2xl overflow-hidden">
            <img src={produk.thumb ?? "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=800&q=80"} alt={produk.judul} className="w-full aspect-video object-cover" />
          </div>
          <div className="mt-4">
            <div className="font-bold">{produk.judul}</div>
            <div className="text-xs text-white/60 capitalize">{produk.kategori}</div>
          </div>
          <div className="mt-5 space-y-2 text-sm border-t border-white/10 pt-4">
            <div className="flex justify-between"><span className="text-white/70">Subtotal</span><span>{rupiah(produk.harga)}</span></div>
            <div className="flex justify-between"><span className="text-white/70">Admin</span><span>Rp 0</span></div>
            <div className="flex justify-between text-lg font-extrabold pt-3 border-t border-white/10">
              <span>Total</span>
              <span className="text-[var(--brand-lime)]">{rupiah(produk.harga)}</span>
            </div>
          </div>
          <Link to="/training" className="mt-5 block text-center text-xs text-white/60 hover:text-white">← Lihat training lain</Link>
        </motion.aside>
      </div>
    </section>
  );
}
