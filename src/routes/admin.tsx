import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard, FileText, BookOpen, GraduationCap, PlayCircle,
  Receipt, LogOut, Loader2, Users, ShoppingBag,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { CrudTable, type FieldDef } from "@/components/admin/CrudTable";
import { rupiah } from "@/lib/site-data";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin Panel — Akademi Soft Skills Indonesia" }] }),
  component: AdminPage,
});

const TABS = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "articles", label: "Artikel", icon: FileText },
  { id: "books", label: "Book", icon: BookOpen },
  { id: "trainings", label: "Training", icon: GraduationCap },
  { id: "audio_videos", label: "Audio & Video", icon: PlayCircle },
  { id: "transactions", label: "Transaksi", icon: Receipt },
] as const;
type TabId = typeof TABS[number]["id"];

function AdminPage() {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [tab, setTab] = useState<TabId>("dashboard");

  useEffect(() => {
    let mounted = true;
    const check = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!mounted) return;
      if (!user) { navigate({ to: "/auth", replace: true }); return; }
      setEmail(user.email ?? "");
      const { data: roles } = await supabase.from("user_roles").select("role").eq("user_id", user.id);
      const admin = (roles ?? []).some(r => r.role === "admin");
      setIsAdmin(admin);
      setReady(true);
    };
    check();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      if (!session) navigate({ to: "/auth", replace: true });
    });
    return () => { mounted = false; subscription.unsubscribe(); };
  }, [navigate]);

  const logout = async () => { await supabase.auth.signOut(); navigate({ to: "/auth" }); };

  if (!ready) return <div className="grid place-items-center min-h-[60vh]"><Loader2 className="h-6 w-6 animate-spin text-[var(--brand-orange)]" /></div>;

  if (!isAdmin) return (
    <div className="grid place-items-center min-h-[60vh] px-4 text-center">
      <div className="max-w-md">
        <h1 className="text-2xl font-extrabold text-[var(--brand-navy)]">Akses Ditolak</h1>
        <p className="mt-2 text-sm text-muted-foreground">Akun <b>{email}</b> bukan admin. Hubungi pengelola untuk diberi akses.</p>
        <button onClick={logout} className="mt-5 inline-flex rounded-full bg-[var(--brand-navy)] text-white px-5 py-2 text-sm font-semibold">Keluar</button>
      </div>
    </div>
  );

  return (
    <div className="mx-auto max-w-7xl px-4 md:px-8 py-8">
      <div className="grid lg:grid-cols-[260px_1fr] gap-6">
        {/* Sidebar */}
        <aside className="lg:sticky lg:top-24 self-start rounded-3xl bg-card border shadow-soft p-4">
          <div className="px-2 pb-3 mb-2 border-b">
            <div className="text-[10px] tracking-widest text-muted-foreground font-bold">ADMIN PANEL</div>
            <div className="text-sm font-bold text-[var(--brand-navy)] truncate">{email}</div>
          </div>
          <nav className="flex lg:flex-col gap-1 overflow-x-auto">
            {TABS.map(t => (
              <button key={t.id} onClick={() => setTab(t.id)}
                className={`flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-semibold whitespace-nowrap transition ${
                  tab === t.id ? "gradient-orange text-white shadow-soft" : "text-muted-foreground hover:bg-secondary hover:text-[var(--brand-navy)]"
                }`}>
                <t.icon className="h-4 w-4" /> {t.label}
              </button>
            ))}
            <button onClick={logout} className="mt-3 flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50 whitespace-nowrap">
              <LogOut className="h-4 w-4" /> Keluar
            </button>
          </nav>
        </aside>

        {/* Content */}
        <motion.section key={tab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="min-w-0">
          {tab === "dashboard" && <Dashboard />}
          {tab === "articles" && <CrudTable
            table="articles" title="Artikel"
            fields={[
              { name: "judul", label: "Judul", required: true },
              { name: "slug", label: "Slug (url)", required: true, placeholder: "contoh: tips-public-speaking" },
              { name: "kategori", label: "Kategori", placeholder: "Komunikasi, Leadership..." },
              { name: "author", label: "Penulis" },
              { name: "thumb", label: "Thumbnail", type: "image" },
              { name: "excerpt", label: "Ringkasan", type: "textarea" },
              { name: "content", label: "Konten", type: "textarea" },
              { name: "published", label: "Status", type: "checkbox", placeholder: "Publikasikan" },
            ]}
            listColumns={[
              { key: "judul", label: "Judul" },
              { key: "kategori", label: "Kategori" },
              { key: "author", label: "Penulis" },
              { key: "published", label: "Status", render: r => <Badge ok={r.published} on="Tayang" off="Draft" /> },
            ]}
            defaults={{ published: true, kategori: "Umum" }}
          />}
          {tab === "books" && <CrudTable
            table="books" title="Book"
            fields={[
              { name: "judul", label: "Judul", required: true },
              { name: "harga", label: "Harga (Rp)", type: "number", required: true },
              { name: "badge", label: "Badge", type: "select", options: ["", "Populer", "Best Seller", "Terbaru"] },
              { name: "rating", label: "Rating", type: "number", placeholder: "0.0 - 5.0" },
              { name: "thumb", label: "Thumbnail", type: "image" },
              { name: "deskripsi", label: "Deskripsi", type: "textarea" },
              { name: "published", label: "Status", type: "checkbox", placeholder: "Publikasikan" },
            ]}
            listColumns={[
              { key: "judul", label: "Judul" },
              { key: "harga", label: "Harga", render: r => rupiah(r.harga) },
              { key: "badge", label: "Badge" },
              { key: "published", label: "Status", render: r => <Badge ok={r.published} on="Tayang" off="Draft" /> },
            ]}
            defaults={{ published: true, harga: 0, rating: 0 }}
          />}
          {tab === "trainings" && <CrudTable
            table="trainings" title="Training"
            fields={[
              { name: "judul", label: "Judul", required: true },
              { name: "mentor", label: "Mentor" },
              { name: "harga", label: "Harga (Rp)", type: "number", required: true },
              { name: "level", label: "Level", type: "select", options: ["Beginner", "Intermediate", "Advanced"] },
              { name: "durasi", label: "Durasi", placeholder: "8 jam" },
              { name: "badge", label: "Badge", type: "select", options: ["", "Populer", "Best Seller", "Terbaru"] },
              { name: "rating", label: "Rating", type: "number" },
              { name: "thumb", label: "Thumbnail", type: "image" },
              { name: "deskripsi", label: "Deskripsi", type: "textarea" },
              { name: "published", label: "Status", type: "checkbox", placeholder: "Publikasikan" },
            ]}
            listColumns={[
              { key: "judul", label: "Judul" },
              { key: "mentor", label: "Mentor" },
              { key: "harga", label: "Harga", render: r => rupiah(r.harga) },
              { key: "level", label: "Level" },
              { key: "published", label: "Status", render: r => <Badge ok={r.published} on="Tayang" off="Draft" /> },
            ]}
            defaults={{ published: true, harga: 0, rating: 0, level: "Beginner" }}
          />}
          {tab === "audio_videos" && <CrudTable
            table="audio_videos" title="Audio & Video"
            fields={[
              { name: "judul", label: "Judul", required: true },
              { name: "tipe", label: "Tipe", type: "select", options: ["audio", "video"], required: true },
              { name: "harga", label: "Harga (Rp)", type: "number" },
              { name: "badge", label: "Badge", type: "select", options: ["", "Populer", "Best Seller", "Terbaru"] },
              { name: "rating", label: "Rating", type: "number" },
              { name: "thumb", label: "Thumbnail", type: "image" },
              { name: "media_url", label: "URL Media (audio/video)", type: "url" },
              { name: "deskripsi", label: "Deskripsi", type: "textarea" },
              { name: "published", label: "Status", type: "checkbox", placeholder: "Publikasikan" },
            ]}
            listColumns={[
              { key: "judul", label: "Judul" },
              { key: "tipe", label: "Tipe" },
              { key: "harga", label: "Harga", render: r => rupiah(r.harga) },
              { key: "published", label: "Status", render: r => <Badge ok={r.published} on="Tayang" off="Draft" /> },
            ]}
            defaults={{ published: true, tipe: "audio", harga: 0, rating: 0 }}
          />}
          {tab === "transactions" && <TransactionsView />}
        </motion.section>
      </div>
    </div>
  );
}

