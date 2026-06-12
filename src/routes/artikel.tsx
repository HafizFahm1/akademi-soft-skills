import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Search, Calendar, User, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { PageHeader } from "@/components/site/PageHeader";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/artikel")({
  head: () => ({ meta: [
    { title: "Artikel — Akademi Soft Skills Indonesia" },
    { name: "description", content: "Baca ribuan artikel edukatif terbaru tentang komunikasi, leadership, dan karier." },
  ]}),
  component: ArtikelPage,
});

const KATS = ["Semua", "Komunikasi", "Karier", "Public Speaking", "Mindset", "Produktivitas", "Leadership"];

type Artikel = { id: string; judul: string; slug: string; kategori: string; thumb: string | null; excerpt: string | null; author: string | null; created_at: string; };

function ArtikelPage() {
  const [q, setQ] = useState("");
  const [kat, setKat] = useState("Semua");
  const [items, setItems] = useState<Artikel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from("articles").select("id,judul,slug,kategori,thumb,excerpt,author,created_at")
      .eq("published", true).order("created_at", { ascending: false })
      .then(({ data }) => { setItems(data ?? []); setLoading(false); });
  }, []);

  const list = items.filter(a =>
    (kat === "Semua" || a.kategori === kat) &&
    a.judul.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <>
      <PageHeader eyebrow="Artikel & Insight" title="Pelajari Hal Baru Setiap Hari" desc="Ribuan artikel edukatif terbaru untuk mengembangkan diri." />
      <section className="mx-auto max-w-7xl px-4 md:px-8 -mt-10">
        <div className="rounded-2xl bg-card border shadow-soft p-4 flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input value={q} onChange={e => setQ(e.target.value)} placeholder="Cari artikel..." className="w-full rounded-xl bg-secondary/60 pl-11 pr-4 py-3 text-sm outline-none focus:ring-2 ring-[var(--brand-tosca)]" />
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {KATS.map(k => (
              <button key={k} onClick={() => setKat(k)}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition ${kat === k ? "gradient-orange text-white shadow-soft" : "bg-secondary text-muted-foreground hover:text-[var(--brand-navy)]"}`}>
                {k}
              </button>
            ))}
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 md:px-8 py-14">
        {loading ? (
          <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-[var(--brand-tosca)]" /></div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {list.map((a, i) => (
              <motion.article key={a.id}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group rounded-3xl bg-card border border-border/60 shadow-soft overflow-hidden hover:shadow-elegant transition-all">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img src={a.thumb ?? "https://images.unsplash.com/photo-1552581234-26160f608093?w=800&q=80"} alt={a.judul} loading="lazy" className="h-full w-full object-cover transition group-hover:scale-110 duration-700" />
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-bold bg-white/95 text-[var(--brand-navy)]">{a.kategori}</span>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-[var(--brand-navy)] line-clamp-2 leading-snug">{a.judul}</h3>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{a.excerpt}</p>
                  <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><User className="h-3 w-3" />{a.author ?? "-"}</span>
                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{new Date(a.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}</span>
                  </div>
                </div>
              </motion.article>
            ))}
            {list.length === 0 && <div className="col-span-3 text-center text-muted-foreground py-20">Tidak ada artikel ditemukan.</div>}
          </div>
        )}
      </section>
    </>
  );
}
