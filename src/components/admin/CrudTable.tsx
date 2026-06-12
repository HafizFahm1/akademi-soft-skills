import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Pencil, Trash2, X, Loader2, Search, Upload, ImageIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export type FieldDef = {
  name: string;
  label: string;
  type?: "text" | "number" | "textarea" | "select" | "checkbox" | "url" | "image";
  options?: string[];
  required?: boolean;
  placeholder?: string;
};

function ImageField({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleFile = async (file: File) => {
    setUploading(true);
    try {
      const ext = file.name.split(".").pop() ?? "jpg";
      const path = `uploads/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
      const { error: upErr } = await supabase.storage.from("media").upload(path, file, {
        cacheControl: "31536000", upsert: false, contentType: file.type,
      });
      if (upErr) throw upErr;
      // Bucket is private; create a long-lived signed URL (≈100 years)
      const { data, error } = await supabase.storage.from("media").createSignedUrl(path, 3153600000);
      if (error) throw error;
      onChange(data.signedUrl);
    } catch (err: any) {
      alert("Gagal mengunggah: " + err.message);
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <input type="url" value={value ?? ""} placeholder="URL gambar atau unggah file"
          onChange={e => onChange(e.target.value)}
          className="flex-1 rounded-xl border bg-background px-3 py-2 text-sm outline-none focus:ring-2 ring-[var(--brand-tosca)]" />
        <button type="button" onClick={() => inputRef.current?.click()} disabled={uploading}
          className="inline-flex items-center gap-1.5 rounded-xl gradient-orange px-3 py-2 text-xs font-semibold text-white shadow-soft disabled:opacity-60 whitespace-nowrap">
          {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
          {uploading ? "Mengunggah..." : "Upload"}
        </button>
        <input ref={inputRef} type="file" accept="image/*" className="hidden"
          onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
      </div>
      {value ? (
        <img src={value} alt="preview" className="h-24 w-full object-cover rounded-lg border" />
      ) : (
        <div className="h-24 w-full rounded-lg border border-dashed grid place-items-center text-muted-foreground">
          <ImageIcon className="h-6 w-6" />
        </div>
      )}
    </div>
  );
}

export type CrudTableProps = {
  table: string;
  title: string;
  fields: FieldDef[];
  listColumns: { key: string; label: string; render?: (row: any) => React.ReactNode }[];
  searchField?: string;
  defaults?: Record<string, any>;
};

export function CrudTable({ table, title, fields, listColumns, searchField = "judul", defaults = {} }: CrudTableProps) {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [editing, setEditing] = useState<any | null>(null);
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase.from(table as any).select("*").order("created_at", { ascending: false });
    if (!error) setRows((data as any[]) ?? []);
    setLoading(false);
  };

  useEffect(() => { load(); }, [table]);

  const openNew = () => { setEditing({ ...defaults }); setOpen(true); };
  const openEdit = (row: any) => { setEditing({ ...row }); setOpen(true); };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const payload: any = { ...editing };
    fields.forEach(f => {
      if (f.type === "number") payload[f.name] = Number(payload[f.name] ?? 0);
      if (f.type === "checkbox") payload[f.name] = Boolean(payload[f.name]);
    });
    const { id, created_at, updated_at, ...rest } = payload;
    const op = id
      ? supabase.from(table as any).update(rest).eq("id", id)
      : supabase.from(table as any).insert(rest);
    const { error } = await op;
    setSaving(false);
    if (error) { alert("Gagal menyimpan: " + error.message); return; }
    setOpen(false); setEditing(null); load();
  };

  const del = async (row: any) => {
    if (!confirm(`Hapus "${row.judul ?? row.nama ?? row.id}"?`)) return;
    const { error } = await supabase.from(table as any).delete().eq("id", row.id);
    if (error) { alert("Gagal: " + error.message); return; }
    load();
  };

  const filtered = rows.filter(r =>
    !q || String(r[searchField] ?? "").toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div>
          <h2 className="text-xl font-extrabold text-[var(--brand-navy)]">{title}</h2>
          <p className="text-xs text-muted-foreground mt-0.5">{rows.length} item terdaftar</p>
        </div>
        <div className="flex gap-2">
          <div className="relative flex-1 sm:flex-none">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input value={q} onChange={e => setQ(e.target.value)} placeholder="Cari..."
              className="w-full sm:w-64 rounded-full border bg-background pl-9 pr-4 py-2 text-sm outline-none focus:ring-2 ring-[var(--brand-tosca)]" />
          </div>
          <button onClick={openNew} className="inline-flex items-center gap-1.5 rounded-full gradient-orange px-4 py-2 text-sm font-semibold text-white shadow-soft">
            <Plus className="h-4 w-4" /> Tambah
          </button>
        </div>
      </div>

      <div className="rounded-2xl border bg-card shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-secondary/60 text-left">
              <tr>
                {listColumns.map(c => <th key={c.key} className="px-4 py-3 font-semibold text-[var(--brand-navy)] whitespace-nowrap">{c.label}</th>)}
                <th className="px-4 py-3 w-24 text-right font-semibold text-[var(--brand-navy)]">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr><td colSpan={listColumns.length + 1} className="py-12 text-center text-muted-foreground">
                  <Loader2 className="inline h-5 w-5 animate-spin" />
                </td></tr>
              )}
              {!loading && filtered.length === 0 && (
                <tr><td colSpan={listColumns.length + 1} className="py-12 text-center text-muted-foreground">Belum ada data.</td></tr>
              )}
              {!loading && filtered.map(row => (
                <tr key={row.id} className="border-t hover:bg-secondary/30 transition">
                  {listColumns.map(c => (
                    <td key={c.key} className="px-4 py-3 align-middle">
                      {c.render ? c.render(row) : <span className="line-clamp-1">{String(row[c.key] ?? "—")}</span>}
                    </td>
                  ))}
                  <td className="px-4 py-3 text-right whitespace-nowrap">
                    <button onClick={() => openEdit(row)} className="inline-flex h-8 w-8 items-center justify-center rounded-full hover:bg-[var(--brand-tosca)]/10 text-[var(--brand-tosca)]" title="Edit"><Pencil className="h-4 w-4" /></button>
                    <button onClick={() => del(row)} className="inline-flex h-8 w-8 items-center justify-center rounded-full hover:bg-red-50 text-red-600" title="Hapus"><Trash2 className="h-4 w-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AnimatePresence>
        {open && editing && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm grid place-items-center p-4 overflow-y-auto">
            <motion.form initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95 }}
              onSubmit={save}
              className="w-full max-w-2xl bg-card rounded-3xl shadow-elegant p-6 md:p-8 my-8">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg font-extrabold text-[var(--brand-navy)]">{editing.id ? "Edit" : "Tambah"} {title}</h3>
                <button type="button" onClick={() => setOpen(false)} className="h-9 w-9 rounded-full hover:bg-secondary grid place-items-center"><X className="h-4 w-4" /></button>
              </div>
              <div className="grid sm:grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto pr-1">
                {fields.map(f => (
                  <div key={f.name} className={(f.type === "textarea" || f.type === "image") ? "sm:col-span-2" : ""}>
                    <label className="block text-xs font-semibold text-[var(--brand-navy)] mb-1.5">{f.label}{f.required && " *"}</label>
                    {f.type === "textarea" ? (
                      <textarea required={f.required} rows={4} value={editing[f.name] ?? ""}
                        placeholder={f.placeholder}
                        onChange={e => setEditing({ ...editing, [f.name]: e.target.value })}
                        className="w-full rounded-xl border bg-background px-3 py-2 text-sm outline-none focus:ring-2 ring-[var(--brand-tosca)]" />
                    ) : f.type === "select" ? (
                      <select required={f.required} value={editing[f.name] ?? ""}
                        onChange={e => setEditing({ ...editing, [f.name]: e.target.value })}
                        className="w-full rounded-xl border bg-background px-3 py-2 text-sm outline-none focus:ring-2 ring-[var(--brand-tosca)]">
                        <option value="">— pilih —</option>
                        {f.options?.map(o => <option key={o} value={o}>{o}</option>)}
                      </select>
                    ) : f.type === "checkbox" ? (
                      <label className="flex items-center gap-2 mt-2">
                        <input type="checkbox" checked={!!editing[f.name]}
                          onChange={e => setEditing({ ...editing, [f.name]: e.target.checked })}
                          className="h-4 w-4 rounded accent-[var(--brand-orange)]" />
                        <span className="text-sm">{f.placeholder ?? "Aktif"}</span>
                      </label>
                    ) : f.type === "image" ? (
                      <ImageField value={editing[f.name] ?? ""} onChange={v => setEditing({ ...editing, [f.name]: v })} />
                    ) : (
                      <input required={f.required} type={f.type ?? "text"} value={editing[f.name] ?? ""}
                        placeholder={f.placeholder}
                        onChange={e => setEditing({ ...editing, [f.name]: e.target.value })}
                        className="w-full rounded-xl border bg-background px-3 py-2 text-sm outline-none focus:ring-2 ring-[var(--brand-tosca)]" />
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-6 flex gap-3 justify-end">
                <button type="button" onClick={() => setOpen(false)} className="rounded-full border-2 px-5 py-2.5 text-sm font-semibold">Batal</button>
                <button type="submit" disabled={saving} className="rounded-full gradient-orange px-6 py-2.5 text-sm font-semibold text-white shadow-glow inline-flex items-center gap-2 disabled:opacity-60">
                  {saving && <Loader2 className="h-4 w-4 animate-spin" />} Simpan
                </button>
              </div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
