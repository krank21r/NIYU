import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export default function FloatingBottle({ src = '/images/bottle-rose-oudh.svg', alt = 'NIYU perfume bottle', className = '' }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [40, -40])

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      className={`relative ${className}`}
    >
      {/* Glow backdrop */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-48 h-48 rounded-full bg-gold/10 blur-3xl animate-glow-pulse" />
      </div>

      {/* Bottle — Framer Motion float only, no CSS animate-float */}
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: [0.32, 0.72, 0, 1] }}
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-auto drop-shadow-[0_20px_60px_rgba(201,169,110,0.25)]"
          loading="lazy"
        />
      </motion.div>
    </motion.div>
  )
}
