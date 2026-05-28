import { useMemo } from 'react'
import { motion } from 'framer-motion'

export default function Particles({ count = 25 }) {
  const particles = useMemo(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.2 + 0.06,
    })), [count])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: `radial-gradient(circle, rgba(201,169,110,${p.opacity}) 0%, transparent 100%)`,
            boxShadow: `0 0 ${p.size * 3}px rgba(201,169,110,${p.opacity * 0.2})`,
          }}
          animate={{
            y: [0, -25, 0],
            opacity: [p.opacity, p.opacity * 1.4, p.opacity],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: [0.23, 1, 0.32, 1],
          }}
        />
      ))}
    </div>
  )
}