function Badge({ ok, on, off }: { ok: boolean; on: string; off: string }) {
  return <span className={`inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-bold ${ok ? "bg-emerald-100 text-emerald-700" : "bg-slate-200 text-slate-600"}`}>{ok ? on : off}</span>;
}

function Dashboard() {
  const [stats, setStats] = useState({ articles: 0, books: 0, trainings: 0, av: 0, tx: 0, revenue: 0 });
  useEffect(() => {
    (async () => {
      const tables = ["articles", "books", "trainings", "audio_videos"] as const;
      const counts = await Promise.all(tables.map(t => supabase.from(t).select("id", { count: "exact", head: true })));
      const { data: txs } = await supabase.from("transactions").select("total, status");
      const revenue = (txs ?? []).filter(t => t.status === "terverifikasi").reduce((s, t) => s + (t.total ?? 0), 0);
      setStats({
        articles: counts[0].count ?? 0,
        books: counts[1].count ?? 0,
        trainings: counts[2].count ?? 0,
        av: counts[3].count ?? 0,
        tx: txs?.length ?? 0,
        revenue,
      });
    })();
  }, []);
  const cards = [
    { label: "Artikel", val: stats.articles, icon: FileText, tone: "from-sky-400 to-cyan-500" },
    { label: "Book", val: stats.books, icon: BookOpen, tone: "from-orange-400 to-pink-500" },
    { label: "Training", val: stats.trainings, icon: GraduationCap, tone: "from-indigo-500 to-purple-600" },
    { label: "Audio/Video", val: stats.av, icon: PlayCircle, tone: "from-emerald-400 to-teal-500" },
    { label: "Transaksi", val: stats.tx, icon: ShoppingBag, tone: "from-amber-400 to-orange-500" },
    { label: "Pendapatan", val: rupiah(stats.revenue), icon: Users, tone: "from-rose-400 to-red-500" },
  ];
  return (
    <div>
      <h2 className="text-xl font-extrabold text-[var(--brand-navy)] mb-5">Dashboard</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((c, i) => (
          <motion.div key={c.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="relative overflow-hidden rounded-2xl bg-card border p-5 shadow-soft">
            <div className={`absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br ${c.tone} opacity-15`} />
            <c.icon className="h-6 w-6 text-[var(--brand-navy)]" />
            <div className="mt-4 text-2xl font-extrabold text-[var(--brand-navy)]">{c.val}</div>
            <div className="text-xs text-muted-foreground font-semibold mt-1">{c.label}</div>
          </motion.div>
        ))}
      </div>
      <div className="mt-8 rounded-3xl gradient-navy text-white p-6 shadow-elegant">
        <div className="text-sm text-white/70 font-semibold">Tips</div>
        <div className="mt-1 text-lg font-bold">Kelola konten dari menu di samping</div>
        <p className="mt-2 text-sm text-white/80">Tambah artikel, training, atau book baru. Pantau transaksi masuk dan ubah statusnya menjadi terverifikasi setelah pembayaran dikonfirmasi.</p>
        <Link to="/" className="inline-flex mt-4 rounded-full bg-white text-[var(--brand-navy)] px-5 py-2 text-sm font-bold">Lihat Website</Link>
      </div>
    </div>
  );
}

