import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Award, BookOpen, CheckCircle2, Download, Sparkles, Star, Tag, Users } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { EbookCard } from "@/components/EbookCard";
import { ebooks } from "@/data/ebooks";
import heroImg from "@/assets/hero-ebooks.jpg";

export const Route = createFileRoute("/")({
  component: LandingPage,
});

const stats = [
  { value: "25.000+", label: "Pembaca Aktif" },
  { value: "4.9/5", label: "Rating Rata-rata" },
  { value: "10+", label: "Kategori Premium" },
  { value: "98%", label: "Kepuasan Pembaca" },
];

const benefits = [
  { icon: Download, title: "Akses Selamanya", desc: "Beli sekali, baca dan unduh kapan saja tanpa batas waktu." },
  { icon: Award, title: "Materi Kurasi Pakar", desc: "Ditulis oleh praktisi & akademisi berpengalaman di bidangnya." },
  { icon: Sparkles, title: "Update Berkala", desc: "Konten terus diperbarui mengikuti tren & riset terbaru." },
  { icon: Users, title: "Komunitas Eksklusif", desc: "Bergabung dengan ribuan profesional yang terus berkembang." },
];

const testimonials = [
  { name: "Annisa Rahma", role: "Marketing Manager", text: "Ebook Public Speaking-nya benar-benar mengubah cara saya presentasi di depan klien. Worth every rupiah!", avatar: "AR" },
  { name: "Dimas Pratama", role: "Founder Startup", text: "Leadership Blueprint memberi framework praktis yang langsung saya terapkan untuk tim saya.", avatar: "DP" },
  { name: "Citra Maharani", role: "Content Creator", text: "Personal Branding Pro itu cetak biru lengkap. Followers saya naik 3x dalam 2 bulan.", avatar: "CM" },
];

function LandingPage() {
  const featured = ebooks.slice(0, 4);
  const bestSellers = [...ebooks].sort((a, b) => b.reviews - a.reviews).slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Promo banner */}
      <div className="bg-gold-gradient text-primary">
        <div className="container mx-auto flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold md:text-sm">
          <Tag className="h-4 w-4" />
          <span>FLASH SALE — Diskon hingga 60% untuk semua ebook premium. Berakhir minggu ini!</span>
        </div>
      </div>

      {/* HERO */}
      <section className="relative overflow-hidden bg-hero">
        <div className="glow-radial absolute inset-0" />
        <div className="container relative mx-auto grid gap-12 px-4 py-20 md:grid-cols-2 md:py-28 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col justify-center text-primary-foreground"
          >
            <span className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-gold/30 bg-white/5 px-4 py-1.5 text-xs font-medium text-gold backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" /> Platform Ebook Soft Skills #1 di Indonesia
            </span>
            <h1 className="font-display text-4xl font-bold leading-[1.1] md:text-5xl lg:text-6xl">
              Bentuk Versi <span className="text-gradient-gold">Terbaik</span> Dirimu, Mulai Hari Ini.
            </h1>
            <p className="mt-6 max-w-lg text-base text-primary-foreground/80 md:text-lg">
              Ebook premium pilihan untuk public speaking, leadership, komunikasi, personal branding, dan soft skill profesional yang akan mengubah karir & hidupmu.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/katalog"
                className="inline-flex items-center gap-2 rounded-full bg-gold-gradient px-7 py-3.5 text-sm font-semibold text-primary shadow-gold transition-smooth hover:scale-105"
              >
                Beli Sekarang <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/katalog"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-semibold text-primary-foreground backdrop-blur transition-smooth hover:bg-white/10"
              >
                <BookOpen className="h-4 w-4" /> Lihat Katalog
              </Link>
            </div>
            <div className="mt-10 flex items-center gap-6 text-sm text-primary-foreground/70">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-gold text-gold" />)}
              </div>
              <span>Dipercaya 25.000+ profesional Indonesia</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex items-center justify-center"
          >
            <div className="absolute inset-0 -z-10 rounded-full bg-gold/20 blur-3xl" />
            <img
              src={heroImg}
              alt="Koleksi ebook premium Akademi Soft Skills Indonesia"
              width={1280}
              height={960}
              className="animate-float w-full max-w-md rounded-3xl shadow-elegant"
            />
          </motion.div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-y border-border bg-card">
        <div className="container mx-auto grid grid-cols-2 gap-6 px-4 py-12 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-display text-3xl font-bold text-primary md:text-4xl dark:text-gold">{s.value}</p>
              <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground md:text-sm">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* BEST SELLERS */}
      <section className="container mx-auto px-4 py-20">
        <div className="mb-12 flex items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-gold">Terlaris Minggu Ini</p>
            <h2 className="font-display text-3xl font-bold md:text-4xl">Ebook Pilihan Pembaca</h2>
          </div>
          <Link to="/katalog" className="hidden text-sm font-semibold text-primary hover:text-gold dark:text-gold md:inline-flex">
            Lihat Semua →
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {bestSellers.map((e) => <EbookCard key={e.id} ebook={e} />)}
        </div>
      </section>

      {/* BENEFITS */}
      <section className="bg-secondary py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-gold">Mengapa Memilih Kami</p>
            <h2 className="font-display text-3xl font-bold md:text-4xl">Investasi Terbaik untuk Masa Depan</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {benefits.map((b) => (
              <div key={b.title} className="rounded-2xl bg-card p-7 shadow-glass ring-1 ring-border/50 transition-smooth hover:-translate-y-1 hover:shadow-elegant">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gold-gradient shadow-gold">
                  <b.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-display text-lg font-bold">{b.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PREVIEW */}
      <section className="container mx-auto px-4 py-20">
        <div className="mb-12 text-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-gold">Preview Koleksi</p>
          <h2 className="font-display text-3xl font-bold md:text-4xl">Mulai dari Topik Favoritmu</h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((e) => <EbookCard key={e.id} ebook={e} />)}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-hero py-20 text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-gold">Testimoni</p>
            <h2 className="font-display text-3xl font-bold md:text-4xl">Cerita Mereka yang Sudah Bertransformasi</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <div key={t.name} className="glass rounded-2xl p-7">
                <div className="mb-4 flex items-center gap-1">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-gold text-gold" />)}
                </div>
                <p className="text-sm leading-relaxed text-primary-foreground/90">"{t.text}"</p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gold-gradient font-bold text-primary">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{t.name}</p>
                    <p className="text-xs text-primary-foreground/60">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-20">
        <div className="relative overflow-hidden rounded-3xl bg-hero p-10 text-center text-primary-foreground shadow-elegant md:p-16">
          <div className="glow-radial absolute inset-0" />
          <div className="relative">
            <CheckCircle2 className="mx-auto mb-4 h-12 w-12 text-gold" />
            <h2 className="font-display text-3xl font-bold md:text-4xl">Siap Mulai Perjalananmu?</h2>
            <p className="mx-auto mt-4 max-w-xl text-primary-foreground/80">
              Lebih dari 25.000 profesional sudah bertransformasi. Sekarang giliranmu.
            </p>
            <Link
              to="/katalog"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold-gradient px-8 py-4 text-sm font-semibold text-primary shadow-gold transition-smooth hover:scale-105"
            >
              Jelajahi Semua Ebook <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
