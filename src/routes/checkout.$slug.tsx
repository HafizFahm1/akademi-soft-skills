import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Check, Copy, MessageCircle, ShieldCheck } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { type Ebook, findEbook, formatRupiah } from "@/data/ebooks";
import { waLink, waPurchaseMessage } from "@/lib/whatsapp";

export const Route = createFileRoute("/checkout/$slug")({
  loader: ({ params }): Ebook => {
    const ebook = findEbook(params.slug);
    if (!ebook) throw notFound();
    return ebook;
  },
  head: ({ loaderData }) => ({
    meta: loaderData ? [{ title: `Checkout — ${loaderData.title}` }] : [],
  }),
  component: CheckoutPage,
});

const methods = [
  { id: "qris", name: "QRIS", desc: "Scan QR dari semua e-wallet & m-banking", info: "Scan QR di aplikasi favorit Anda" },
  { id: "bca", name: "Transfer BCA", desc: "Bank Central Asia", info: "1234567890 a.n. Akademi Soft Skills" },
  { id: "dana", name: "DANA", desc: "Saldo DANA", info: "0812-3456-7890 a.n. Admin ASSI" },
  { id: "ovo", name: "OVO", desc: "Saldo OVO", info: "0812-3456-7890 a.n. Admin ASSI" },
  { id: "gopay", name: "GoPay", desc: "Saldo GoPay", info: "0812-3456-7890 a.n. Admin ASSI" },
];

