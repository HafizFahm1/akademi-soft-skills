import { motion } from "framer-motion";

export function PageHeader({ eyebrow, title, desc }: { eyebrow?: string; title: string; desc?: string }) {
  return (
    <section className="relative overflow-hidden gradient-hero pt-16 pb-20 md:pt-24 md:pb-28">
      <div className="absolute -top-10 left-0 h-40 w-40 gradient-orange clip-diamond opacity-70" />
      <div className="absolute top-20 right-10 h-32 w-32 gradient-tosca clip-diamond opacity-50" />
      <div className="absolute bottom-0 left-1/3 h-24 w-24 gradient-lime clip-diamond opacity-40" />

      <div className="relative mx-auto max-w-7xl px-4 md:px-8 text-center">
        {eyebrow && (
          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center px-4 py-1.5 rounded-full glass border border-[var(--brand-tosca)]/20 text-xs font-semibold text-[var(--brand-tosca)] tracking-wider uppercase mb-5"
          >
            {eyebrow}
          </motion.div>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl font-extrabold text-[var(--brand-navy)] tracking-tight"
        >
          {title}
        </motion.h1>
        {desc && (
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="mt-5 max-w-2xl mx-auto text-muted-foreground text-base md:text-lg"
          >
            {desc}
          </motion.p>
        )}
      </div>
    </section>
  );
}
