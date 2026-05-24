import { useState } from 'react'
import { motion } from 'framer-motion'
import { useCart } from '../context/CartContext'

export default function PaymentView() {
  const { subtotal, confirmOrder, setStep } = useCart()
  const [paying, setPaying] = useState(false)

  const handleConfirm = async () => {
    setPaying(true)
    await confirmOrder()
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-6 flex flex-col items-center">
        {/* Amount */}
        <p className="text-[11px] tracking-[0.1em] uppercase text-ink-subtle font-body font-medium mb-2">Pay via UPI</p>
        <p className="text-2xl font-heading font-bold text-ink-soft mb-6">
          &#8377;{subtotal}
        </p>

        {/* QR Code Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
          className="p-3 bg-white rounded-2xl shadow-[0_4px_24px_rgba(26,22,18,0.06)] mb-4"
        >
          <img
            src="/QR-Code.jpg"
            alt="UPI QR Code — Scan to pay"
            className="w-[220px] h-[220px] object-contain"
          />
        </motion.div>

        <p className="text-sm text-ink-subtle font-body text-center mb-1">
          Scan with PhonePe, Google Pay, Paytm, or any UPI app
        </p>
        <p className="text-[11px] text-ink-subtle/70 font-body text-center">
          UPI ID: narasalapavankumarkumar@oksbi
        </p>

        <p className="text-[11px] text-gold font-body font-medium text-center mt-4">
          Please pay the exact amount shown above
        </p>
      </div>

      {/* Footer */}
      <div className="border-t border-ink/5 p-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] bg-ivory/80 backdrop-blur-sm">
        <div className="flex gap-3">
          <button
            onClick={() => setStep('checkout')}
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