function CheckoutPage() {
  const ebook = Route.useLoaderData() as Ebook;
  const [method, setMethod] = useState(methods[0]);
  const [step, setStep] = useState<1 | 2>(1);
  const [form, setForm] = useState({ name: "", whatsapp: "", email: "", file: null as File | null });
  const [copied, setCopied] = useState(false);

  const copyInfo = () => {
    navigator.clipboard.writeText(method.info);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.whatsapp || !form.email) return;
    const url = waLink(waPurchaseMessage(ebook.title, form.name));
    window.location.href = url;
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <section className="container mx-auto px-4 py-12">
        <Link to="/ebook/$slug" params={{ slug: ebook.slug }} className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-gold">
          <ArrowLeft className="h-4 w-4" /> Kembali ke detail ebook
        </Link>

        <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
          <div className="space-y-8">
            {/* Step indicator */}
            <div className="flex items-center gap-3">
              {[1, 2].map((n) => (
                <div key={n} className="flex items-center gap-3">
                  <div className={`flex h-9 w-9 items-center justify-center rounded-full font-bold text-sm transition-smooth ${
                    step >= n ? "bg-gold-gradient text-primary shadow-gold" : "bg-secondary text-muted-foreground"
                  }`}>
                    {n}
                  </div>
                  <span className={`text-sm font-semibold ${step >= n ? "text-foreground" : "text-muted-foreground"}`}>
                    {n === 1 ? "Pilih Metode" : "Konfirmasi Pembayaran"}
                  </span>
                  {n === 1 && <div className="mx-3 h-px w-12 bg-border" />}
                </div>
              ))}
            </div>

            {step === 1 && (
              <div className="rounded-2xl bg-card p-7 shadow-glass ring-1 ring-border/50">
                <h2 className="font-display text-xl font-bold">Pilih Metode Pembayaran</h2>
                <p className="mt-1 text-sm text-muted-foreground">Semua metode aman & diverifikasi manual oleh admin.</p>
                <div className="mt-6 grid gap-3">
                  {methods.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setMethod(m)}
                      className={`flex items-center justify-between rounded-xl border-2 p-4 text-left transition-smooth ${
                        method.id === m.id ? "border-gold bg-gold/5" : "border-border hover:border-gold/40"
                      }`}
                    >
                      <div>
                        <p className="font-semibold">{m.name}</p>
                        <p className="text-xs text-muted-foreground">{m.desc}</p>
                      </div>
                      {method.id === m.id && <Check className="h-5 w-5 text-gold" />}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setStep(2)}
                  className="mt-7 w-full rounded-full bg-gold-gradient py-3.5 text-sm font-semibold text-primary shadow-gold transition-smooth hover:scale-[1.01]"
                >
                  Lanjut ke Pembayaran →
                </button>
              </div>
            )}

            {step === 2 && (
              <>
                <div className="rounded-2xl bg-card p-7 shadow-glass ring-1 ring-border/50">
                  <h2 className="font-display text-xl font-bold">Instruksi Pembayaran — {method.name}</h2>
                  <div className="mt-5 rounded-xl bg-hero p-5 text-primary-foreground">
                    <p className="text-xs uppercase tracking-widest text-gold">Nomor / Akun {method.name}</p>
                    <div className="mt-2 flex items-center justify-between gap-3">
                      <p className="font-display text-lg font-bold">{method.info}</p>
                      <button onClick={copyInfo} className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold backdrop-blur hover:bg-white/20">
                        <Copy className="h-3 w-3" /> {copied ? "Tersalin!" : "Salin"}
                      </button>
                    </div>
                    <p className="mt-3 text-xs text-primary-foreground/70">
                      Total transfer: <span className="font-bold text-gold">{formatRupiah(ebook.price)}</span>
                    </p>
                  </div>
                  <ol className="mt-6 space-y-2 text-sm text-muted-foreground">
                    <li>1. Lakukan pembayaran sesuai jumlah di atas.</li>
                    <li>2. Simpan bukti transfer (screenshot/foto).</li>
                    <li>3. Lengkapi form di samping & upload bukti.</li>
                    <li>4. Klik "Konfirmasi Pembayaran" — Anda akan diarahkan ke WhatsApp admin.</li>
                  </ol>
                  <button onClick={() => setStep(1)} className="mt-5 text-xs text-muted-foreground hover:text-gold">
                    ← Ganti metode pembayaran
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="rounded-2xl bg-card p-7 shadow-glass ring-1 ring-border/50">
                  <h2 className="font-display text-xl font-bold">Data Pembeli</h2>
                  <div className="mt-5 grid gap-4">
                    <div>
                      <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Nama Lengkap</label>
                      <input
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="mt-1.5 w-full rounded-lg border border-input bg-background px-4 py-3 text-sm focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
                      />
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Nomor WhatsApp</label>
                        <input
                          required
                          type="tel"
                          placeholder="08xxxxxxxxxx"
                          value={form.whatsapp}
                          onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                          className="mt-1.5 w-full rounded-lg border border-input bg-background px-4 py-3 text-sm focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email</label>
                        <input
                          required
                          type="email"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          className="mt-1.5 w-full rounded-lg border border-input bg-background px-4 py-3 text-sm focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Upload Bukti Transfer</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setForm({ ...form, file: e.target.files?.[0] ?? null })}
                        className="mt-1.5 w-full rounded-lg border border-dashed border-input bg-background px-4 py-3 text-sm file:mr-3 file:rounded-full file:border-0 file:bg-gold-gradient file:px-4 file:py-1.5 file:text-xs file:font-semibold file:text-primary"
                      />
                      <p className="mt-1 text-xs text-muted-foreground">Bukti akan dikirim langsung melalui WhatsApp.</p>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold-gradient py-3.5 text-sm font-semibold text-primary shadow-gold transition-smooth hover:scale-[1.01]"
                  >
                    <MessageCircle className="h-4 w-4" /> Konfirmasi & Lanjut ke WhatsApp Admin
                  </button>
                  <p className="mt-3 flex items-center justify-center gap-1 text-xs text-muted-foreground">
                    <ShieldCheck className="h-3 w-3 text-gold" /> Data Anda aman & terenkripsi
                  </p>
                </form>
              </>
            )}
          </div>

          {/* Order summary */}
          <aside className="lg:sticky lg:top-24 self-start">
            <div className="rounded-2xl bg-card-gradient p-6 shadow-elegant ring-1 ring-border/50">
              <p className="text-xs font-semibold uppercase tracking-widest text-gold">Ringkasan Pesanan</p>
              <div className="mt-5 flex gap-4">
                <img src={ebook.cover} alt={ebook.title} className="h-24 w-20 rounded-lg object-cover" />
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{ebook.category}</p>
                  <h3 className="font-display text-base font-bold leading-tight">{ebook.title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">oleh {ebook.author}</p>
                </div>
              </div>
              <div className="my-5 h-px bg-border" />
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Harga normal</span>
                  <span className="line-through">{formatRupiah(ebook.originalPrice)}</span>
                </div>
                <div className="flex justify-between text-gold">
                  <span>Diskon</span>
                  <span>-{formatRupiah(ebook.originalPrice - ebook.price)}</span>
                </div>
              </div>
              <div className="my-5 h-px bg-border" />
              <div className="flex items-end justify-between">
                <span className="text-sm font-semibold">Total Bayar</span>
                <span className="font-display text-2xl font-bold text-primary dark:text-gold">{formatRupiah(ebook.price)}</span>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
