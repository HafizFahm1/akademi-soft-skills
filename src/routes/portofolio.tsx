import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { PORTOFOLIO } from "@/lib/site-data";
import { PageHeader } from "@/components/site/PageHeader";

export const Route = createFileRoute("/portofolio")({
  head: () => ({ meta: [
    { title: "Portofolio — Akademi Soft Skills Indonesia" },
    { name: "description", content: "Dokumentasi training, sertifikasi, dan project peserta." },
  ]}),
  component: PortoPage,
});

function PortoPage() {
  return (
    <>
      <PageHeader eyebrow="Portofolio Kami" title="Karya & Dokumentasi Peserta" desc="Bukti nyata transformasi peserta Akademi Soft Skills Indonesia." />
      <section className="mx-auto max-w-7xl px-4 md:px-8 py-14">
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 [column-fill:_balance]">
          {PORTOFOLIO.map((p, i) => (
            <motion.div key={p.id}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: (i % 6) * 0.05 }}
              className="break-inside-avoid mb-5 group relative overflow-hidden rounded-3xl shadow-soft hover:shadow-elegant transition-all">
              <img src={p.thumb} alt={p.judul} loading="lazy" className={`w-full ${i % 3 === 0 ? "aspect-[3/4]" : i % 3 === 1 ? "aspect-square" : "aspect-[4/3]"} object-cover transition group-hover:scale-110 duration-700`} />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--brand-navy)] via-[var(--brand-navy)]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-5">
                <span className="inline-block w-fit text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[var(--brand-orange)] text-white">{p.kategori}</span>
                <h3 className="mt-2 font-bold text-white">{p.judul}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}
