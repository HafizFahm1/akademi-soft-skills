import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Star, Clock, User } from "lucide-react";
import { type Produk, rupiah } from "@/lib/site-data";

const badgeColor = (b?: string) => {
  if (b === "Populer") return "bg-[var(--brand-lime)] text-white";
  if (b === "Best Seller") return "bg-[var(--brand-tosca)] text-white";
  if (b === "Terbaru") return "bg-[var(--brand-orange)] text-white";
  return "bg-[var(--brand-navy)] text-white";
};

export function ProductCard({ p, index = 0 }: { p: Produk; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      whileHover={{ y: -8 }}
      className="group rounded-3xl bg-card border border-border/60 shadow-soft overflow-hidden hover:shadow-elegant transition-all"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img src={p.thumb} alt={p.judul} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        {p.badge && (
          <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-bold tracking-wide ${badgeColor(p.badge)}`}>
            {p.badge}
          </span>
        )}
        <div className="absolute -bottom-1 right-0 h-16 w-16 gradient-tosca clip-diamond opacity-80" />
      </div>
      <div className="p-5">
        <h3 className="font-bold text-[var(--brand-navy)] line-clamp-2 leading-snug">{p.judul}</h3>
        <p className="mt-1.5 text-sm text-muted-foreground line-clamp-2">{p.desc}</p>

        <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
          {p.mentor && <span className="flex items-center gap-1"><User className="h-3 w-3" />{p.mentor}</span>}
          {p.durasi && <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{p.durasi}</span>}
          {p.rating && <span className="flex items-center gap-1 text-[var(--brand-orange)] font-semibold"><Star className="h-3 w-3 fill-current" />{p.rating}</span>}
        </div>

        <div className="mt-4 flex items-center justify-between gap-2">
          <div className="font-extrabold text-[var(--brand-orange)] text-lg">{rupiah(p.harga)}</div>
          <Link
            to="/checkout"
            search={{ produkId: p.id }}
            className="rounded-full gradient-navy px-4 py-2 text-xs font-semibold text-white hover:scale-105 transition shadow-soft"
          >
            Beli Sekarang
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
