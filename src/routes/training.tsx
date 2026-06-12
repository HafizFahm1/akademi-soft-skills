import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Search, Loader2 } from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import { ProductCard } from "@/components/site/ProductCard";
import { supabase } from "@/integrations/supabase/client";
import type { Produk } from "@/lib/site-data";

export const Route = createFileRoute("/training")({
  head: () => ({ meta: [
    { title: "Training & Education — Akademi Soft Skills Indonesia" },
    { name: "description", content: "Kelas online interaktif bersama mentor profesional Indonesia." },
  ]}),
  component: TrainingPage,
});

const LEVELS = ["Semua", "Beginner", "Intermediate", "Advanced"];

function TrainingPage() {
  const [q, setQ] = useState("");
  const [level, setLevel] = useState("Semua");
  const [items, setItems] = useState<Produk[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from("trainings").select("*").eq("published", true).order("created_at", { ascending: false })
      .then(({ data }) => {
        setItems((data ?? []).map(d => ({
          id: d.id, judul: d.judul, kategori: "training" as const,
          mentor: d.mentor ?? undefined, harga: d.harga,
          badge: d.badge as Produk["badge"], level: d.level ?? undefined,
          durasi: d.durasi ?? undefined, rating: d.rating ?? undefined,
          desc: d.deskripsi ?? "",
          thumb: d.thumb ?? "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=800&q=80",
        })));
        setLoading(false);
      });
  }, []);

  const list = items.filter(t =>
    (level === "Semua" || t.level === level) &&
    t.judul.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <>
      <PageHeader eyebrow="Training & Education" title="Belajar Soft Skills dari Mentor Terbaik" desc="Kurikulum modern, sertifikat resmi, dan akses selamanya." />
      <section className="mx-auto max-w-7xl px-4 md:px-8 -mt-10">
        <div className="rounded-2xl bg-card border shadow-soft p-4 flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input value={q} onChange={e => setQ(e.target.value)} placeholder="Cari training..." className="w-full rounded-xl bg-secondary/60 pl-11 pr-4 py-3 text-sm outline-none focus:ring-2 ring-[var(--brand-tosca)]" />
          </div>
          <div className="flex gap-2">
            {LEVELS.map(l => (
              <button key={l} onClick={() => setLevel(l)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition ${level === l ? "gradient-tosca text-white shadow-soft" : "bg-secondary text-muted-foreground hover:text-[var(--brand-navy)]"}`}>
                {l}
              </button>
            ))}
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 md:px-8 py-14">
        {loading ? (
          <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-[var(--brand-tosca)]" /></div>
        ) : list.length === 0 ? (
          <div className="text-center text-muted-foreground py-20">Belum ada training tersedia.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {list.map((p, i) => (<ProductCard key={p.id} p={p} index={i} />))}
          </div>
        )}
      </section>
    </>
  );
}
