import { Link } from "@tanstack/react-router";
import { BookOpen, Instagram, Mail, MessageCircle } from "lucide-react";
import { ADMIN_WA, waLink } from "@/lib/whatsapp";

export function SiteFooter() {
  return (
    <footer className="bg-hero mt-24 text-primary-foreground">
      <div className="container mx-auto grid gap-12 px-4 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gold-gradient">
              <BookOpen className="h-5 w-5 text-primary" />
            </div>
            <p className="font-display text-lg font-bold">Akademi Soft Skills Indonesia</p>
          </div>
          <p className="mt-4 max-w-md text-sm text-primary-foreground/70">
            Platform ebook premium untuk membentuk profesional Indonesia yang berkarakter, percaya diri, dan unggul di era modern.
          </p>
        </div>

        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-gold">Navigasi</p>
          <ul className="space-y-2 text-sm text-primary-foreground/80">
            <li><Link to="/" className="hover:text-gold">Beranda</Link></li>
            <li><Link to="/katalog" className="hover:text-gold">Katalog Ebook</Link></li>
            <li><Link to="/tentang" className="hover:text-gold">Tentang Kami</Link></li>
          </ul>
        </div>

        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-gold">Kontak</p>
          <ul className="space-y-2 text-sm text-primary-foreground/80">
            <li className="flex items-center gap-2"><MessageCircle className="h-4 w-4" /><a href={waLink("Halo admin, saya ingin bertanya")} target="_blank" rel="noreferrer" className="hover:text-gold">+{ADMIN_WA}</a></li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4" /><span>halo@akademisoftskills.id</span></li>
            <li className="flex items-center gap-2"><Instagram className="h-4 w-4" /><span>@akademisoftskills</span></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-6 text-center text-xs text-primary-foreground/60">
          © {new Date().getFullYear()} Akademi Soft Skills Indonesia. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
