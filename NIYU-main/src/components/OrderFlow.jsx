import { AnimatePresence, motion } from 'framer-motion'
import { useCart } from '../context/CartContext'
import ProductModal from './ProductModal'
import CartView from './CartView'
import CheckoutForm from './CheckoutForm'
import PaymentView from './PaymentView'
import OrderConfirmation from './OrderConfirmation'

const stepTitles = {
  'product-modal': null,
  'cart': 'Your Cart',
  'checkout': 'Delivery Details',
  'payment': 'Payment',
  'confirmation': 'Order Confirmed',
}

export default function OrderFlow() {
  const { step, closeFlow, setStep } = useCart()

  if (step === 'closed') return null

  // Product modal renders itself (centered popup)
  if (step === 'product-modal') {
    return (
      <AnimatePresence mode="wait">
        <ProductModal key="product-modal" />
      </AnimatePresence>
    )
  }

  // Cart, Checkout, Payment, Confirmation — full-screen overlay with header
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="order-flow-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
        className="fixed inset-0 z-[150] bg-ivory overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-[max(1rem,env(safe-area-inset-top))] pb-4 border-b border-ink/5 bg-ivory/90 backdrop-blur-sm">
          <button
            onClick={step === 'cart' ? closeFlow : () => {
              const order = ['cart', 'checkout', 'payment', 'confirmation']
              const idx = order.indexOf(step)
              if (idx > 0) setStep(order[idx - 1])
              else closeFlow()
            }}
            className="w-10 h-10 rounded-full bg-cream/60 flex items-center justify-center hover:bg-cream transition-colors duration-300 min-w-[44px] min-h-[44px]"
            aria-label="Go back"
          >
            <svg className="w-4 h-4 text-ink-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <h2 className="text-sm tracking-[0.12em] uppercase font-heading text-ink-soft">
            {stepTitles[step]}
          </h2>

          <button
            onClick={closeFlow}
            className="w-10 h-10 rounded-full bg-cream/60 flex items-center justify-center hover:bg-cream transition-colors duration-300 min-w-[44px] min-h-[44px]"
            aria-label="Close"
          >
            <svg className="w-4 h-4 text-ink-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Step progress */}
        {step !== 'confirmation' && (
          <div className="flex items-center gap-2 px-5 py-3 border-b border-ink/5">
            {['cart', 'checkout', 'payment'].map((s, i) => (
              <div key={s} className="flex-1 flex items-center gap-2">
                <div className={`h-1 flex-1 rounded-full transition-all duration-500 ${
                  ['cart', 'checkout', 'payment'].indexOf(step) >= i
                    ? 'bg-gold'
                    : 'bg-ink/8'
                }`} />
              </div>
            ))}
          </div>
        )}

        {/* Content — this div is the scroll container */}
        <div style={{ height: 'calc(100vh - 120px)', overflowY: 'auto', overscrollBehavior: 'contain' }}>
          {step === 'cart' && <CartView />}
          {step === 'checkout' && <CheckoutForm />}
          {step === 'payment' && <PaymentView />}
          {step === 'confirmation' && <OrderConfirmation />}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
