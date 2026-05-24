import { useState } from 'react'
import { motion } from 'framer-motion'
import { useCart } from '../context/CartContext'

export default function CheckoutForm() {
  const { delivery, setDelivery, setStep, subtotal } = useCart()
  const [errors, setErrors] = useState({})

  const validate = () => {
    const errs = {}
    if (!delivery.name.trim()) errs.name = 'Name is required'
    if (!/^\d{10}$/.test(delivery.phone)) errs.phone = 'Enter a valid 10-digit number'
    if (!delivery.address.trim()) errs.address = 'Address is required'
    if (!/^\d{6}$/.test(delivery.pincode)) errs.pincode = 'Enter a valid 6-digit pincode'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validate()) setStep('payment')
  }

  const handleChange = (field) => (e) => {
    setDelivery({ ...delivery, [field]: e.target.value })
    if (errors[field]) setErrors({ ...errors, [field]: null })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-6 space-y-5">
        <div>
          <label className="block text-[11px] tracking-[0.1em] uppercase text-ink-subtle font-body font-medium mb-2">Full Name</label>
          <input
            type="text"
            value={delivery.name}
            onChange={handleChange('name')}
            placeholder="Enter your full name"
            className={`w-full px-4 py-3 rounded-xl bg-cream/40 border ${errors.name ? 'border-red-400' : 'border-ink/8'} text-[16px] font-body text-ink-soft placeholder:text-ink-subtle/50 focus:outline-none focus:border-gold/50 transition-colors duration-300`}
          />
          {errors.name && <p className="text-[11px] text-red-500 font-body mt-1">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-[11px] tracking-[0.1em] uppercase text-ink-subtle font-body font-medium mb-2">Phone Number</label>
          <input
            type="tel"
            value={delivery.phone}
            onChange={handleChange('phone')}
            placeholder="10-digit mobile number"
            maxLength={10}
            className={`w-full px-4 py-3 rounded-xl bg-cream/40 border ${errors.phone ? 'border-red-400' : 'border-ink/8'} text-[16px] font-body text-ink-soft placeholder:text-ink-subtle/50 focus:outline-none focus:border-gold/50 transition-colors duration-300`}
          />
          {errors.phone && <p className="text-[11px] text-red-500 font-body mt-1">{errors.phone}</p>}
        </div>

        <div>
          <label className="block text-[11px] tracking-[0.1em] uppercase text-ink-subtle font-body font-medium mb-2">Delivery Address</label>
          <textarea
            value={delivery.address}
            onChange={handleChange('address')}
            placeholder="House no., Street, City, State"
            rows={3}
            className={`w-full px-4 py-3 rounded-xl bg-cream/40 border ${errors.address ? 'border-red-400' : 'border-ink/8'} text-[16px] font-body text-ink-soft placeholder:text-ink-subtle/50 focus:outline-none focus:border-gold/50 transition-colors duration-300 resize-none`}
          />
          {errors.address && <p className="text-[11px] text-red-500 font-body mt-1">{errors.address}</p>}
        </div>

        <div>
          <label className="block text-[11px] tracking-[0.1em] uppercase text-ink-subtle font-body font-medium mb-2">Pincode</label>
          <input
            type="text"
            value={delivery.pincode}
            onChange={handleChange('pincode')}
            placeholder="6-digit pincode"
            maxLength={6}
            className={`w-full px-4 py-3 rounded-xl bg-cream/40 border ${errors.pincode ? 'border-red-400' : 'border-ink/8'} text-[16px] font-body text-ink-soft placeholder:text-ink-subtle/50 focus:outline-none focus:border-gold/50 transition-colors duration-300`}
          />
          {errors.pincode && <p className="text-[11px] text-red-500 font-body mt-1">{errors.pincode}</p>}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-ink/5 p-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] bg-ivory/80 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-5">
          <span className="text-sm text-ink-subtle font-body">Order Total</span>
          <span className="text-xl font-heading font-bold text-ink-soft">&#8377;{subtotal}</span>
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => setStep('cart')}
            className="flex-1 py-3 rounded-full border border-ink/10 text-ink-muted text-[11px] tracking-[0.08em] uppercase font-body font-medium hover:border-gold/30 hover:text-ink-soft transition-all duration-400 min-h-[44px]"
          >
            Back
          </button>
          <button
            type="submit"
            className="flex-1 py-3 rounded-full bg-gold hover:bg-gold-dark text-white text-[11px] tracking-[0.1em] uppercase font-body font-semibold transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] shadow-[0_4px_20px_rgba(184,134,11,0.25)] min-h-[44px]"
          >
            Continue to Payment
          </button>
        </div>
      </div>
    </form>
  )
}
