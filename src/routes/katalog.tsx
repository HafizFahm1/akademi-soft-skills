import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { EbookCard } from "@/components/EbookCard";
import { categories, ebooks } from "@/data/ebooks";

export const Route = createFileRoute("/katalog")({
  head: () => ({
    meta: [
      { title: "Katalog Ebook Premium — Akademi Soft Skills Indonesia" },
      { name: "description", content: "Jelajahi koleksi ebook premium kami: public speaking, leadership, mindset, digital marketing, dan banyak lagi." },
    ],
  }),
  component: KatalogPage,
});

function KatalogPage() {
  const [active, setActive] = useState("Semua");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return ebooks.filter((e) => {
      const okCat = active === "Semua" || e.category === active;
      const okQ = !query || e.title.toLowerCase().includes(query.toLowerCase()) || e.author.toLowerCase().includes(query.toLowerCase());
      return okCat && okQ;
    });
  }, [active, query]);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <section className="bg-hero py-16 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-gold">Katalog Lengkap</p>
          <h1 className="font-display text-4xl font-bold md:text-5xl">Semua Ebook Premium</h1>
          <p className="mx-auto mt-4 max-w-xl text-primary-foreground/70">
            Pilih kategori atau cari judul favoritmu. Semua ebook bersertifikat & bisa diakses selamanya.
          </p>
          <div className="mx-auto mt-8 flex max-w-md items-center gap-2 rounded-full bg-white/10 px-5 py-3 backdrop-blur ring-1 ring-white/20">
            <Search className="h-4 w-4 text-primary-foreground/70" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari judul atau penulis..."
              className="w-full bg-transparent text-sm text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none"
            />
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition-smooth md:text-sm ${
                active === c
                  ? "bg-gold-gradient text-primary shadow-gold"
                  : "bg-secondary text-foreground hover:bg-accent"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className="py-20 text-center text-muted-foreground">Tidak ada ebook ditemukan.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((e) => <EbookCard key={e.id} ebook={e} />)}
          </div>
        )}
      </section>

      <SiteFooter />
    </div>
  );
}
