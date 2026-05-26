import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../context/CartContext'

const UPI_ID = 'narasalapavankumar@oksbi'
const MERCHANT = 'NIYU Perfumes'

function isAndroid() {
  return /Android/i.test(navigator.userAgent)
}

function isIOS() {
  return /iPhone|iPad|iPod/i.test(navigator.userAgent)
}

function buildUpiParams(amt) {
  return `pa=${UPI_ID}&pn=NIYU+Perfumes&am=${amt}&cu=INR`
}

function getPayUrl(method, amt) {
  const params = buildUpiParams(amt)
  if (isAndroid()) {
    const schemes = {
      phonepe: `phonepe://pay?${params}`,
      gpay: `gpay://upi/pay?${params}`,
      paytm: `paytmmp://pay?${params}`,
    }
    return schemes[method]
  }
  if (isIOS()) {
    const schemes = {
      phonepe: `phonepe://pay?${params}`,
      gpay: `googlepay://upi/pay?${params}`,
      paytm: `paytmmp://pay?${params}`,
    }
    return schemes[method]
  }
  return '#'
}

const paymentApps = [
  { id: 'phonepe', name: 'PhonePe', color: '#5f259f', initial: 'P' },
  { id: 'gpay', name: 'Google Pay', color: '#4285F4', initial: 'G' },
  { id: 'paytm', name: 'Paytm', color: '#00BAF2', initial: 'P' },
]

export default function PaymentView() {
  const { subtotal, confirmOrder, setStep } = useCart()
  const [paying, setPaying] = useState(false)
  const [paymentStarted, setPaymentStarted] = useState(false)
  const [selectedMethod, setSelectedMethod] = useState(null)

  const handlePayNow = (methodId) => {
    setSelectedMethod(methodId)
    setPaymentStarted(true)
  }

  const handleConfirm = async () => {
    setPaying(true)
    await confirmOrder()
  }

  const getMethodName = () => {
    const m = paymentApps.find(a => a.id === selectedMethod)
    return m ? m.name : 'UPI App'
  }

  const getSelectedApp = () => paymentApps.find(a => a.id === selectedMethod)

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-6 flex flex-col items-center">
        <p className="text-[11px] tracking-[0.1em] uppercase text-ink-subtle font-body font-medium mb-2">Pay via UPI</p>
        <p className="text-2xl font-heading font-bold text-ink-soft mb-6">
          &#8377;{subtotal}
        </p>

        <AnimatePresence mode="wait">
          {!paymentStarted ? (
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
                {paymentApps.map((method) => (
                  <a
                    key={method.id}
                    href={getPayUrl(method.id, subtotal)}
                    onClick={() => handlePayNow(method.id)}
                    className="w-full flex items-center gap-4 p-4 border border-ink/8 bg-cream/30 hover:border-ink/20 hover:bg-cream/50 transition-all duration-400 min-h-[44px] active:scale-[0.98]"
                  >
                    <div
                      className="w-11 h-11 flex items-center justify-center text-white text-sm font-bold font-body flex-shrink-0"
                      style={{ backgroundColor: method.color }}
                    >
                      {method.initial}
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-body font-medium text-ink-soft">{method.name}</p>
                      <p className="text-[11px] text-ink-subtle font-body">Tap to pay now</p>
                    </div>
                    <svg className="w-4 h-4 text-ink-subtle ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                    </svg>
                  </a>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-ink/5">
                <p className="text-[11px] tracking-[0.1em] uppercase text-ink-subtle font-body font-medium mb-3 text-center">Or scan QR to pay</p>
                <div className="flex justify-center">
                  <div className="p-2 bg-white shadow-[0_2px_12px_rgba(28,28,28,0.04)]">
                    <img src="/QR-Code.jpg" alt="UPI QR Code" className="w-[160px] h-[160px] object-contain" />
                  </div>
                </div>
                <p className="text-[10px] text-ink-subtle/70 font-body text-center mt-2">UPI ID: {UPI_ID}</p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="waiting"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
              className="flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 flex items-center justify-center mb-6" style={{ backgroundColor: getSelectedApp()?.color + '15' }}>
                <div className="w-8 h-8 flex items-center justify-center text-white text-sm font-bold font-body" style={{ backgroundColor: getSelectedApp()?.color }}>
                  {getSelectedApp()?.initial}
                </div>
              </div>

              <p className="text-lg font-heading font-semibold text-ink-soft mb-2">
                Waiting for Payment
              </p>
              <p className="text-sm text-ink-subtle font-body mb-2">
                Complete the payment of <span className="font-semibold text-ink-soft">&#8377;{subtotal}</span> in <span className="font-semibold text-ink-soft">{getMethodName()}</span>
              </p>
              <p className="text-[11px] text-ink-subtle/70 font-body mb-6">
                UPI ID: {UPI_ID}
              </p>

              <a
                href={getPayUrl(selectedMethod, subtotal)}
                className="py-3 px-6 border border-ink/15 text-ink text-[11px] tracking-[0.08em] uppercase font-body font-medium hover:bg-ink/5 transition-all duration-400 mb-3 min-h-[44px] inline-block text-center"
              >
                Open {getMethodName()} Again
              </a>

              <div className="flex flex-wrap gap-2 justify-center mb-6">
                {paymentApps.filter(m => m.id !== selectedMethod).map((m) => (
                  <a
                    key={m.id}
                    href={getPayUrl(m.id, subtotal)}
                    onClick={() => setSelectedMethod(m.id)}
                    className="py-2 px-4 bg-cream/40 border border-ink/5 text-[11px] font-body font-medium text-ink-subtle hover:border-ink/15 transition-all duration-300 min-h-[44px] flex items-center"
                  >
                    Switch to {m.name}
                  </a>
                ))}
              </div>

              <div className="mt-2 pt-4 border-t border-ink/5">
                <p className="text-[11px] text-ink-subtle font-body mb-3">Or scan this QR code</p>
                <div className="p-2 bg-white shadow-[0_2px_12px_rgba(28,28,28,0.04)] inline-block">
                  <img src="/QR-Code.jpg" alt="UPI QR Code" className="w-[140px] h-[140px] object-contain" />
                </div>
              </div>

              <p className="text-[11px] text-ink-subtle font-body mt-4">
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
            className="flex-1 py-3 border border-ink/10 text-ink-muted text-[11px] tracking-[0.08em] uppercase font-body font-medium hover:border-ink/20 hover:text-ink-soft transition-all duration-400 min-h-[44px]"
          >
            Back
          </button>
          <button
            onClick={handleConfirm}
            disabled={paying}
            className="flex-1 py-3 bg-ink hover:bg-ink-soft text-white text-[11px] tracking-[0.1em] uppercase font-body font-semibold transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] disabled:opacity-40 disabled:cursor-not-allowed min-h-[44px]"
          >
            {paying ? 'Processing...' : 'I Have Paid'}
          </button>
        </div>
      </div>
    </div>
  )
}
