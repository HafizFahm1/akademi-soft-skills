import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import { ProductCard } from "@/components/site/ProductCard";
import { supabase } from "@/integrations/supabase/client";
import type { Produk } from "@/lib/site-data";

export const Route = createFileRoute("/audio-video")({
  head: () => ({ meta: [
    { title: "Audio & Video — Akademi Soft Skills Indonesia" },
    { name: "description", content: "Podcast, audio motivasi, dan video pembelajaran inspiratif." },
  ]}),
  component: AVPage,
});

function AVPage() {
  const [items, setItems] = useState<Produk[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from("audio_videos").select("*").eq("published", true).order("created_at", { ascending: false })
      .then(({ data }) => {
        setItems((data ?? []).map(d => ({
          id: d.id, judul: d.judul,
          kategori: (d.tipe === "video" ? "video" : "audio") as Produk["kategori"],
          harga: d.harga, badge: d.badge as Produk["badge"],
          rating: d.rating ?? undefined, desc: d.deskripsi ?? "",
          thumb: d.thumb ?? "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800&q=80",
        })));
        setLoading(false);
      });
  }, []);

  return (
    <>
      <PageHeader eyebrow="Media Learning" title="Audio & Video Inspiratif" desc="Podcast, motivasi, dan video pembelajaran kapan saja." />
      <section className="mx-auto max-w-7xl px-4 md:px-8 py-14">
        {loading ? (
          <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-[var(--brand-tosca)]" /></div>
        ) : items.length === 0 ? (
          <div className="text-center text-muted-foreground py-20">Belum ada konten tersedia.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {items.map((p, i) => (<ProductCard key={p.id} p={p} index={i} />))}
          </div>
        )}
      </section>
    </>
  );
}
