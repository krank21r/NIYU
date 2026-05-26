import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import FloatingBottle from './FloatingBottle'
import SmokeEffect from './SmokeEffect'

const ease = [0.32, 0.72, 0, 1]

export default function CinematicShowcase() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const textY = useTransform(scrollYProgress, [0, 1], [80, -80])
  const textOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -50])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[80vh] flex items-center justify-center overflow-hidden"
      aria-label="Crafted for the bold"
    >
      {/* Background */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 bg-gradient-to-b from-charcoal via-dark-brown to-charcoal"
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,169,110,0.08)_0%,transparent_60%)]" />

      {/* Smoke particles */}
      <SmokeEffect count={5} className="z-[1]" />

      {/* Floating Bottle */}
      <div className="relative z-[2] w-48 sm:w-56 md:w-64 lg:w-72 mx-auto">
        <FloatingBottle src="/images/bottle-rose-oudh.svg" alt="Rose Oudh perfume bottle" />
      </div>

      {/* Parallax Text */}
      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="absolute inset-0 z-[3] flex flex-col items-center justify-center pointer-events-none"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease }}
          className="text-center"
        >
          <p className="text-[11px] tracking-[0.25em] uppercase text-gold/60 font-body font-medium mb-4">
            Since 2024
          </p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-light text-ivory/90 mb-4">
            Crafted for
          </h2>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-light text-gold mb-6">
            the Bold
          </h2>
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-gold/50 to-transparent mx-auto mb-6" />
          <p className="text-sm sm:text-base font-body font-light text-ivory/50 max-w-md mx-auto leading-relaxed">
            Each fragrance is a declaration — distilled from the finest ingredients, designed to leave an impression.
          </p>
        </motion.div>
      </motion.div>

      {/* Glass Info Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.8, delay: 0.3, ease }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-[4] w-[90%] max-w-md"
      >
        <div className="glass-card px-6 py-5 text-center">
          <p className="text-[10px] tracking-[0.15em] uppercase text-gold-dark font-body font-medium mb-2">
            Signature Collection
          </p>
          <p className="text-sm font-body font-light text-ink-muted leading-relaxed">
            Pure oils. Pure luxury. Handcrafted perfumes that define your presence.
          </p>
        </div>
      </motion.div>
    </section>
  )
}
