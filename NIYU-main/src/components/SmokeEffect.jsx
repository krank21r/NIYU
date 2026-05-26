const particles = [
  { size: 60, left: '20%', delay: '0s', duration: '7s', opacity: 0.12 },
  { size: 80, left: '45%', delay: '2s', duration: '9s', opacity: 0.08 },
  { size: 50, left: '70%', delay: '4s', duration: '8s', opacity: 0.1 },
  { size: 70, left: '35%', delay: '1s', duration: '10s', opacity: 0.06 },
  { size: 55, left: '60%', delay: '3s', duration: '7.5s', opacity: 0.09 },
]

export default function SmokeEffect({ className = '', count = 5 }) {
  const items = particles.slice(0, count)

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`} aria-hidden="true">
      {items.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full animate-smoke-rise"
          style={{
            width: p.size,
            height: p.size,
            left: p.left,
            bottom: '10%',
            background: 'radial-gradient(circle, rgba(201,169,110,0.15) 0%, transparent 70%)',
            animationDelay: p.delay,
            animationDuration: p.duration,
            opacity: p.opacity,
          }}
        />
      ))}
    </div>
  )
}
