import { createFileRoute } from "@tanstack/react-router";
import { Award, Heart, Target } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/tentang")({
  head: () => ({
    meta: [
      { title: "Tentang Kami — Akademi Soft Skills Indonesia" },
      { name: "description", content: "Misi kami: membentuk profesional Indonesia yang berkarakter, kompeten, dan unggul melalui ebook premium." },
    ],
  }),
  component: TentangPage,
});

function TentangPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <section className="bg-hero py-20 text-primary-foreground">
        <div className="container mx-auto max-w-3xl px-4 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-gold">Tentang Kami</p>
          <h1 className="font-display text-4xl font-bold md:text-5xl">Membentuk Profesional Indonesia yang Unggul</h1>
          <p className="mt-6 text-primary-foreground/80">
            Akademi Soft Skills Indonesia hadir untuk menjawab kebutuhan pengembangan diri profesional Indonesia melalui ebook premium berkualitas tinggi yang disusun oleh praktisi & akademisi terbaik.
          </p>
        </div>
      </section>

      <section className="container mx-auto grid gap-6 px-4 py-20 md:grid-cols-3">
        {[
          { icon: Target, title: "Misi", desc: "Menyediakan akses pengembangan soft skill berkualitas dengan harga terjangkau bagi seluruh profesional Indonesia." },
          { icon: Heart, title: "Nilai", desc: "Otentik, kurasi, berbasis riset, dan terus diperbarui mengikuti dinamika dunia kerja modern." },
          { icon: Award, title: "Komitmen", desc: "Memberi materi praktis yang langsung bisa diterapkan untuk hasil nyata, bukan teori semata." },
        ].map((v) => (
          <div key={v.title} className="rounded-2xl bg-card p-7 shadow-glass ring-1 ring-border/50">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gold-gradient shadow-gold">
              <v.icon className="h-6 w-6 text-primary" />
            </div>
            <h2 className="font-display text-xl font-bold">{v.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{v.desc}</p>
          </div>
        ))}
      </section>

      <SiteFooter />
    </div>
  );
}
