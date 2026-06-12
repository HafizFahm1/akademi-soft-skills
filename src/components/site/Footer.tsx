import { Link } from "@tanstack/react-router";
import { Mail, Phone, Instagram, Facebook, Youtube, Linkedin, Sparkles, Send } from "lucide-react";
import { NAV, SITE } from "@/lib/site-data";
import logo from "@/assetgambar/LOGO.ASSI.png";

export function Footer() {
  return (
    <footer className="relative mt-20 overflow-hidden gradient-navy text-white">
      <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-[var(--brand-orange)]/20 blur-3xl" />
      <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-[var(--brand-tosca)]/30 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 md:px-8 py-16">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3">
              <img src={logo} alt="Logo Akademi" className="h-12 w-auto" />
              <div className="leading-tight">
                <div className="font-extrabold tracking-tight">AKADEMI</div>
                <div className="text-[10px] font-semibold text-[var(--brand-lime)] tracking-[0.18em]">SOFT SKILLS INDONESIA</div>
              </div>
            </div>
            <p className="mt-5 text-sm text-white/70 max-w-sm">
              Platform edukasi digital premium yang menghadirkan training, ebook, audio, dan video pengembangan soft skills untuk profesional Indonesia.
            </p>
            <div className="mt-6 flex gap-3">
              {[Instagram, Facebook, Youtube, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="h-10 w-10 grid place-items-center rounded-full bg-white/10 hover:bg-[var(--brand-orange)] transition">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-semibold mb-4">Menu</h4>
            <ul className="space-y-2.5 text-sm text-white/70">
              {NAV.map((n) => (
                <li key={n.to}>
                  <Link to={n.to} className="hover:text-[var(--brand-orange)] transition">{n.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="font-semibold mb-4">Kontak</h4>
            <ul className="space-y-3 text-sm text-white/70">
              <li className="flex items-start gap-3"><Mail className="h-4 w-4 mt-0.5 text-[var(--brand-lime)]" /> {SITE.email}</li>
              <li className="flex items-start gap-3"><Phone className="h-4 w-4 mt-0.5 text-[var(--brand-lime)]" /> +{SITE.whatsapp}</li>
              <li className="text-xs text-white/50 mt-4">Jakarta · Indonesia</li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="font-semibold mb-4">Newsletter</h4>
            <p className="text-sm text-white/70 mb-3">Tips soft skills mingguan langsung ke inbox-mu.</p>
            <form className="flex glass rounded-full p-1.5 pr-1.5">
              <input type="email" placeholder="Email kamu" className="flex-1 bg-transparent px-4 text-sm text-white placeholder:text-white/60 outline-none" />
              <button className="rounded-full gradient-orange px-4 py-2 text-sm font-semibold text-white flex items-center gap-1">
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row gap-3 items-center justify-between text-xs text-white/60">
          <div>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</div>
          <div className="flex gap-5">
            <a href="#" className="hover:text-white">Privasi</a>
            <a href="#" className="hover:text-white">Syarat & Ketentuan</a>
            <Link to="/admin" className="hover:text-white">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
