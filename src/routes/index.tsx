import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Users, BookOpen, FileText, Award, Sparkles, FileText as FT, BookOpen as BO, GraduationCap, PlayCircle, Briefcase, ChevronRight, Star, Quote, Loader2 } from "lucide-react";
import { KATEGORI, STATS } from "@/lib/site-data";
import { ProductCard } from "@/components/site/ProductCard";
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect } from "react";
import type { Produk } from "@/lib/site-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Akademi Soft Skills Indonesia — Upgrade Soft Skills untuk Masa Depan" },
      { name: "description", content: "Platform pembelajaran digital modern untuk komunikasi, leadership, public speaking, mindset, dan karier profesional." },
      { property: "og:title", content: "Akademi Soft Skills Indonesia" },
      { property: "og:description", content: "Belajar soft skills bersama mentor profesional Indonesia." },
    ],
  }),
  component: Index,
});

const statIcons = { users: Users, book: BookOpen, file: FileText, award: Award } as const;
const katIcons = { "file-text": FT, "book-open": BO, "graduation-cap": GraduationCap, "play-circle": PlayCircle, briefcase: Briefcase } as const;
const toneBg: Record<string, string> = {
  tosca: "gradient-tosca", orange: "gradient-orange", navy: "gradient-navy", lime: "gradient-lime",
  olive: "bg-[var(--brand-lime)]",
};

