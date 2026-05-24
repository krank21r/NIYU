import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../context/CartContext'

const sizeOptions = [
  { label: '15ml', price: 499 },
  { label: '30ml', price: 899 },
  { label: '50ml', price: 1299 },
]

export default function ProductModal() {
  const { selectedProduct, addToCart, closeFlow } = useCart()
  const [selectedSize, setSelectedSize] = useState(sizeOptions[2])
  const [qty, setQty] = useState(1)

  if (!selectedProduct) return null

  const handleAddToCart = () => {
    addToCart({
      name: selectedProduct.name,
      image: selectedProduct.image,
      description: selectedProduct.description || '',
      size: selectedSize.label,
      price: selectedSize.price,
      qty,
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-ink/40 backdrop-blur-sm"
      onClick={closeFlow}
    >
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.97 }}
        transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
        className="relative w-full max-w-md max-h-[90vh] overflow-y-auto bg-ivory rounded-2xl shadow-[0_24px_80px_rgba(26,22,18,0.12)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={closeFlow}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-cream/80 backdrop-blur-sm flex items-center justify-center hover:bg-cream transition-colors duration-300 min-w-[44px] min-h-[44px]"
          aria-label="Close"
        >
          <svg className="w-4 h-4 text-ink-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Product image */}
        <div className="relative bg-cream/40 flex justify-center items-center py-8 px-6">
          <img
            src={selectedProduct.image}
            alt={selectedProduct.name}
            className="h-48 w-auto object-contain drop-shadow-[0_0_20px_rgba(184,134,11,0.08)]"
          />
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-2xl font-heading text-ink-soft mb-1">{selectedProduct.name}</h3>
          {selectedProduct.description && (
            <p className="text-xs text-ink-subtle font-body font-light mb-5">{selectedProduct.description}</p>
          )}

          {/* Size selector */}
          <p className="text-[11px] tracking-[0.1em] uppercase text-ink-subtle font-body font-medium mb-3">Select Size</p>
          <div className="flex gap-3 mb-6">
            {sizeOptions.map((s) => (
              <button
                key={s.label}
                onClick={() => setSelectedSize(s)}
                className={`flex-1 py-3 rounded-xl border text-center transition-all duration-400 ease-[cubic-bezier(0.32,0.72,0,1)] min-h-[44px] ${
                  selectedSize.label === s.label
                    ? 'border-gold bg-gold/10 shadow-[0_0_16px_rgba(184,134,11,0.1)]'
                    : 'border-ink/8 bg-cream/40 hover:border-gold/30'
                }`}
              >
                <p className={`text-xs tracking-[0.08em] uppercase font-body font-medium mb-0.5 ${
                  selectedSize.label === s.label ? 'text-gold-dark' : 'text-ink-subtle'
                }`}>{s.label}</p>
                <p className={`text-sm font-body font-semibold ${
                  selectedSize.label === s.label ? 'text-gold-dark' : 'text-ink-soft'
                }`}>
                  <span className="text-[10px] font-normal mr-px">&#8377;</span>{s.price}
                </p>
              </button>
            ))}
          </div>

          {/* Quantity */}
          <p className="text-[11px] tracking-[0.1em] uppercase text-ink-subtle font-body font-medium mb-3">Quantity</p>
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => setQty(Math.max(1, qty - 1))}
              className="w-11 h-11 rounded-full border border-ink/10 bg-cream/40 flex items-center justify-center hover:border-gold/30 transition-colors duration-300 min-w-[44px] min-h-[44px]"
              aria-label="Decrease quantity"
            >
              <svg className="w-4 h-4 text-ink-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
              </svg>
            </button>
            <span className="text-lg font-body font-semibold text-ink-soft w-8 text-center">{qty}</span>
            <button
              onClick={() => setQty(qty + 1)}
              className="w-11 h-11 rounded-full border border-ink/10 bg-cream/40 flex items-center justify-center hover:border-gold/30 transition-colors duration-300 min-w-[44px] min-h-[44px]"
              aria-label="Increase quantity"
            >
              <svg className="w-4 h-4 text-ink-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            className="w-full py-3.5 rounded-full bg-gold hover:bg-gold-dark text-white text-[11px] tracking-[0.12em] uppercase font-body font-semibold transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] shadow-[0_4px_20px_rgba(184,134,11,0.25)] hover:shadow-[0_6px_28px_rgba(184,134,11,0.35)] min-h-[44px]"
          >
            Add to Cart — &#8377;{selectedSize.price * qty}
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}
