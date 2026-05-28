import { motion } from 'framer-motion'
import { useCart } from '../context/CartContext'

export default function CartView() {
  const { items, subtotal, removeFromCart, updateQty, setStep, closeFlow } = useCart()

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-6">
        <svg className="w-16 h-16 text-ink-subtle/40 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
        <p className="text-ink-subtle font-body text-sm mb-6">Your cart is empty</p>
        <button
          onClick={closeFlow}
          className="py-3 px-8 border border-ink/15 text-ink text-[11px] tracking-[0.1em] uppercase font-body font-medium hover:bg-ink/5 transition-all duration-400 min-h-[44px]"
        >
          Continue Shopping
        </button>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-4">
      <div>
        {items.map((item, index) => (
          <motion.div
            key={`${item.name}-${item.size}-${index}`}
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex gap-4 p-4 bg-cream/40 border border-ink/5"
          >
            {/* Thumbnail */}
            <div className="w-16 h-20 flex-shrink-0 flex items-center justify-center bg-ivory/60 overflow-hidden">
              <img src={item.image} alt={item.name} className="h-16 w-auto object-contain" />
            </div>

            {/* Details */}
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-heading text-ink-soft mb-0.5">{item.name}</h4>
              <p className="text-[11px] text-ink-subtle font-body">{item.size} — &#8377;{item.price} each</p>

              <div className="flex items-center justify-between mt-3">
                {/* Qty controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQty(index, item.qty - 1)}
                    disabled={item.qty <= 1}
                    className="w-8 h-8 border border-ink/10 bg-ivory flex items-center justify-center hover:border-ink/20 transition-colors disabled:opacity-30 min-w-[44px] min-h-[44px]"
                    aria-label="Decrease quantity"
                  >
                    <svg className="w-3 h-3 text-ink-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
                    </svg>
                  </button>
                  <span className="text-sm font-body font-semibold text-ink-soft w-6 text-center">{item.qty}</span>
                  <button
                    onClick={() => updateQty(index, item.qty + 1)}
                    className="w-8 h-8 border border-ink/10 bg-ivory flex items-center justify-center hover:border-ink/20 transition-colors min-w-[44px] min-h-[44px]"
                    aria-label="Increase quantity"
                  >
                    <svg className="w-3 h-3 text-ink-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>

                {/* Line total + remove */}
                <div className="flex items-center gap-3">
                  <span className="text-sm font-body font-semibold text-ink-soft">&#8377;{item.price * item.qty}</span>
                  <button
                    onClick={() => removeFromCart(index)}
                    className="text-ink-subtle hover:text-red-500 transition-colors w-11 h-11 flex items-center justify-center -mr-2 min-w-[44px] min-h-[44px]"
                    aria-label={`Remove ${item.name}`}
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <div className="border-t border-ink/5 p-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] bg-ivory/80 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-5">
          <span className="text-sm text-ink-subtle font-body">Subtotal</span>
          <span className="text-xl font-heading font-bold text-ink-soft">&#8377;{subtotal}</span>
        </div>
        <div className="flex gap-3">
          <button
            onClick={closeFlow}
            className="flex-1 py-3 border border-ink/10 text-ink-muted text-[11px] tracking-[0.08em] uppercase font-body font-medium hover:border-ink/20 hover:text-ink-soft transition-all duration-400 min-h-[44px]"
          >
            Continue Shopping
          </button>
          <button
            onClick={() => setStep('checkout')}
            className="flex-1 py-3 bg-ink hover:bg-ink-soft text-white text-[11px] tracking-[0.1em] uppercase font-body font-semibold transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] min-h-[44px]"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  )
}