function Index() {
  const [trainings, setTrainings] = useState<Produk[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from("trainings").select("*").eq("published", true).order("created_at", { ascending: false }).limit(4)
      .then(({ data }) => {
        setTrainings((data ?? []).map(d => ({
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

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden gradient-hero pt-10 pb-32">
        <div className="absolute -top-10 -left-20 h-72 w-72 gradient-orange rotate-45 rounded-3xl opacity-90" />
        <div className="absolute top-32 -left-10 h-40 w-40 gradient-lime rotate-45 rounded-2xl opacity-80" />
        <div className="absolute -bottom-10 left-20 h-32 w-32 gradient-tosca rotate-45 rounded-2xl opacity-70" />

        <div className="relative mx-auto max-w-7xl px-4 md:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-[var(--brand-tosca)]/20 text-xs font-semibold text-[var(--brand-tosca)] uppercase tracking-wider">
              <Sparkles className="h-3.5 w-3.5" /> Platform Edukasi #1 Indonesia
            </div>
            <h1 className="mt-5 text-5xl md:text-6xl xl:text-7xl font-extrabold leading-[1.05] tracking-tight">
              <span className="text-[var(--brand-navy)]">Upgrade Soft Skills</span><br />
              <span className="text-[var(--brand-tosca)]">untuk Masa Depan</span><br />
              <span className="text-[var(--brand-orange)]">Indonesia</span>
            </h1>
            <p className="mt-6 text-base md:text-lg text-muted-foreground max-w-lg leading-relaxed">
              Platform pembelajaran digital modern untuk meningkatkan kemampuan komunikasi, leadership, public speaking, mindset, dan karier profesional.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/training" className="group inline-flex items-center gap-2 rounded-full gradient-orange px-7 py-3.5 text-sm font-semibold text-white shadow-glow hover:scale-105 transition">
                Mulai Belajar <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </Link>
              <Link to="/training" className="group inline-flex items-center gap-2 rounded-full gradient-tosca px-7 py-3.5 text-sm font-semibold text-white shadow-soft hover:scale-105 transition">
                Jelajahi Training <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative h-[480px] hidden md:block">
            <div className="absolute inset-0 grid grid-cols-2 gap-3">
              <div className="space-y-3">
                <div className="h-[58%] rounded-3xl overflow-hidden shadow-elegant relative">
                  <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80" alt="Trainer" className="h-full w-full object-cover" />
                </div>
                <div className="h-[40%] rounded-3xl gradient-tosca p-5 flex flex-col justify-end shadow-elegant">
                  <Quote className="h-7 w-7 text-white/60 mb-2" />
                  <p className="text-white text-sm font-medium italic leading-snug">"Investasi terbaik adalah investasi pada dirimu sendiri."</p>
                  <span className="text-white/70 text-[11px] mt-2">— Akademi Soft Skills Indonesia</span>
                </div>
              </div>
              <div className="space-y-3 mt-8">
                <div className="h-[40%] rounded-3xl overflow-hidden shadow-elegant">
                  <img src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=600&q=80" alt="Group" className="h-full w-full object-cover" />
                </div>
                <div className="h-[58%] rounded-3xl overflow-hidden shadow-elegant relative">
                  <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80" alt="Belajar" className="h-full w-full object-cover" />
                  <div className="absolute bottom-3 left-3 right-3 glass rounded-2xl p-3 flex items-center gap-2">
                    <div className="h-9 w-9 rounded-full gradient-orange grid place-items-center text-white font-bold text-xs">+</div>
                    <div className="text-xs">
                      <div className="font-semibold text-[var(--brand-navy)]">12.500 peserta</div>
                      <div className="text-muted-foreground">aktif belajar</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 h-20 w-20 gradient-lime clip-diamond opacity-80 animate-float" />
            <div className="absolute bottom-10 -left-4 h-14 w-14 gradient-orange clip-diamond opacity-90 animate-float" style={{ animationDelay: "1.5s" }} />
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}
          className="relative mx-auto max-w-7xl px-4 md:px-8 mt-12">
          <div className="rounded-3xl bg-card shadow-elegant border border-border/60 p-6 md:p-8 grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map((s) => {
              const Icon = statIcons[s.icon as keyof typeof statIcons];
              return (
                <div key={s.label} className="flex items-center gap-4">
                  <div className={`h-14 w-14 shrink-0 rounded-2xl ${toneBg[s.tone]} grid place-items-center shadow-soft`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl md:text-3xl font-extrabold text-[var(--brand-navy)]">{s.value}</div>
                    <div className="text-xs md:text-sm text-muted-foreground">{s.label}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* KATEGORI */}
      <section className="relative -mt-12 mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {KATEGORI.map((k, i) => {
            const Icon = katIcons[k.icon as keyof typeof katIcons];
            return (
              <motion.div key={k.to} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} whileHover={{ y: -6 }}>
                <Link to={k.to} className="group block rounded-2xl bg-card border border-border/60 p-5 shadow-soft hover:shadow-elegant transition-all">
                  <div className={`h-12 w-12 rounded-xl ${toneBg[k.tone]} grid place-items-center shadow-soft`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="mt-4 font-bold text-[var(--brand-navy)]">{k.title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{k.desc}</p>
                  <div className="mt-3 flex items-center gap-1 text-[var(--brand-tosca)] text-xs font-semibold opacity-0 group-hover:opacity-100 transition">
                    Lihat Detail <ChevronRight className="h-3 w-3" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* TRAINING POPULER - dari Supabase */}
      <section className="relative mt-24 py-16 bg-secondary/40">
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background to-transparent pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-4 md:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="text-xs font-semibold text-[var(--brand-orange)] uppercase tracking-wider">Pilihan Terbaik</div>
              <h2 className="mt-2 text-3xl md:text-4xl font-extrabold text-[var(--brand-navy)]">Training Populer</h2>
            </div>
            <Link to="/training" className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-[var(--brand-orange)] hover:gap-2 transition-all">
              Lihat Semua <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          {loading ? (
            <div className="flex justify-center py-16"><Loader2 className="h-8 w-8 animate-spin text-[var(--brand-tosca)]" /></div>
          ) : trainings.length === 0 ? (
            <div className="text-center text-muted-foreground py-16">Belum ada training tersedia. Tambahkan melalui panel admin.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {trainings.map((p, i) => (<ProductCard key={p.id} p={p} index={i} />))}
            </div>
          )}
        </div>
      </section>

      {/* WHY US */}
      <section className="mx-auto max-w-7xl px-4 md:px-8 py-20">
        <div className="text-center mb-12">
          <div className="text-xs font-semibold text-[var(--brand-tosca)] uppercase tracking-wider">Mengapa ASSI</div>
          <h2 className="mt-2 text-3xl md:text-4xl font-extrabold text-[var(--brand-navy)]">Belajar Soft Skills, Cara Modern</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[180px]">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="md:col-span-2 lg:row-span-2 lg:col-span-2 rounded-3xl gradient-navy p-8 text-white shadow-elegant relative overflow-hidden">
            <div className="absolute -top-12 -right-12 h-40 w-40 gradient-orange clip-diamond opacity-30" />
            <Star className="h-10 w-10 text-[var(--brand-orange)]" />
            <h3 className="mt-4 text-2xl font-bold">Mentor Berpengalaman</h3>
            <p className="mt-2 text-white/70 max-w-sm">Belajar langsung dari praktisi industri dengan pengalaman 10+ tahun di bidangnya.</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="rounded-3xl gradient-orange p-6 text-white shadow-elegant">
            <Award className="h-8 w-8" />
            <h3 className="mt-3 font-bold">Sertifikat Resmi</h3>
            <p className="mt-1 text-xs text-white/80">Diakui industri Indonesia.</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}
            className="rounded-3xl bg-card border border-border p-6 shadow-soft">
            <PlayCircle className="h-8 w-8 text-[var(--brand-tosca)]" />
            <h3 className="mt-3 font-bold text-[var(--brand-navy)]">Akses Selamanya</h3>
            <p className="mt-1 text-xs text-muted-foreground">Belajar di mana saja, kapan saja.</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            className="md:col-span-2 rounded-3xl gradient-lime p-6 text-white shadow-elegant relative overflow-hidden">
            <div className="absolute -bottom-8 -right-8 h-32 w-32 bg-white/20 rounded-full blur-2xl" />
            <Users className="h-8 w-8" />
            <h3 className="mt-3 font-bold text-lg">Komunitas 12.500+ Member</h3>
            <p className="mt-1 text-sm text-white/90 max-w-md">Bertemu sesama profesional, networking, dan tumbuh bersama.</p>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 md:px-8 pb-20">
        <motion.div initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl gradient-navy p-10 md:p-16 text-center shadow-elegant">
          <div className="absolute -top-20 -left-20 h-80 w-80 gradient-orange rotate-45 rounded-3xl opacity-20" />
          <div className="absolute -bottom-20 -right-20 h-80 w-80 gradient-tosca rotate-45 rounded-3xl opacity-20" />
          <div className="relative">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white">Siap Upgrade Soft Skills-mu?</h2>
            <p className="mt-4 text-white/70 max-w-xl mx-auto">Gabung sekarang dan akses ratusan kelas dari mentor terbaik Indonesia.</p>
            <Link to="/training" className="mt-8 inline-flex items-center gap-2 rounded-full gradient-orange px-8 py-4 text-base font-semibold text-white shadow-glow hover:scale-105 transition">
              Mulai Sekarang <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>
      </section>
    </>
  );
}
