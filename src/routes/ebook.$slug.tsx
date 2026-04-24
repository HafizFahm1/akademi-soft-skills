import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, BookOpen, Check, MessageCircle, Star, Tag } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { type Ebook, findEbook, formatRupiah } from "@/data/ebooks";
import { waInquiryMessage, waLink } from "@/lib/whatsapp";

export const Route = createFileRoute("/ebook/$slug")({
  loader: ({ params }): Ebook => {
    const ebook = findEbook(params.slug);
    if (!ebook) throw notFound();
    return ebook;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.title} — Akademi Soft Skills Indonesia` },
          { name: "description", content: loaderData.description },
          { property: "og:title", content: loaderData.title },
          { property: "og:description", content: loaderData.description },
          { property: "og:image", content: loaderData.cover },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="font-display text-3xl">Ebook tidak ditemukan</h1>
        <Link to="/katalog" className="mt-4 inline-block text-gold">← Kembali ke katalog</Link>
      </div>
    </div>
  ),
  component: DetailPage,
});

function DetailPage() {
  const ebook = Route.useLoaderData() as Ebook;
  const discount = Math.round(((ebook.originalPrice - ebook.price) / ebook.originalPrice) * 100);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <section className="bg-hero pb-20 pt-12 text-primary-foreground">
        <div className="container mx-auto px-4">
          <Link to="/katalog" className="mb-8 inline-flex items-center gap-2 text-sm text-primary-foreground/70 hover:text-gold">
            <ArrowLeft className="h-4 w-4" /> Kembali ke katalog
          </Link>

          <div className="grid gap-12 md:grid-cols-[380px_1fr]">
            <div className="relative">
              <div className="absolute -inset-6 rounded-3xl bg-gold/20 blur-2xl" />
              <img
                src={ebook.cover}
                alt={ebook.title}
                className="relative aspect-[3/4] w-full rounded-2xl object-cover shadow-elegant"
              />
              <span className="absolute right-4 top-4 rounded-full bg-gold-gradient px-3 py-1 text-xs font-bold text-primary shadow-gold">
                -{discount}% OFF
              </span>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-gold">{ebook.category}</p>
              <h1 className="mt-3 font-display text-4xl font-bold leading-tight md:text-5xl">{ebook.title}</h1>
              <p className="mt-3 text-primary-foreground/70">oleh <span className="font-semibold text-primary-foreground">{ebook.author}</span></p>

              <div className="mt-5 flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-gold text-gold" />)}
                  <span className="ml-2 font-semibold">{ebook.rating}</span>
                  <span className="text-primary-foreground/60">({ebook.reviews.toLocaleString("id-ID")} ulasan)</span>
                </div>
                <span className="text-primary-foreground/60">·</span>
                <span className="flex items-center gap-1 text-primary-foreground/70"><BookOpen className="h-4 w-4" /> {ebook.pages} halaman</span>
              </div>

              <p className="mt-6 max-w-2xl text-primary-foreground/80">{ebook.description}</p>

              <div className="mt-8 flex items-end gap-4">
                <p className="font-display text-4xl font-bold text-gold">{formatRupiah(ebook.price)}</p>
                <p className="pb-1 text-lg text-primary-foreground/50 line-through">{formatRupiah(ebook.originalPrice)}</p>
                <span className="mb-1 inline-flex items-center gap-1 rounded-full bg-gold/20 px-3 py-1 text-xs font-semibold text-gold">
                  <Tag className="h-3 w-3" /> Hemat {formatRupiah(ebook.originalPrice - ebook.price)}
                </span>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/checkout/$slug"
                  params={{ slug: ebook.slug }}
                  className="inline-flex items-center gap-2 rounded-full bg-gold-gradient px-7 py-3.5 text-sm font-semibold text-primary shadow-gold transition-smooth hover:scale-105"
                >
                  Beli Sekarang
                </Link>
                <a
                  href={waLink(waInquiryMessage(ebook.title))}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-semibold text-primary-foreground backdrop-blur transition-smooth hover:bg-white/10"
                >
                  <MessageCircle className="h-4 w-4" /> Tanya via WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto grid gap-10 px-4 py-16 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-10">
          <div>
            <h2 className="font-display text-2xl font-bold">Apa yang Akan Kamu Pelajari</h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {ebook.highlights.map((h) => (
                <li key={h} className="flex items-start gap-3 rounded-xl bg-card p-4 shadow-glass ring-1 ring-border/50">
                  <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-gold" />
                  <span className="text-sm">{h}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold">Isi Materi</h2>
            <ol className="mt-5 space-y-3">
              {ebook.contents.map((c, i) => (
                <li key={c} className="flex items-center gap-4 rounded-xl bg-card p-4 shadow-glass ring-1 ring-border/50">
                  <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-gold-gradient font-bold text-primary">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm font-medium">{c}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <aside className="lg:sticky lg:top-24 self-start">
          <div className="rounded-2xl bg-card-gradient p-6 shadow-elegant ring-1 ring-border/50">
            <p className="text-xs font-semibold uppercase tracking-widest text-gold">Bonus Eksklusif</p>
            <h3 className="mt-2 font-display text-xl font-bold">Yang Kamu Dapatkan</h3>
            <ul className="mt-5 space-y-3">
              {ebook.benefits.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-gold-gradient">
                    <Check className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <span className="text-sm">{b}</span>
                </li>
              ))}
            </ul>
            <Link
              to="/checkout/$slug"
              params={{ slug: ebook.slug }}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold-gradient px-6 py-3 text-sm font-semibold text-primary shadow-gold transition-smooth hover:scale-[1.02]"
            >
              Beli {formatRupiah(ebook.price)}
            </Link>
          </div>
        </aside>
      </section>

      <SiteFooter />
    </div>
  );
}
