export const SITE = {
  name: "Akademi Soft Skills Indonesia",
  short: "ASSI",
  whatsapp: "6285888416615",
  email: "halo@akademisoftskills.id",
  tagline: "Upgrade Soft Skills untuk Masa Depan Indonesia",
};

export const NAV = [
  { to: "/", label: "Beranda" },
  { to: "/artikel", label: "Artikel" },
  { to: "/book", label: "Book" },
  { to: "/training", label: "Training & Education" },
  { to: "/audio-video", label: "Audio & Video" },
  { to: "/portofolio", label: "Portofolio" },
  { to: "/tentang", label: "Tentang Kami" },
] as const;

export const STATS = [
  { icon: "users", value: "12.500+", label: "Siswa Aktif", tone: "tosca" },
  { icon: "book", value: "230+", label: "Training", tone: "orange" },
  { icon: "file", value: "850+", label: "Artikel", tone: "lime" },
  { icon: "award", value: "4.8/5", label: "Rating Platform", tone: "navy" },
] as const;

export const KATEGORI = [
  { to: "/artikel", title: "Artikel", desc: "Baca ribuan artikel edukatif terbaru.", icon: "file-text", tone: "tosca" },
  { to: "/book", title: "Book", desc: "Dapatkan eBook terbaik untuk pengembangan diri.", icon: "book-open", tone: "orange" },
  { to: "/training", title: "Training & Education", desc: "Ikuti kelas online bersama mentor profesional.", icon: "graduation-cap", tone: "navy" },
  { to: "/audio-video", title: "Audio & Video", desc: "Tonton atau dengarkan materi inspiratif.", icon: "play-circle", tone: "lime" },
  { to: "/portofolio", title: "Portofolio", desc: "Lihat karya dan project peserta.", icon: "briefcase", tone: "olive" },
] as const;

export type Produk = {
  id: string;
  judul: string;
  kategori: "training" | "book" | "audio" | "video";
  mentor?: string;
  harga: number;
  badge?: "Populer" | "Best Seller" | "Terbaru";
  thumb: string;
  desc: string;
  level?: string;
  durasi?: string;
  rating?: number;
};

