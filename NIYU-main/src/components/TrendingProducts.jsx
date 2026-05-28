import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { getTrendingProducts } from '../data/products'

const trendingProducts = getTrendingProducts()

function TrendingCard({ product, index }) {
  const { openProductDetail } = useCart()
  const { toggleWishlist, isWished } = useWishlist()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.23, 1, 0.32, 1] }}
      className="flex-shrink-0 w-[240px] sm:w-[260px] snap-start"
    >
      <div
        className="group card-luxury flex flex-col h-full cursor-pointer"
        onClick={() => openProductDetail(product)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openProductDetail(product) } }}
      >
        <div className="flex flex-col h-full relative" style={{ zIndex: 10 }}>
          {/* Wishlist heart */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              toggleWishlist(product.id)
            }}
            className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center bg-ivory/80 backdrop-blur-sm border border-ink/5 hover:border-ink/15 transition-all duration-300 z-10 min-w-[44px] min-h-[44px]"
            aria-label={isWished(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <svg
              className={`w-4 h-4 transition-colors duration-300 ${isWished(product.id) ? 'text-red-500' : 'text-ink-subtle'}`}
              fill={isWished(product.id) ? 'currentColor' : 'none'}
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
          </button>

          {/* Tag */}
          <span className="inline-flex self-start px-3 py-1 bg-gradient-to-r from-gold to-gold-light text-ivory text-label mb-6">
            {product.tag}
          </span>

          {/* Image — clip-path reveal */}
          <div className="flex justify-center items-center flex-1 mb-4 min-h-[180px] liquid-shimmer">
            <motion.img
              src={product.image}
              alt={`${product.name} perfume bottle`}
              loading="lazy"
              width="160"
              height="220"
              initial={{ clipPath: 'inset(0 0 100% 0)', opacity: 0 }}
              whileInView={{ clipPath: 'inset(0 0 0% 0)', opacity: 1 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
              className="h-44 w-auto object-contain opacity-75 group-hover:opacity-100 transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-105 group-hover:drop-shadow-[0_12px_32px_rgba(201,169,110,0.25)] pointer-events-none"
            />
          </div>

          {/* Info */}
          <div className="mt-auto">
            <div className="w-8 h-[1px] bg-gradient-to-r from-gold to-transparent group-hover:w-16 transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] mb-4" />
            <h3 className="text-xl font-heading font-light text-ink mb-3">
              {product.name}
            </h3>
            <div className="flex items-center gap-2 mb-3">
              {product.sizes.map((s) => (
                <div key={s.label} className="flex-1 text-center py-1.5 bg-champagne/15 border border-gold/8">
                  <p className="text-[11px] tracking-[0.1em] uppercase text-gold-dark font-body font-medium">{s.label}</p>
                  <p className="text-xs font-heading text-ink-soft">
                    <span className="text-[11px] text-ink-subtle font-body font-light mr-px">&#8377;</span>{s.price}
                  </p>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center gap-2 w-full py-3 bg-charcoal/5 group-hover:bg-charcoal text-charcoal group-hover:text-ivory text-label transition-all duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] min-h-[44px]">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              View Details
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function TrendingProducts() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const scrollRef = useRef(null)

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -280 : 280,
        behavior: 'smooth',
      })
    }
  }

  return (
    <section id="trending" className="relative py-16 sm:py-24 overflow-hidden" aria-label="Trending products">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(28,28,28,0.04)_0%,transparent_60%)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header with scroll arrows */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <motion.div
              initial={{ clipPath: 'inset(0 100% 0 0)' }}
              animate={isInView ? { clipPath: 'inset(0 0% 0 0)' } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
              className="section-divider !mx-0 !mb-8 !ml-0 origin-left"
            />
            <h2 className="heading-display text-3xl md:text-4xl lg:text-5xl text-ink mb-4">
              Trending Now
            </h2>
            <p className="text-ink-subtle font-body font-light max-w-xl">
              Most loved fragrances this season
            </p>
          </div>

          {/* Scroll arrows */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => scroll('left')}
              className="w-11 h-11 border border-ink/8 bg-cream flex items-center justify-center hover:border-ink/20 hover:bg-ink hover:text-cream transition-all duration-200 active:scale-95 group"
              aria-label="Scroll left"
            >
              <svg className="w-4 h-4 text-ink-muted group-hover:text-cream transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-11 h-11 border border-ink/8 bg-cream flex items-center justify-center hover:border-ink/20 hover:bg-ink hover:text-cream transition-all duration-200 active:scale-95 group"
              aria-label="Scroll right"
            >
              <svg className="w-4 h-4 text-ink-muted group-hover:text-cream transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Horizontal scroll row */}
      <div
        ref={scrollRef}
        className="flex gap-5 px-4 sm:px-6 overflow-x-auto scrollbar-none overscroll-contain touch-manipulation"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {trendingProducts.map((product, i) => (
          <TrendingCard key={product.name} product={product} index={i} />
        ))}
        <div className="flex-shrink-0 w-4" aria-hidden="true" />
      </div>
    </section>
  )
}
