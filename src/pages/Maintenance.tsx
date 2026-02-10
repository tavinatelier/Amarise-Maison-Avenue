import { motion } from "framer-motion";
import { SEOHead } from "@/components/seo/SEOHead";

export default function Maintenance() {
  return (
    <>
      <SEOHead
        title="We'll Be Right Back | AMARISÉ"
        description="AMARISÉ is temporarily undergoing maintenance. We'll return shortly."
      />
      <div className="min-h-screen flex flex-col items-center justify-center bg-background px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] as const }}
          className="max-w-lg"
        >
          <p className="text-caption text-muted-foreground/50 tracking-[0.3em] mb-8">
            AMARISÉ
          </p>
          <h1 className="font-serif text-3xl md:text-4xl mb-6">
            A Moment of Quiet
          </h1>
          <p className="text-muted-foreground leading-relaxed mb-8">
            We are refining the experience behind the scenes. Like all things crafted with care,
            this requires a moment of stillness. We will return shortly.
          </p>
          <div className="w-16 h-px bg-border mx-auto mb-8" />
          <p className="text-xs text-muted-foreground/50">
            For urgent enquiries, please contact{" "}
            <a href="mailto:contact@amarise.com" className="underline hover:text-foreground transition-colors">
              contact@amarise.com
            </a>
          </p>
        </motion.div>
      </div>
    </>
  );
}
