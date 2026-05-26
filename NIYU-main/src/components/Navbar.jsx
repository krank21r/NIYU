import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'Shop', href: '#specials' },
  { label: 'Attars', href: '#attars' },
  { label: 'Car Perfumes', href: '#car-perfumes' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [active, setActive] = useState('#hero')

  useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 60)
          const sections = ['hero', 'trending', 'specials', 'attars', 'car-perfumes', 'about', 'collection', 'contact']
          for (let i = sections.length - 1; i >= 0; i--) {
            const el = document.getElementById(sections[i])
            if (el && el.getBoundingClientRect().top <= 200) {
              setActive('#' + sections[i])
              break
            }
          }
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const handleNavClick = (e, href) => {
    e.preventDefault()
    const targetId = href.replace('#', '')
    const targetEl = document.getElementById(targetId)
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth' })
      setActive(href)
    }
    if (mobileOpen) setMobileOpen(false)
  }

  return (
    <>
      {/* Desktop Nav */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.2, ease: [0.32, 0.72, 0, 1] }}
        className={`fixed top-9 left-0 right-0 z-50 hidden lg:block transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          scrolled
            ? 'bg-cream/90 backdrop-blur-2xl border-b border-gold/10 shadow-[0_1px_30px_rgba(0,0,0,0.06)]'
            : 'bg-cream/60 backdrop-blur-lg'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-8">
          {/* Logo — left */}
          <motion.a
            href="#"
            className="flex items-baseline gap-1 group"
            whileHover={{ scale: 1.02 }}
            onClick={(e) => handleNavClick(e, '#hero')}
            aria-label="NIYU Perfumes — back to top"
          >
            <span className="text-xl font-heading tracking-[0.3em] text-charcoal leading-none transition-all duration-500 group-hover:tracking-[0.35em]">
              NIYU
            </span>
            <sup className="text-[7px] font-body font-light tracking-normal text-ink-muted">®</sup>
          </motion.a>

          {/* Nav Links — center */}
          <nav className="flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="group relative px-4 py-2 text-[11px] tracking-[0.12em] uppercase font-body font-medium text-ink-muted hover:text-charcoal transition-colors duration-400"
                aria-current={active === link.href ? 'page' : undefined}
              >
                {link.label}
                {/* Hover underline reveal */}
                <span className="absolute bottom-0 left-4 right-4 h-[1px] bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] origin-left" />
                {/* Active underline */}
                {active === link.href && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute bottom-0 left-4 right-4 h-[1px] bg-gold"
                    transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
                  />
                )}
              </a>
            ))}
          </nav>

          {/* Right spacer */}
          <div className="w-16" />
        </div>
      </motion.header>

      {/* Mobile Nav */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.2, ease: [0.32, 0.72, 0, 1] }}
        className={`fixed top-9 left-0 right-0 z-50 lg:hidden transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          scrolled || mobileOpen
            ? 'bg-cream/90 backdrop-blur-2xl border-b border-gold/10 shadow-[0_1px_30px_rgba(0,0,0,0.06)]'
            : 'bg-cream/60 backdrop-blur-lg'
        }`}
      >
        <div className="flex items-center justify-between h-14 px-5">
          {/* Hamburger — left */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="relative w-11 h-11 flex items-center justify-center -ml-1"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            <div className="w-5 flex flex-col gap-[6px]">
              <motion.span
                animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
                className="block w-full h-[1.5px] bg-charcoal origin-center"
              />
              <motion.span
                animate={mobileOpen ? { opacity: 0, x: -8, scaleX: 0 } : { opacity: 1, x: 0, scaleX: 1 }}
                transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
                className="block w-full h-[1.5px] bg-charcoal origin-left"
              />
              <motion.span
                animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
                className="block w-full h-[1.5px] bg-charcoal origin-center"
              />
            </div>
          </button>

          {/* Logo — center */}
          <motion.a
            href="#"
            className="absolute left-1/2 -translate-x-1/2 flex items-baseline gap-0.5 group"
            whileHover={{ scale: 1.02 }}
            onClick={(e) => handleNavClick(e, '#hero')}
            aria-label="NIYU Perfumes — back to top"
          >
            <span className="text-lg font-heading tracking-[0.3em] text-charcoal leading-none transition-all duration-500 group-hover:tracking-[0.35em]">
              NIYU
            </span>
            <sup className="text-[8px] font-body font-light tracking-normal text-ink-muted">®</sup>
          </motion.a>

          {/* Right spacer */}
          <div className="w-11" />
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
            className="fixed inset-0 z-40 bg-ivory/98 backdrop-blur-3xl flex flex-col items-center justify-center lg:hidden"
          >
            {/* Close button — top right */}
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-4 right-5 w-11 h-11 flex items-center justify-center"
              aria-label="Close menu"
            >
              <motion.svg
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
                className="w-5 h-5 text-charcoal"
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </motion.svg>
            </button>

            {/* Nav links */}
            <div className="flex flex-col items-center gap-1">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ delay: 0.08 + i * 0.05, duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                  className={`relative text-[13px] tracking-[0.18em] uppercase font-body font-medium py-3 transition-colors duration-400 ${
                    active === link.href
                      ? 'text-gold-dark'
                      : 'text-ink-muted hover:text-charcoal'
                  }`}
                  aria-current={active === link.href ? 'page' : undefined}
                >
                  {link.label}
                  {/* Hover underline */}
                  <span className="absolute bottom-1 left-0 right-0 h-[1px] bg-gold scale-x-0 hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] origin-center" />
                </motion.a>
              ))}
            </div>

            {/* Decorative divider */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-10 flex items-center gap-4"
            >
              <div className="w-10 h-[1px] bg-gradient-to-r from-transparent to-gold/30" />
              <span className="text-[9px] tracking-[0.3em] uppercase text-gold-dark font-body font-light">NIYU</span>
              <div className="w-10 h-[1px] bg-gradient-to-l from-transparent to-gold/30" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
