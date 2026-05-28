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
        <AnimatePresence>
          {slides[current].type === 'video' ? (
            <motion.video
              key="video"
              src={slides[current].src}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
              animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
              exit={{ opacity: 0, clipPath: 'inset(100% 0 0 0)' }}
              transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
              className="absolute inset-0 w-full h-full object-cover object-center select-none pointer-events-none"
            />
          ) : (
            <motion.img
              key={current}
              src={slides[current].src}
              alt={slides[current].alt}
              initial={{ opacity: 0, clipPath: 'inset(0 100% 0 0)' }}
              animate={{ opacity: 1, clipPath: 'inset(0 0% 0 0)' }}
              exit={{ opacity: 0, clipPath: 'inset(0 0 0 100%)' }}
              transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
              className="absolute inset-0 w-full h-full object-cover object-center select-none pointer-events-none"
            />
          )}
        </AnimatePresence>
      </motion.div>

      {/* Cinematic gradient overlays — dark left for text readability */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent z-[1]"
        style={{ opacity: overlayOpacity }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-transparent z-[1]" />

      {/* Smoke particles */}
      <SmokeEffect count={3} className="z-[2]" />

      <motion.div
        className="relative z-10 h-full flex flex-col justify-between px-4 sm:px-6 lg:px-12 xl:px-20 pb-8 sm:pb-12 pt-36 sm:pt-40"
        style={{ y: textY }}
      >
        {/* Main content area */}
        <div className="flex-1 flex flex-col justify-center">
          {/* Decorative gold line — clip-path reveal */}
          <motion.div
            initial={{ clipPath: 'inset(0 100% 0 0)' }}
            animate={{ clipPath: 'inset(0 0% 0 0)' }}
            transition={{ duration: 1, delay: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="w-20 sm:w-24 h-[1px] bg-gradient-to-r from-gold-light to-transparent"
          />

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0, ease: [0.23, 1, 0.32, 1] }}
            className="mt-6 sm:mt-8 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-heading font-light text-ivory leading-[1.1] max-w-xl"
          >
            Scent That<br />
            <span className="text-gold-light">Stays.</span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.2, ease: [0.23, 1, 0.32, 1] }}
            className="mt-4 sm:mt-5 text-ivory/70 font-body font-light text-sm sm:text-base max-w-md leading-relaxed"
          >
            Pure oil perfumes crafted from the world's finest ingredients.
            Designed to linger, made to impression.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.5, ease: [0.23, 1, 0.32, 1] }}
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
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="relative z-20"
        >
          <div className="flex flex-col gap-1">
            <span className="text-label text-gold-light font-heading text-sm tracking-[0.25em]">
              NIYU
            </span>
            <span className="text-label text-ivory/50 text-[11px]">
              PURE OILS. PURE LUXURY.
            </span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
