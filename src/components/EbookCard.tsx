import { Link } from "@tanstack/react-router";
import { Star } from "lucide-react";
import { type Ebook, formatRupiah } from "@/data/ebooks";

export function EbookCard({ ebook }: { ebook: Ebook }) {
  const discount = Math.round(((ebook.originalPrice - ebook.price) / ebook.originalPrice) * 100);
  return (
    <Link
      to="/ebook/$slug"
      params={{ slug: ebook.slug }}
      className="group flex flex-col overflow-hidden rounded-2xl bg-card-gradient shadow-glass ring-1 ring-border/50 transition-smooth hover:-translate-y-1 hover:shadow-elegant"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-muted">
        <img
          src={ebook.cover}
          alt={ebook.title}
          loading="lazy"
          className="h-full w-full object-cover transition-smooth group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-gold-gradient px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary shadow-gold">
          -{discount}%
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-gold">{ebook.category}</p>
        <h3 className="font-display text-lg font-bold leading-snug">{ebook.title}</h3>
        <p className="text-xs text-muted-foreground">oleh {ebook.author}</p>
        <div className="flex items-center gap-1 text-xs">
          <Star className="h-3.5 w-3.5 fill-gold text-gold" />
          <span className="font-semibold">{ebook.rating}</span>
          <span className="text-muted-foreground">({ebook.reviews.toLocaleString("id-ID")})</span>
        </div>
        <div className="mt-auto flex items-end justify-between pt-3">
          <div>
            <p className="text-xs text-muted-foreground line-through">{formatRupiah(ebook.originalPrice)}</p>
            <p className="font-display text-xl font-bold text-primary dark:text-gold">{formatRupiah(ebook.price)}</p>
          </div>
          <span className="rounded-full border border-gold/40 px-3 py-1.5 text-xs font-semibold text-primary transition-smooth group-hover:bg-gold-gradient dark:text-gold dark:group-hover:text-primary">
            Detail →
          </span>
        </div>
      </div>
    </Link>
  );
}
