import { motion, AnimatePresence } from 'framer-motion'
import { useWishlist } from '../context/WishlistContext'
import { useCart } from '../context/CartContext'
import products, { getProductById } from '../data/products'

export default function WishlistOverlay({ open, onClose }) {
  const { wishlist, toggleWishlist } = useWishlist()
  const { addToCart } = useCart()

  const wishedProducts = wishlist.map(id => getProductById(id)).filter(Boolean)

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/30 z-[200]"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-ivory z-[201] flex flex-col shadow-[-8px_0_30px_rgba(0,0,0,0.08)]"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 pt-[max(1rem,env(safe-area-inset-top))] pb-4 border-b border-ink/5">
              <div className="flex items-center gap-2">
                <h2 className="text-sm tracking-[0.12em] uppercase font-heading text-ink-soft">
                  Wishlist
                </h2>
                {wishedProducts.length > 0 && (
                  <span className="text-[11px] text-ink-subtle font-body">({wishedProducts.length})</span>
                )}
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-cream/60 flex items-center justify-center hover:bg-cream transition-colors duration-300 min-w-[44px] min-h-[44px]"
                aria-label="Close wishlist"
              >
                <svg className="w-4 h-4 text-ink-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              {wishedProducts.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full px-6 text-center">
                  <svg className="w-16 h-16 text-ink-subtle/30 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                  </svg>
                  <p className="text-ink-subtle font-body text-sm mb-2">Your wishlist is empty</p>
                  <p className="text-ink-subtle/60 font-body text-[12px]">Tap the heart icon on any product to save it here</p>
                </div>
              ) : (
                <div className="p-5 space-y-4">
                  {wishedProducts.map((product) => (
                    <div key={product.id} className="flex gap-4 p-3 bg-cream/30 border border-ink/5">
                      <div className="w-16 h-20 flex-shrink-0 bg-ivory/60 flex items-center justify-center overflow-hidden">
                        <img src={product.image} alt={product.name} className="h-16 w-auto object-contain" />
                      </div>
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <h4 className="text-sm font-heading font-semibold text-ink-soft truncate">{product.name}</h4>
                          <p className="text-[12px] text-ink-subtle font-body">
                            From &#8377;{product.sizes[0]?.price}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => {
                              addToCart({ ...product, size: product.sizes[0].label, price: product.sizes[0].price, qty: 1, image: product.image })
                            }}
                            className="flex-1 py-2 bg-ink hover:bg-ink-soft text-white text-[11px] tracking-[0.08em] uppercase font-body font-semibold transition-all duration-400 min-h-[36px]"
                          >
                            Add to Cart
                          </button>
                          <button
                            onClick={() => toggleWishlist(product.id)}
                            className="w-9 h-9 flex items-center justify-center border border-ink/10 hover:border-red-300 hover:text-red-500 transition-colors min-w-[44px] min-h-[44px]"
                            aria-label="Remove from wishlist"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
