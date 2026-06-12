import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Target, Heart, Zap, Users, Award, BookOpen } from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import { STATS } from "@/lib/site-data";

export const Route = createFileRoute("/tentang")({
  head: () => ({ meta: [
    { title: "Tentang Kami — Akademi Soft Skills Indonesia" },
    { name: "description", content: "Mengenal misi, visi, dan tim Akademi Soft Skills Indonesia." },
  ]}),
  component: AboutPage,
});

const VALUES = [
  { icon: Target, title: "Fokus Hasil", desc: "Setiap kelas dirancang untuk transformasi nyata." },
  { icon: Heart, title: "Empati", desc: "Mentor mendampingi tiap peserta dengan tulus." },
  { icon: Zap, title: "Praktis & Modern", desc: "Materi up-to-date dan langsung bisa diterapkan." },
];

function AboutPage() {
  return (
    <>
      <PageHeader eyebrow="Tentang Kami" title="Membangun Generasi Profesional Indonesia" desc="Berdiri sejak 2020, kami percaya soft skills adalah kunci masa depan bangsa." />

      <section className="mx-auto max-w-7xl px-4 md:px-8 py-16 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <div className="text-xs font-semibold text-[var(--brand-orange)] uppercase tracking-wider">Visi & Misi</div>
          <h2 className="mt-2 text-3xl md:text-4xl font-extrabold text-[var(--brand-navy)]">Mempersiapkan Profesional Tangguh untuk Era Digital</h2>
          <p className="mt-5 text-muted-foreground leading-relaxed">Kami memadukan teknologi modern dengan pendekatan humanis untuk membantu individu, tim, dan perusahaan mengembangkan komunikasi, leadership, mindset, dan karier secara berkelanjutan.</p>
          <div className="mt-8 grid grid-cols-2 gap-4">
            {STATS.slice(0, 4).map(s => (
              <div key={s.label} className="rounded-2xl bg-secondary/60 p-4">
                <div className="text-2xl font-extrabold text-[var(--brand-navy)]">{s.value}</div>
                <div className="text-xs text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative h-[420px]">
          <div className="absolute inset-0 grid grid-cols-2 gap-3">
            <div className="space-y-3">
              <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80" alt="" className="rounded-3xl h-[55%] w-full object-cover shadow-elegant" />
              <div className="rounded-3xl gradient-orange h-[42%] p-5 flex items-end shadow-elegant">
                <div>
                  <Award className="h-8 w-8 text-white mb-2" />
                  <p className="text-white font-bold">Trusted by 200+ companies</p>
                </div>
              </div>
            </div>
            <div className="mt-8 space-y-3">
              <div className="rounded-3xl gradient-tosca h-[42%] p-5 flex items-end shadow-elegant">
                <div>
                  <Users className="h-8 w-8 text-white mb-2" />
                  <p className="text-white font-bold">12.500+ alumni aktif</p>
                </div>
              </div>
              <img src="https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=600&q=80" alt="" className="rounded-3xl h-[55%] w-full object-cover shadow-elegant" />
            </div>
          </div>
        </motion.div>
      </section>

      <section className="bg-secondary/40 py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="text-center mb-10">
            <div className="text-xs font-semibold text-[var(--brand-tosca)] uppercase tracking-wider">Nilai Kami</div>
            <h2 className="mt-2 text-3xl md:text-4xl font-extrabold text-[var(--brand-navy)]">Yang Membuat Kami Berbeda</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {VALUES.map((v, i) => (
              <motion.div key={v.title}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="rounded-3xl bg-card border p-7 shadow-soft hover:shadow-elegant transition">
                <div className="h-12 w-12 rounded-2xl gradient-navy grid place-items-center shadow-soft">
                  <v.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="mt-4 font-bold text-lg text-[var(--brand-navy)]">{v.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
