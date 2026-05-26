import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../context/CartContext'

const ease = [0.32, 0.72, 0, 1]

export default function ProductDetail() {
  const { detailProduct, closeProductDetail, addToCart } = useCart()
  const [selectedSize, setSelectedSize] = useState(null)
  const [qty, setQty] = useState(1)
  const [activeImage, setActiveImage] = useState(0)

  const product = detailProduct

  useEffect(() => {
    if (product) {
      const sizes = product.sizes || []
      setSelectedSize(sizes[sizes.length - 1] || null)
      setQty(1)
      setActiveImage(0)
    }
  }, [product?.id])

  useEffect(() => {
    if (!product) return
    const handlePop = () => closeProductDetail()
    window.addEventListener('popstate', handlePop)
    return () => window.removeEventListener('popstate', handlePop)
  }, [product, closeProductDetail])

  const sizes = product?.sizes || []
  const images = product?.images || [product?.image].filter(Boolean)
  const notes = product?.notes || []

  const handleAddToCart = () => {
    if (!product) return
    addToCart({
      name: product.name,
      image: product.image,
      description: product.description || '',
      size: selectedSize.label,
      price: selectedSize.price,
      qty,
    })
    closeProductDetail()
  }

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          key="product-detail"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.35, ease }}
          className="fixed inset-0 z-[150] bg-ivory overflow-y-auto"
        >
          {/* Header */}
          <div className="sticky top-0 z-20 bg-ivory/95 backdrop-blur-sm border-b border-ink/5">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 h-14">
              <button
                onClick={() => {
                  closeProductDetail()
                  history.back()
                }}
                className="flex items-center gap-2 text-ink-muted hover:text-ink transition-colors duration-300 min-w-[44px] min-h-[44px] justify-center -ml-2"
                aria-label="Go back"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
                <span className="text-xs tracking-[0.08em] uppercase font-body font-medium hidden sm:inline">Back</span>
              </button>

              <h1 className="text-sm font-heading text-ink-soft truncate max-w-[200px] sm:max-w-none">
                {product.name}
              </h1>

              <button
                onClick={() => {
                  closeProductDetail()
                  history.back()
                }}
                className="w-11 h-11 flex items-center justify-center text-ink-muted hover:text-ink transition-colors duration-300"
                aria-label="Close"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
            {/* Desktop: two-column / Mobile: stacked */}
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-14">

              {/* Left: Image Gallery */}
              <div className="lg:w-[55%]">
                {/* Main Image */}
                <div className="relative bg-ivory border border-ink/5 flex justify-center items-center py-8 sm:py-12 mb-4">
                  {product.tag && (
                    <span className="absolute top-4 left-4 z-10 px-3 py-1.5 bg-gradient-to-r from-gold to-gold-light text-ivory text-[10px] tracking-[0.12em] uppercase font-body font-medium">
                      {product.tag}
                    </span>
                  )}
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={activeImage}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.02 }}
                      transition={{ duration: 0.3, ease }}
                      src={images[activeImage]}
                      alt={`${product.name} perfume bottle`}
                      className="h-64 sm:h-80 md:h-96 w-auto object-contain"
                    />
                  </AnimatePresence>
                </div>

                {/* Thumbnails */}
                {images.length > 1 && (
                  <div className="flex gap-3">
                    {images.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveImage(i)}
                        className={`flex-1 border p-2 flex justify-center items-center transition-all duration-300 ${
                          activeImage === i
                            ? 'border-ink/30 bg-ink/5'
                            : 'border-ink/5 hover:border-ink/15'
                        }`}
                        aria-label={`View image ${i + 1}`}
                      >
                        <img
                          src={img}
                          alt={`${product.name} perfume image ${i + 1}`}
                          className={`h-16 sm:h-20 w-auto object-contain transition-all duration-300 ${
                            activeImage === i ? 'opacity-100' : 'opacity-50'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Right: Product Info */}
              <div className="lg:w-[45%] lg:py-4">
                {/* Name & Description */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.05, ease }}
                >
                  <h2 className="text-3xl sm:text-4xl font-heading font-light text-ink mb-3">
                    {product.name}
                  </h2>
                  {product.description && (
                    <p className="text-ink-muted font-body font-light leading-relaxed mb-6">
                      {product.description}
                    </p>
                  )}
                </motion.div>

                {/* Notes pills */}
                {notes.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1, ease }}
                    className="flex gap-2 flex-wrap mb-6"
                  >
                    {notes.map((note) => (
                      <span key={note} className="px-3 py-1.5 bg-ivory border border-ink/8 text-[10px] tracking-[0.1em] uppercase text-ink-subtle font-body">
                        {note}
                      </span>
                    ))}
                  </motion.div>
                )}

                <div className="h-[1px] bg-ink/5 mb-6" />

                {/* Size Selector */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.12, ease }}
                >
                  <p className="text-[11px] tracking-[0.1em] uppercase text-ink-subtle font-body font-medium mb-3">Select Size</p>
                  <div className="flex gap-3 mb-6">
                    {sizes.map((s) => (
                      <button
                        key={s.label}
                        onClick={() => setSelectedSize(s)}
                        className={`flex-1 py-3.5 border text-center transition-all duration-400 ease-[cubic-bezier(0.32,0.72,0,1)] min-h-[44px] ${
                          selectedSize?.label === s.label
                            ? 'border-ink bg-ink/5'
                            : 'border-ink/8 bg-cream/40 hover:border-ink/20'
                        }`}
                      >
                        <p className={`text-xs tracking-[0.08em] uppercase font-body font-medium mb-0.5 ${
                          selectedSize?.label === s.label ? 'text-ink' : 'text-ink-subtle'
                        }`}>{s.label}</p>
                        <p className={`text-sm font-body font-semibold ${
                          selectedSize?.label === s.label ? 'text-ink' : 'text-ink-soft'
                        }`}>
                          <span className="text-[10px] font-normal mr-px">&#8377;</span>{s.price}
                        </p>
                      </button>
                    ))}
                  </div>
                </motion.div>

                {/* Quantity */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.15, ease }}
                >
                  <p className="text-[11px] tracking-[0.1em] uppercase text-ink-subtle font-body font-medium mb-3">Quantity</p>
                  <div className="flex items-center gap-4 mb-6">
                    <button
                      onClick={() => setQty(Math.max(1, qty - 1))}
                      className="w-11 h-11 border border-ink/10 bg-cream/40 flex items-center justify-center hover:border-ink/20 transition-colors duration-300 min-w-[44px] min-h-[44px]"
                      aria-label="Decrease quantity"
                    >
                      <svg className="w-4 h-4 text-ink-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
                      </svg>
                    </button>
                    <span className="text-lg font-body font-semibold text-ink-soft w-8 text-center">{qty}</span>
                    <button
                      onClick={() => setQty(qty + 1)}
                      className="w-11 h-11 border border-ink/10 bg-cream/40 flex items-center justify-center hover:border-ink/20 transition-colors duration-300 min-w-[44px] min-h-[44px]"
                      aria-label="Increase quantity"
                    >
                      <svg className="w-4 h-4 text-ink-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </div>
                </motion.div>

                {/* Price */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.18, ease }}
                  className="mb-6"
                >
                  <p className="text-3xl font-heading text-ink">
                    <span className="text-lg text-ink-subtle font-body font-light mr-1">&#8377;</span>
                    {selectedSize ? selectedSize.price * qty : '—'}
                  </p>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2, ease }}
                  className="flex flex-col gap-3"
                >
                  <button
                    onClick={handleAddToCart}
                    className="w-full py-4 bg-ink hover:bg-ink-soft text-white text-[11px] tracking-[0.12em] uppercase font-body font-semibold transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] min-h-[48px]"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={handleAddToCart}
                    className="w-full py-4 border border-gold text-gold hover:bg-gold hover:text-ivory text-[11px] tracking-[0.12em] uppercase font-body font-semibold transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] min-h-[48px]"
                  >
                    Buy Now
                  </button>
                </motion.div>
              </div>
            </div>

            {/* Fragrance Notes Pyramid */}
            {(product.topNotes || product.heartNotes || product.baseNotes) && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.8, ease }}
                className="mt-16 sm:mt-24"
              >
                <div className="text-center mb-12">
                  <div className="section-divider origin-center mb-8" />
                  <h3 className="text-3xl sm:text-4xl font-heading font-light text-ink">
                    Fragrance Notes
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-0 max-w-3xl mx-auto">
                  {[
                    { label: 'Top Notes', notes: product.topNotes },
                    { label: 'Heart Notes', notes: product.heartNotes },
                    { label: 'Base Notes', notes: product.baseNotes },
                  ].filter(col => col.notes?.length > 0).map((col, i, arr) => (
                    <div
                      key={col.label}
                      className={`text-center px-6 ${i < arr.length - 1 ? 'sm:border-r sm:border-ink/8' : ''}`}
                    >
                      <p className="text-[11px] tracking-[0.15em] uppercase text-gold-dark font-body font-medium mb-4">
                        {col.label}
                      </p>
                      {col.notes.map((note) => (
                        <p key={note} className="text-lg font-heading text-ink-soft mb-2 last:mb-0">
                          {note}
                        </p>
                      ))}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Fragrance Story */}
            {product.longDescription && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.8, ease }}
                className="mt-16 sm:mt-24"
              >
                <div className="bg-gradient-to-b from-ivory to-parchment py-16 sm:py-20 px-6 sm:px-12">
                  <div className="max-w-2xl mx-auto text-center">
                    <div className="section-divider origin-center mb-8" />
                    <h3 className="text-3xl sm:text-4xl font-heading font-light text-ink mb-6">
                      The Essence
                    </h3>
                    <p className="text-ink-muted font-body font-light text-lg leading-[1.8]">
                      {product.longDescription}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