export const TRAINING: Produk[] = [
  { id: "t1", judul: "Public Speaking Mastery", kategori: "training", mentor: "Reza Ardiansyah", harga: 349000, badge: "Populer", level: "Intermediate", durasi: "8 jam", rating: 4.9, desc: "Kuasai teknik berbicara di depan umum dengan percaya diri.", thumb: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=800&q=80" },
  { id: "t2", judul: "Leadership Excellence", kategori: "training", mentor: "Anita Wijaya", harga: 499000, badge: "Terbaru", level: "Advanced", durasi: "12 jam", rating: 4.8, desc: "Menjadi pemimpin yang inspiratif dan efektif untuk tim modern.", thumb: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80" },
  { id: "t3", judul: "Time Management for Professional", kategori: "training", mentor: "Bayu Pratama", harga: 299000, badge: "Best Seller", level: "Beginner", durasi: "6 jam", rating: 4.9, desc: "Atur waktu, tingkatkan produktivitas harian.", thumb: "https://images.unsplash.com/photo-1501139083538-0139583c060f?w=800&q=80" },
  { id: "t4", judul: "Emotional Intelligence for Success", kategori: "training", mentor: "Dr. Sari Lestari", harga: 399000, badge: "Populer", level: "Intermediate", durasi: "10 jam", rating: 4.7, desc: "Kendali emosi, raih kesuksesan profesional.", thumb: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=80" },
  { id: "t5", judul: "Negotiation Skill Pro", kategori: "training", mentor: "Hadi Saputra", harga: 459000, level: "Advanced", durasi: "9 jam", rating: 4.8, desc: "Strategi negosiasi yang menghasilkan win-win.", thumb: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&q=80" },
  { id: "t6", judul: "Critical Thinking & Problem Solving", kategori: "training", mentor: "Maya Anggraini", harga: 379000, badge: "Terbaru", level: "Intermediate", durasi: "8 jam", rating: 4.7, desc: "Berpikir kritis untuk solusi yang tepat.", thumb: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80" },
];

export const BOOKS: Produk[] = [
  { id: "b1", judul: "Mindset Pemenang", kategori: "book", harga: 89000, badge: "Best Seller", rating: 4.9, desc: "Membentuk mindset bertumbuh untuk profesional Indonesia.", thumb: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&q=80" },
  { id: "b2", judul: "Komunikasi Efektif", kategori: "book", harga: 79000, badge: "Populer", rating: 4.8, desc: "Panduan komunikasi profesional di tempat kerja.", thumb: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=600&q=80" },
  { id: "b3", judul: "Leadership 5.0", kategori: "book", harga: 99000, badge: "Terbaru", rating: 4.9, desc: "Memimpin di era kolaborasi digital.", thumb: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=600&q=80" },
  { id: "b4", judul: "Karier Cemerlang", kategori: "book", harga: 85000, rating: 4.7, desc: "Strategi membangun karier sejak dini.", thumb: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=600&q=80" },
];

export const AUDIO_VIDEO: Produk[] = [
  { id: "av1", judul: "Podcast: Pagi Produktif", kategori: "audio", harga: 0, rating: 4.8, desc: "10 menit motivasi untuk memulai hari.", thumb: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800&q=80" },
  { id: "av2", judul: "Video: Dasar Public Speaking", kategori: "video", harga: 149000, badge: "Populer", rating: 4.9, desc: "Series video belajar public speaking dari nol.", thumb: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80" },
  { id: "av3", judul: "Audio: Mindfulness Kerja", kategori: "audio", harga: 59000, badge: "Terbaru", rating: 4.7, desc: "Latihan napas & fokus untuk pekerja kantoran.", thumb: "https://images.unsplash.com/photo-1493836512294-502baa1986e2?w=800&q=80" },
  { id: "av4", judul: "Video: Leadership Talk", kategori: "video", harga: 199000, rating: 4.8, desc: "Sesi perbincangan dengan CEO inspiratif.", thumb: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800&q=80" },
];

export const ARTIKEL = [
  { id: "a1", judul: "5 Cara Meningkatkan Komunikasi di Tempat Kerja", slug: "komunikasi-kerja", kategori: "Komunikasi", thumb: "https://images.unsplash.com/photo-1552581234-26160f608093?w=800&q=80", excerpt: "Komunikasi yang baik adalah pondasi tim yang produktif.", author: "Reza A.", date: "12 Mei 2026" },
  { id: "a2", judul: "Mengapa Soft Skills Lebih Penting dari Hard Skills?", slug: "soft-skills-penting", kategori: "Karier", thumb: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80", excerpt: "Survei menunjukkan rekruter modern memilih kandidat dengan soft skills kuat.", author: "Anita W.", date: "9 Mei 2026" },
  { id: "a3", judul: "Tips Public Speaking untuk Pemula", slug: "public-speaking-pemula", kategori: "Public Speaking", thumb: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&q=80", excerpt: "Mulai dari napas, postur, hingga storytelling sederhana.", author: "Bayu P.", date: "5 Mei 2026" },
  { id: "a4", judul: "Membentuk Growth Mindset Setiap Hari", slug: "growth-mindset", kategori: "Mindset", thumb: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80", excerpt: "Kebiasaan kecil yang mengubah cara berpikir.", author: "Maya A.", date: "1 Mei 2026" },
  { id: "a5", judul: "Manajemen Waktu ala Profesional", slug: "manajemen-waktu", kategori: "Produktivitas", thumb: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=800&q=80", excerpt: "Teknik time-blocking dan prioritas Eisenhower.", author: "Hadi S.", date: "28 Apr 2026" },
  { id: "a6", judul: "Empati: Skill Wajib Pemimpin Modern", slug: "empati-pemimpin", kategori: "Leadership", thumb: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80", excerpt: "Kenapa empati = kompetensi bisnis.", author: "Sari L.", date: "20 Apr 2026" },
];

export const PORTOFOLIO = [
  { id: "p1", judul: "Workshop Leadership PT. Maju Jaya", kategori: "Corporate Training", thumb: "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800&q=80" },
  { id: "p2", judul: "Public Speaking Bootcamp Batch 12", kategori: "Bootcamp", thumb: "https://images.unsplash.com/photo-1559223607-a43c990c692c?w=800&q=80" },
  { id: "p3", judul: "Sertifikasi Mentor Nasional", kategori: "Sertifikasi", thumb: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&q=80" },
  { id: "p4", judul: "Soft Skills Day Universitas Indonesia", kategori: "Event Kampus", thumb: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&q=80" },
  { id: "p5", judul: "Training Komunikasi Bank Nasional", kategori: "Corporate Training", thumb: "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800&q=80" },
  { id: "p6", judul: "Inspiring Women in Leadership", kategori: "Konferensi", thumb: "https://images.unsplash.com/photo-1573164574511-73c773193279?w=800&q=80" },
];

export function rupiah(n: number) {
  if (n === 0) return "Gratis";
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(n);
}

export function getProduk(id: string): Produk | undefined {
  return [...TRAINING, ...BOOKS, ...AUDIO_VIDEO].find(p => p.id === id);
}

export function waLink(produkNama: string) {
  const text = `Halo Admin Akademi Soft Skills Indonesia, saya sudah melakukan pembayaran untuk produk: ${produkNama}.`;
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;
}
