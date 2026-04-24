export type Ebook = {
  id: string;
  slug: string;
  title: string;
  category: string;
  author: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  pages: number;
  cover: string;
  description: string;
  highlights: string[];
  contents: string[];
  benefits: string[];
};

const cover = (seed: string) =>
  `https://images.unsplash.com/photo-${seed}?auto=format&fit=crop&w=600&q=80`;

export const categories = [
  "Semua",
  "Public Speaking",
  "Leadership",
  "Komunikasi",
  "Personal Branding",
  "Mindset Sukses",
  "Digital Marketing",
  "Negosiasi",
  "Soft Skill Kerja",
  "Produktivitas",
  "Pengembangan Diri",
];

export const ebooks: Ebook[] = [
  {
    id: "1", slug: "master-public-speaking",
    title: "Master Public Speaking",
    category: "Public Speaking",
    author: "Dr. Reza Adinata",
    price: 79000, originalPrice: 199000, rating: 4.9, reviews: 1240, pages: 184,
    cover: cover("1544716278-ca5e3f4abd8c"),
    description: "Panduan komprehensif untuk menjadi pembicara publik yang percaya diri, persuasif, dan berpengaruh. Cocok untuk profesional, pengusaha, dan content creator.",
    highlights: ["Teknik mengatasi nervous", "Struktur pidato persuasif", "Body language pemimpin", "Storytelling yang memukau"],
    contents: ["Mindset pembicara hebat", "Riset & struktur materi", "Vocal & artikulasi", "Presentasi visual", "Q&A & handling audience", "Latihan 30 hari"],
    benefits: ["Bonus template slide premium", "Akses grup mentoring", "Update gratis seumur hidup"],
  },
  {
    id: "2", slug: "leadership-blueprint",
    title: "Leadership Blueprint",
    category: "Leadership",
    author: "Andika Wirawan, MBA",
    price: 89000, originalPrice: 229000, rating: 4.8, reviews: 980, pages: 210,
    cover: cover("1531297484-cdf36d8d5fd1"),
    description: "Cetak biru menjadi pemimpin modern yang dipercaya tim, mampu mengambil keputusan strategis, dan menciptakan dampak nyata.",
    highlights: ["5 pilar leadership", "Decision making framework", "Coaching & delegasi", "Membangun budaya tim"],
    contents: ["Self leadership", "Visi & strategi", "Komunikasi pemimpin", "Manajemen konflik", "Performance management", "Legacy & succession"],
    benefits: ["Worksheet 1-on-1 meeting", "Studi kasus eksekutif", "Sertifikat digital"],
  },
  {
    id: "3", slug: "komunikasi-efektif",
    title: "Komunikasi Efektif",
    category: "Komunikasi",
    author: "Sinta Pramudya",
    price: 69000, originalPrice: 169000, rating: 4.9, reviews: 1560, pages: 156,
    cover: cover("1456513080510-7bf3a84b82f8"),
    description: "Kuasai seni komunikasi yang membuat ide Anda didengar, dihargai, dan dieksekusi — di kantor maupun kehidupan personal.",
    highlights: ["Active listening", "Assertive communication", "Difficult conversation", "Komunikasi lintas generasi"],
    contents: ["Dasar komunikasi", "Verbal & non-verbal", "Empati & rapport", "Feedback konstruktif", "Negosiasi ringan", "Latihan harian"],
    benefits: ["Audio summary", "Cheat sheet PDF", "Akses Q&A bulanan"],
  },
  {
    id: "4", slug: "personal-branding-pro",
    title: "Personal Branding Pro",
    category: "Personal Branding",
    author: "Vania Lesmana",
    price: 99000, originalPrice: 249000, rating: 4.9, reviews: 870, pages: 198,
    cover: cover("1522202176988-66273c2fd55f"),
    description: "Bangun personal brand yang otentik & profitable. Dari positioning, konten, hingga monetisasi.",
    highlights: ["Positioning framework", "Content pillar", "LinkedIn & Instagram strategy", "Monetisasi brand"],
    contents: ["Discover your why", "Audience persona", "Visual identity", "Content engine", "Networking", "Funnel monetisasi"],
    benefits: ["Template bio & feed", "Kurasi tools gratis", "Bonus mini course"],
  },
  {
    id: "5", slug: "mindset-sukses",
    title: "Mindset Sukses",
    category: "Mindset Sukses",
    author: "Bayu Hartono",
    price: 59000, originalPrice: 149000, rating: 4.8, reviews: 2100, pages: 142,
    cover: cover("1532012197267-da84d127e765"),
    description: "Reset cara berpikir Anda untuk meraih hasil luar biasa. Berbasis riset psikologi positif dan neurosains.",
    highlights: ["Growth mindset", "Reframing kegagalan", "Habit stacking", "Resilience training"],
    contents: ["Identitas diri", "Belief system", "Goal setting SMART", "Disiplin & konsistensi", "Energi & fokus", "Review mingguan"],
    benefits: ["Jurnal 30 hari", "Audio meditasi", "Komunitas accountability"],
  },
  {
    id: "6", slug: "digital-marketing-mastery",
    title: "Digital Marketing Mastery",
    category: "Digital Marketing",
    author: "Rio Mahendra",
    price: 119000, originalPrice: 299000, rating: 4.9, reviews: 1340, pages: 240,
    cover: cover("1460925895917-afdab827c52f"),
    description: "Strategi digital marketing end-to-end: SEO, paid ads, content, funnel, dan analytics — untuk UMKM hingga brand besar.",
    highlights: ["Funnel AARRR", "Meta & Google Ads", "SEO modern 2025", "Email automation"],
    contents: ["Riset market", "Brand & messaging", "Content marketing", "Performance ads", "CRO & analytics", "Retention"],
    benefits: ["Template campaign brief", "Dashboard tracking", "Studi kasus brand lokal"],
  },
  {
    id: "7", slug: "seni-negosiasi",
    title: "Seni Negosiasi",
    category: "Negosiasi",
    author: "Prof. Hendra Kusuma",
    price: 84000, originalPrice: 199000, rating: 4.8, reviews: 720, pages: 176,
    cover: cover("1450101499163-c8848c66ca85"),
    description: "Teknik negosiasi win-win ala FBI dan Harvard untuk gaji, bisnis, dan kehidupan sehari-hari.",
    highlights: ["BATNA & ZOPA", "Tactical empathy", "Anchoring & framing", "Closing yang elegan"],
    contents: ["Persiapan strategis", "Membaca lawan bicara", "Teknik bertanya", "Mengatasi deadlock", "Kontrak & follow up", "Latihan simulasi"],
    benefits: ["Script negosiasi gaji", "Roleplay video", "Konsultasi 1x"],
  },
  {
    id: "8", slug: "soft-skill-dunia-kerja",
    title: "Soft Skill Dunia Kerja",
    category: "Soft Skill Kerja",
    author: "Mira Kartika",
    price: 74000, originalPrice: 179000, rating: 4.9, reviews: 1620, pages: 168,
    cover: cover("1521737711867-e3b97375f902"),
    description: "Skill yang tidak diajarkan di kampus tapi paling dicari recruiter & atasan. Wajib untuk fresh graduate & profesional muda.",
    highlights: ["Etika profesional", "Kolaborasi tim", "Time management", "Adaptability"],
    contents: ["First impression", "Email & meeting etiquette", "Manajemen ekspektasi", "Konflik di tempat kerja", "Karir planning", "Networking internal"],
    benefits: ["Template CV ATS", "Simulasi interview", "Sesi mentoring grup"],
  },
  {
    id: "9", slug: "produktivitas-deep-work",
    title: "Produktivitas Deep Work",
    category: "Produktivitas",
    author: "Aldi Surya",
    price: 64000, originalPrice: 159000, rating: 4.8, reviews: 1180, pages: 148,
    cover: cover("1499951360447-b19be8fe80f5"),
    description: "Sistem kerja fokus tinggi untuk hasil 10x dalam waktu lebih sedikit. Anti hustle, pro hasil.",
    highlights: ["Time blocking", "Eisenhower matrix", "Digital minimalism", "Energy management"],
    contents: ["Audit waktu", "Sistem prioritas", "Eliminasi distraksi", "Ritual harian", "Tools produktivitas", "Review & iterasi"],
    benefits: ["Template Notion", "Planner PDF", "Challenge 21 hari"],
  },
  {
    id: "10", slug: "pengembangan-diri-360",
    title: "Pengembangan Diri 360°",
    category: "Pengembangan Diri",
    author: "Dewi Anggraini",
    price: 79000, originalPrice: 189000, rating: 4.9, reviews: 940, pages: 192,
    cover: cover("1507842217343-583bb7270b66"),
    description: "Roadmap holistik untuk berkembang di semua aspek hidup: karir, finansial, relasi, kesehatan, dan spiritual.",
    highlights: ["Wheel of life", "Goal mapping tahunan", "Healthy boundaries", "Lifelong learning"],
    contents: ["Self awareness", "Karir & finansial", "Relasi sehat", "Kesehatan fisik & mental", "Spiritualitas", "Rencana 12 bulan"],
    benefits: ["Workbook lengkap", "Sesi refleksi audio", "Komunitas eksklusif"],
  },
];

export const findEbook = (slug: string) => ebooks.find((e) => e.slug === slug);
export const formatRupiah = (n: number) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(n);
