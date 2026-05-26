import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Preloader() {
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let raf
    let start = performance.now()
    const duration = 1800

    function tick(now) {
      const elapsed = now - start
      const p = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setProgress(eased)

      if (p < 1) {
        raf = requestAnimationFrame(tick)
      } else {
        setTimeout(() => setLoading(false), 400)
      }
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 1, ease: [0.32, 0.72, 0, 1] } }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-ivory"
        >
          <motion.div
            initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1, ease: [0.32, 0.72, 0, 1] }}
            className="text-center"
          >
            <div className="text-5xl md:text-7xl font-heading font-bold text-ink tracking-[0.3em] mb-3">
              NIYU
            </div>
            <div className="text-xs sm:text-sm tracking-[0.4em] uppercase text-ink-subtle font-body mb-10">
              Pure Oils. Pure Luxury.
            </div>
          </motion.div>

          <div className="relative w-48 h-[1px] bg-ink/5 overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 bg-ink"
              style={{ width: `${progress * 100}%` }}
            />
          </div>

          <motion.p
            className="mt-4 text-[11px] tracking-[0.2em] text-ink-subtle/40 font-body"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {Math.round(progress * 100)}%
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