function TransactionsView() {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"semua" | "menunggu" | "terverifikasi" | "dibatalkan">("semua");

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from("transactions").select("*").order("created_at", { ascending: false });
    setRows(data ?? []);
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const updateStatus = async (id: string, status: string) => {
    await supabase.from("transactions").update({ status }).eq("id", id);
    load();
  };
  const del = async (id: string) => {
    if (!confirm("Hapus transaksi ini?")) return;
    await supabase.from("transactions").delete().eq("id", id);
    load();
  };

  const exportCsv = () => {
    const headers = ["Tanggal", "Produk", "Nama", "Email", "WA", "Metode", "Total", "Status"];
    const lines = [headers.join(",")];
    rows.forEach(r => {
      lines.push([
        new Date(r.created_at).toLocaleString("id-ID"),
        `"${r.produk_nama}"`, `"${r.nama}"`, r.email, r.whatsapp, r.metode, r.total, r.status,
      ].join(","));
    });
    const blob = new Blob([lines.join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = `transaksi-${Date.now()}.csv`; a.click();
    URL.revokeObjectURL(url);
  };

  const filtered = rows.filter(r => filter === "semua" || r.status === filter);

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div>
          <h2 className="text-xl font-extrabold text-[var(--brand-navy)]">Transaksi</h2>
          <p className="text-xs text-muted-foreground mt-0.5">{rows.length} transaksi total</p>
        </div>
        <div className="flex gap-2">
          {(["semua", "menunggu", "terverifikasi", "dibatalkan"] as const).map(s => (
            <button key={s} onClick={() => setFilter(s)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold capitalize ${filter === s ? "gradient-orange text-white" : "bg-secondary text-muted-foreground hover:text-[var(--brand-navy)]"}`}>{s}</button>
          ))}
          <button onClick={exportCsv} className="px-4 py-1.5 rounded-full text-xs font-semibold bg-[var(--brand-navy)] text-white">Export CSV</button>
        </div>
      </div>

      <div className="rounded-2xl border bg-card shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-secondary/60 text-left">
              <tr>
                {["Tanggal", "Produk", "Pembeli", "Metode", "Total", "Status", "Aksi"].map(h =>
                  <th key={h} className="px-4 py-3 font-semibold text-[var(--brand-navy)] whitespace-nowrap">{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {loading && <tr><td colSpan={7} className="py-12 text-center"><Loader2 className="inline h-5 w-5 animate-spin" /></td></tr>}
              {!loading && filtered.length === 0 && <tr><td colSpan={7} className="py-12 text-center text-muted-foreground">Tidak ada transaksi.</td></tr>}
              {!loading && filtered.map(r => (
                <tr key={r.id} className="border-t hover:bg-secondary/30">
                  <td className="px-4 py-3 text-xs text-muted-foreground whitespace-nowrap">{new Date(r.created_at).toLocaleString("id-ID")}</td>
                  <td className="px-4 py-3"><div className="font-semibold text-[var(--brand-navy)] line-clamp-1">{r.produk_nama}</div><div className="text-xs text-muted-foreground capitalize">{r.produk_kategori}</div></td>
                  <td className="px-4 py-3"><div className="font-medium">{r.nama}</div><div className="text-xs text-muted-foreground">{r.email}</div><div className="text-xs text-muted-foreground">{r.whatsapp}</div></td>
                  <td className="px-4 py-3 capitalize text-xs">{r.metode}</td>
                  <td className="px-4 py-3 font-bold text-[var(--brand-navy)]">{rupiah(r.total)}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-bold capitalize ${
                      r.status === "terverifikasi" ? "bg-emerald-100 text-emerald-700" :
                      r.status === "dibatalkan" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"
                    }`}>{r.status}</span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {r.status === "menunggu" && (
                      <>
                        <button onClick={() => updateStatus(r.id, "terverifikasi")} className="text-xs font-semibold text-emerald-700 hover:underline mr-2">Verifikasi</button>
                        <button onClick={() => updateStatus(r.id, "dibatalkan")} className="text-xs font-semibold text-red-600 hover:underline mr-2">Batal</button>
                      </>
                    )}
                    <button onClick={() => del(r.id)} className="text-xs font-semibold text-muted-foreground hover:text-red-600">Hapus</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
