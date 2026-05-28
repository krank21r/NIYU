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
    <div className="p-5 sm:p-8">
      {/* Desktop: two-column, Mobile: single column */}
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">

        {/* Left: Cart Items */}
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline justify-between mb-5">
            <h3 className="text-lg font-heading font-bold text-ink-soft">
              Shopping Cart
            </h3>
            <span className="text-[11px] text-ink-subtle font-body">
              {items.length} {items.length === 1 ? 'item' : 'items'}
            </span>
          </div>

          {/* Item list */}
          <div className="divide-y divide-ink/5 border-t border-ink/5">
            {items.map((item, index) => (
              <motion.div
                key={`${item.name}-${item.size}-${index}`}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex gap-4 sm:gap-5 py-5"
              >
                {/* Product Image */}
                <div className="w-20 h-24 sm:w-24 sm:h-28 flex-shrink-0 bg-cream/40 border border-ink/5 flex items-center justify-center overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-16 sm:h-20 w-auto object-contain"
                  />
                </div>

                {/* Product Details */}
                <div className="flex-1 min-w-0 flex flex-col">
                  <div className="flex-1">
                    <h4 className="text-sm sm:text-[15px] font-heading font-semibold text-ink-soft leading-tight">
                      {item.name}
                    </h4>
                    <p className="text-[12px] text-ink-subtle font-body mt-0.5">
                      Size: {item.size}
                    </p>
                    <p className="text-[12px] text-ink-subtle font-body">
                      MRP: <span className="text-ink-soft font-medium">&#8377;{item.price}</span>
                    </p>
                  </div>

                  {/* Qty + Price row */}
                  <div className="flex items-end justify-between mt-3">
                    {/* Quantity controls — Amazon pill style */}
                    <div className="flex items-center border border-ink/10 bg-cream/30">
                      <button
                        onClick={() => updateQty(index, item.qty - 1)}
                        disabled={item.qty <= 1}
                        className="w-9 h-9 flex items-center justify-center hover:bg-ink/5 transition-colors disabled:opacity-30 min-w-[44px] min-h-[44px]"
                        aria-label="Decrease quantity"
                      >
                        <svg className="w-3 h-3 text-ink-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
                        </svg>
                      </button>
                      <span className="w-10 text-center text-sm font-body font-semibold text-ink-soft border-x border-ink/10">
                        {item.qty}
                      </span>
                      <button
                        onClick={() => updateQty(index, item.qty + 1)}
                        className="w-9 h-9 flex items-center justify-center hover:bg-ink/5 transition-colors min-w-[44px] min-h-[44px]"
                        aria-label="Increase quantity"
                      >
                        <svg className="w-3 h-3 text-ink-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                        </svg>
                      </button>
                    </div>

                    {/* Line total */}
                    <span className="text-[15px] font-heading font-bold text-ink-soft">
                      &#8377;{item.price * item.qty}
                    </span>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => removeFromCart(index)}
                    className="text-[12px] text-ink-subtle hover:text-red-500 font-body mt-2 text-left transition-colors underline underline-offset-2 decoration-ink/20 hover:decoration-red-500"
                  >
                    Remove
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Continue Shopping link — mobile */}
          <button
            onClick={closeFlow}
            className="mt-4 text-[12px] text-ink-subtle font-body underline underline-offset-2 decoration-ink/20 hover:text-ink-soft transition-colors lg:hidden"
          >
            Continue Shopping
          </button>
        </div>

        {/* Right: Price Summary */}
        <div className="lg:w-80 xl:w-96 flex-shrink-0">
          <div className="lg:sticky lg:top-24 border border-ink/5 bg-cream/30 p-5 sm:p-6">
            <h3 className="text-[11px] tracking-[0.1em] uppercase text-ink-subtle font-body font-medium mb-4 pb-3 border-b border-ink/5">
              Price Details
            </h3>

            <div className="space-y-3">
              <div className="flex justify-between text-sm font-body">
                <span className="text-ink-subtle">Price ({items.length} {items.length === 1 ? 'item' : 'items'})</span>
                <span className="text-ink-soft">&#8377;{subtotal}</span>
              </div>
              <div className="flex justify-between text-sm font-body">
                <span className="text-ink-subtle">Delivery</span>
                <span className="text-green-700 font-medium">Free</span>
              </div>
              <div className="border-t border-ink/5 pt-3 mt-3">
                <div className="flex justify-between">
                  <span className="text-sm font-body font-semibold text-ink-soft">Total</span>
                  <span className="text-lg font-heading font-bold text-gold">&#8377;{subtotal}</span>
                </div>
              </div>
            </div>

            {/* CTA */}
            <button
              onClick={() => setStep('checkout')}
              className="w-full mt-6 py-3.5 bg-ink hover:bg-ink-soft text-white text-[11px] tracking-[0.1em] uppercase font-body font-semibold transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] min-h-[48px]"
            >
              Proceed to Checkout
            </button>

            {/* Continue Shopping — desktop */}
            <button
              onClick={closeFlow}
              className="w-full mt-3 py-2.5 text-[12px] text-ink-subtle font-body text-center hover:text-ink-soft transition-colors underline underline-offset-2 decoration-ink/20 hidden lg:block"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
