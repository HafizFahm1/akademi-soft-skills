import { Link } from "@tanstack/react-router";
import { BookOpen, Menu, X } from "lucide-react";
import { useState } from "react";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  const links = [
    { to: "/", label: "Beranda" },
    { to: "/katalog", label: "Katalog Ebook" },
    { to: "/tentang", label: "Tentang" },
  ] as const;

  return (
    <header className="sticky top-0 z-50 glass">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gold-gradient shadow-gold">
            <BookOpen className="h-5 w-5 text-primary" />
          </div>
          <div className="leading-tight">
            <p className="font-display text-base font-bold">Akademi Soft Skills</p>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Indonesia</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-sm font-medium text-foreground/80 transition-smooth hover:text-gold"
              activeProps={{ className: "text-gold" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <Link
          to="/katalog"
          className="hidden rounded-full bg-gold-gradient px-5 py-2 text-sm font-semibold text-primary shadow-gold transition-smooth hover:scale-105 md:inline-flex"
        >
          Beli Ebook
        </Link>

        <button
          className="md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border/50 bg-background/95 backdrop-blur md:hidden">
          <nav className="container mx-auto flex flex-col gap-1 px-4 py-4">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent"
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/katalog"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-gold-gradient px-4 py-2 text-center text-sm font-semibold text-primary"
            >
              Beli Ebook
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
