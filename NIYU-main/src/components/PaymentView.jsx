import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../context/CartContext'

const UPI_ID = 'narasalapavankumarkumar@oksbi'
const MERCHANT = 'NIYU Perfumes'

const paymentMethods = [
  {
    id: 'phonepe',
    name: 'PhonePe',
    color: '#5f259f',
    bgLight: '#f3ecff',
  },
  {
    id: 'gpay',
    name: 'Google Pay',
    color: '#4285F4',
    bgLight: '#e8f0fe',
  },
  {
    id: 'paytm',
    name: 'Paytm',
    color: '#00BAF2',
    bgLight: '#e6f8ff',
  },
]

// Build the standard UPI intent URL — supported by all UPI apps
function buildUpiUrl(amt) {
  return `upi://pay?pa=${UPI_ID}&pn=${encodeURIComponent(MERCHANT)}&am=${amt}&cu=INR`
}

export default function PaymentView() {
  const { subtotal, confirmOrder, setStep } = useCart()
  const [paying, setPaying] = useState(false)
  const [paymentStarted, setPaymentStarted] = useState(false)
  const [selectedMethod, setSelectedMethod] = useState(null)

  const handlePayNow = (method) => {
    setSelectedMethod(method)
    setPaymentStarted(true)

    // Use window.open so we don't navigate away from the page
    // If blocked by popup blocker, user can tap "Open Again"
    const url = buildUpiUrl(subtotal)
    window.open(url, '_self')
  }

  const handleConfirm = async () => {
    setPaying(true)
    await confirmOrder()
  }

  const selected = paymentMethods.find(m => m.id === selectedMethod)

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-6 flex flex-col items-center">
        {/* Amount */}
        <p className="text-[11px] tracking-[0.1em] uppercase text-ink-subtle font-body font-medium mb-2">Pay via UPI</p>
        <p className="text-2xl font-heading font-bold text-ink-soft mb-6">
          &#8377;{subtotal}
        </p>

        <AnimatePresence mode="wait">
          {!paymentStarted ? (
            /* Payment method selection */
            <motion.div
              key="select"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
              className="w-full max-w-sm"
            >
              <p className="text-[11px] tracking-[0.1em] uppercase text-ink-subtle font-body font-medium mb-4">Choose Payment App</p>
              <div className="space-y-3">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => handlePayNow(method.id)}
                    className="w-full flex items-center gap-4 p-4 rounded-xl border border-ink/8 bg-cream/30 hover:border-gold/40 hover:bg-cream/50 transition-all duration-400 min-h-[44px] active:scale-[0.98]"
                  >
                    <div
                      className="w-11 h-11 rounded-full flex items-center justify-center text-white text-sm font-bold font-body flex-shrink-0"
                      style={{ backgroundColor: method.color }}
                    >
                      {method.name.charAt(0)}
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-body font-medium text-ink-soft">{method.name}</p>
                      <p className="text-[11px] text-ink-subtle font-body">Tap to pay now</p>
                    </div>
                    <svg className="w-4 h-4 text-ink-subtle ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                    </svg>
                  </button>
                ))}
              </div>

              {/* QR fallback */}
              <div className="mt-6 pt-6 border-t border-ink/5">
                <p className="text-[11px] tracking-[0.1em] uppercase text-ink-subtle font-body font-medium mb-3 text-center">Or scan QR to pay</p>
                <div className="flex justify-center">
                  <div className="p-2 bg-white rounded-xl shadow-[0_2px_12px_rgba(26,22,18,0.04)]">
                    <img
                      src="/QR-Code.jpg"
                      alt="UPI QR Code"
                      className="w-[140px] h-[140px] object-contain"
                    />
                  </div>
                </div>
                <p className="text-[10px] text-ink-subtle/70 font-body text-center mt-2">
                  UPI ID: {UPI_ID}
                </p>
              </div>
            </motion.div>
          ) : (
            /* Payment started — waiting for user to complete */
            <motion.div
              key="waiting"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
              className="flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6" style={{ backgroundColor: selected?.bgLight }}>
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold font-body" style={{ backgroundColor: selected?.color }}>
                  {selected?.name.charAt(0)}
                </div>
              </div>

              <p className="text-lg font-heading font-semibold text-ink-soft mb-2">
                Complete Payment in {selected?.name}
              </p>
              <p className="text-sm text-ink-subtle font-body mb-2">
                Pay <span className="font-semibold text-ink-soft">&#8377;{subtotal}</span> to {MERCHANT}
              </p>
              <p className="text-[11px] text-ink-subtle/70 font-body mb-6">
                UPI ID: {UPI_ID}
              </p>

              {/* Open Again button */}
              <button
                onClick={() => window.open(buildUpiUrl(subtotal), '_self')}
                className="py-3 px-6 rounded-full border border-gold/30 text-gold text-[11px] tracking-[0.08em] uppercase font-body font-medium hover:bg-gold/5 transition-all duration-400 mb-3 min-h-[44px]"
              >
                Open {selected?.name} Again
              </button>

              {/* Switch app buttons */}
              <div className="flex gap-2 mb-6">
                {paymentMethods.filter(m => m.id !== selectedMethod).map((m) => (
                  <button
                    key={m.id}
                    onClick={() => {
                      setSelectedMethod(m.id)
                      window.open(buildUpiUrl(subtotal), '_self')
                    }}
                    className="py-2 px-4 rounded-full bg-cream/40 border border-ink/5 text-[11px] font-body font-medium text-ink-subtle hover:border-gold/30 transition-all duration-300 min-h-[44px]"
                  >
                    Switch to {m.name}
                  </button>
                ))}
              </div>

              <p className="text-[11px] text-ink-subtle font-body">
                Once payment is done, come back and tap "I Have Paid" below
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="border-t border-ink/5 p-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] bg-ivory/80 backdrop-blur-sm">
        <div className="flex gap-3">
          <button
            onClick={() => {
              setPaymentStarted(false)
              setSelectedMethod(null)
              setStep('checkout')
            }}
            className="flex-1 py-3 rounded-full border border-ink/10 text-ink-muted text-[11px] tracking-[0.08em] uppercase font-body font-medium hover:border-gold/30 hover:text-ink-soft transition-all duration-400 min-h-[44px]"
          >
            Back
          </button>
          <button
            onClick={handleConfirm}
            disabled={paying}
            className="flex-1 py-3 rounded-full bg-gold hover:bg-gold-dark text-white text-[11px] tracking-[0.1em] uppercase font-body font-semibold transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] shadow-[0_4px_20px_rgba(184,134,11,0.25)] disabled:opacity-40 disabled:cursor-not-allowed min-h-[44px]"
          >
            {paying ? 'Processing...' : 'I Have Paid'}
          </button>
        </div>
      </div>
    </div>
  )
}
