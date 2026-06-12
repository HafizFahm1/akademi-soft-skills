import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Search, Loader2 } from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import { ProductCard } from "@/components/site/ProductCard";
import { supabase } from "@/integrations/supabase/client";
import type { Produk } from "@/lib/site-data";

export const Route = createFileRoute("/book")({
  head: () => ({ meta: [
    { title: "Book — Akademi Soft Skills Indonesia" },
    { name: "description", content: "Marketplace eBook premium untuk pengembangan diri profesional." },
  ]}),
  component: BookPage,
});

function BookPage() {
  const [q, setQ] = useState("");
  const [items, setItems] = useState<Produk[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from("books").select("*").eq("published", true).order("created_at", { ascending: false })
      .then(({ data }) => {
        setItems((data ?? []).map(d => ({
          id: d.id, judul: d.judul, kategori: "book" as const,
          harga: d.harga, badge: d.badge as Produk["badge"],
          rating: d.rating ?? undefined, desc: d.deskripsi ?? "",
          thumb: d.thumb ?? "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&q=80",
        })));
        setLoading(false);
      });
  }, []);

  const list = items.filter(b => b.judul.toLowerCase().includes(q.toLowerCase()));

  return (
    <>
      <PageHeader eyebrow="Marketplace eBook" title="Book Premium untuk Profesional" desc="Cover 3D, harga terjangkau, kualitas dunia." />
      <section className="mx-auto max-w-7xl px-4 md:px-8 -mt-10">
        <div className="rounded-2xl bg-card border shadow-soft p-4 max-w-xl mx-auto relative">
          <Search className="absolute left-7 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input value={q} onChange={e => setQ(e.target.value)} placeholder="Cari buku..." className="w-full rounded-xl bg-secondary/60 pl-11 pr-4 py-3 text-sm outline-none focus:ring-2 ring-[var(--brand-tosca)]" />
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 md:px-8 py-14">
        {loading ? (
          <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-[var(--brand-tosca)]" /></div>
        ) : list.length === 0 ? (
          <div className="text-center text-muted-foreground py-20">Belum ada buku tersedia.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {list.map((p, i) => (<ProductCard key={p.id} p={p} index={i} />))}
          </div>
        )}
      </section>
    </>
  );
}
