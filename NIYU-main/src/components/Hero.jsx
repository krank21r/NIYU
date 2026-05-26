import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import SmokeEffect from './SmokeEffect'

const slides = [
  { type: 'video', src: '/Nim.mp4' },
  { type: 'image', src: '/2nd scsroll.png', alt: 'NIYU — Elegance in Every Drop' },
]

export default function Hero() {
  const ref = useRef(null)
  const [current, setCurrent] = useState(0)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const textY = useTransform(scrollYProgress, [0, 1], [0, 200])
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.25])
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 100])
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.2, 0.6])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section ref={ref} id="hero" className="relative min-h-[100dvh] overflow-hidden">
      {/* Background Slider with cinematic parallax */}
      <motion.div
        className="absolute top-[6%] -left-[5%] -right-[5%] -bottom-[5%] w-[110%] h-[110%]"
        style={{ scale: bgScale, y: bgY }}
      >
        <AnimatePresence mode="wait">
          {slides[current].type === 'video' ? (
            <motion.video
              key="video"
              src={slides[current].src}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: [0.32, 0.72, 0, 1] }}
              className="absolute inset-0 w-full h-full object-cover object-center select-none pointer-events-none"
            />
          ) : (
            <motion.img
              key={current}
              src={slides[current].src}
              alt={slides[current].alt}
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -80 }}
              transition={{ duration: 1.2, ease: [0.32, 0.72, 0, 1] }}
              className="absolute inset-0 w-full h-full object-cover object-center select-none pointer-events-none"
            />
          )}
        </AnimatePresence>
      </motion.div>

      {/* Cinematic gradient overlays — warm ivory fade */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-ivory/80 via-ivory/20 to-transparent z-[1]"
        style={{ opacity: overlayOpacity }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ivory/60 via-transparent to-ivory/10 z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-b from-ivory/20 via-transparent to-transparent z-[1]" />

      {/* Smoke particles */}
      <SmokeEffect count={3} className="z-[2]" />

      <motion.div
        className="relative z-10 h-full flex flex-col justify-between px-4 sm:px-6 lg:px-12 xl:px-20 pb-8 sm:pb-12 pt-36 sm:pt-40"
        style={{ y: textY }}
      >
        {/* Main content area */}
        <div className="flex-1 flex flex-col justify-center">
          {/* Decorative gold line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.4, delay: 0.8, ease: [0.32, 0.72, 0, 1] }}
            className="w-20 sm:w-24 h-[1px] bg-gradient-to-r from-gold to-transparent origin-left"
          />

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2, ease: [0.32, 0.72, 0, 1] }}
            className="mt-8"
          >
            <a href="#specials" className="btn-luxury">
              <span>Discover the Collection</span>
              <span className="inline-block w-4 h-[1px] bg-gold-light" />
            </a>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.32, 0.72, 0, 1] }}
          className="relative z-20"
        >
          <div className="flex flex-col gap-1">
            <span className="text-label text-gold-dark font-heading text-sm tracking-[0.25em]">
              NIYU
            </span>
            <span className="text-label text-gold/80 text-[10px]">
              PURE OILS. PURE LUXURY.
            </span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
