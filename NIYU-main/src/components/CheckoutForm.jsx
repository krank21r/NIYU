import { useState } from 'react'
import { motion } from 'framer-motion'
import { useCart } from '../context/CartContext'

export default function CheckoutForm() {
  const { delivery, setDelivery, setStep, subtotal, items } = useCart()
  const [errors, setErrors] = useState({})

  const validate = () => {
    const errs = {}
    if (!delivery.name.trim()) errs.name = 'Name is required'
    if (!/^\d{10}$/.test(delivery.phone)) errs.phone = 'Enter a valid 10-digit number'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(delivery.email)) errs.email = 'Enter a valid email address'
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

  const inputClass = (field) =>
    `w-full px-4 py-3 bg-transparent border ${errors[field] ? 'border-red-400' : 'border-ink/10'} text-[15px] font-body text-ink-soft placeholder:text-ink-subtle/40 focus:outline-none focus:border-gold transition-colors duration-300`

  return (
    <form onSubmit={handleSubmit} className="p-5 sm:p-8">
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">

        {/* Left: Delivery Form */}
        <div className="flex-1 min-w-0">
          {/* Section: Delivery Address */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-5">
              <span className="w-7 h-7 rounded-full bg-ink text-white text-[12px] font-body font-semibold flex items-center justify-center flex-shrink-0">
                1
              </span>
              <h3 className="text-base font-heading font-bold text-ink-soft">
                Delivery Address
              </h3>
            </div>

            <div className="space-y-4">
              {/* Name + Phone — side by side on sm+ */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] tracking-[0.05em] text-ink-subtle font-body mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={delivery.name}
                    onChange={handleChange('name')}
                    placeholder="Full name"
                    className={inputClass('name')}
                  />
                  {errors.name && <p className="text-[11px] text-red-500 font-body mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-[11px] tracking-[0.05em] text-ink-subtle font-body mb-1.5">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={delivery.phone}
                    onChange={handleChange('phone')}
                    placeholder="10-digit mobile number"
                    maxLength={10}
                    className={inputClass('phone')}
                  />
                  {errors.phone && <p className="text-[11px] text-red-500 font-body mt-1">{errors.phone}</p>}
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-[11px] tracking-[0.05em] text-ink-subtle font-body mb-1.5">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={delivery.email}
                  onChange={handleChange('email')}
                  placeholder="you@example.com"
                  className={inputClass('email')}
                />
                {errors.email && <p className="text-[11px] text-red-500 font-body mt-1">{errors.email}</p>}
              </div>

              {/* Address */}
              <div>
                <label className="block text-[11px] tracking-[0.05em] text-ink-subtle font-body mb-1.5">
                  Delivery Address *
                </label>
                <textarea
                  value={delivery.address}
                  onChange={handleChange('address')}
                  placeholder="House no., Street, Locality, City, State"
                  rows={3}
                  className={`${inputClass('address')} resize-none`}
                />
                {errors.address && <p className="text-[11px] text-red-500 font-body mt-1">{errors.address}</p>}
              </div>

              {/* Pincode */}
              <div className="sm:w-1/2">
                <label className="block text-[11px] tracking-[0.05em] text-ink-subtle font-body mb-1.5">
                  Pincode *
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  value={delivery.pincode}
                  onChange={handleChange('pincode')}
                  placeholder="6-digit pincode"
                  maxLength={6}
                  className={inputClass('pincode')}
                />
                {errors.pincode && <p className="text-[11px] text-red-500 font-body mt-1">{errors.pincode}</p>}
              </div>
            </div>
          </div>

          {/* Continue button — mobile only */}
          <button
            type="submit"
            className="w-full py-3.5 bg-ink hover:bg-ink-soft text-white text-[11px] tracking-[0.1em] uppercase font-body font-semibold transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] min-h-[48px] lg:hidden"
          >
            Continue to Payment
          </button>
          <button
            type="button"
            onClick={() => setStep('cart')}
            className="w-full mt-3 py-2.5 text-[12px] text-ink-subtle font-body text-center hover:text-ink-soft transition-colors underline underline-offset-2 decoration-ink/20 lg:hidden"
          >
            Back to Cart
          </button>
        </div>

        {/* Right: Order Summary */}
        <div className="lg:w-80 xl:w-96 flex-shrink-0">
          <div className="lg:sticky lg:top-24 border border-ink/5 bg-cream/30 p-5 sm:p-6">
            <h3 className="text-[11px] tracking-[0.1em] uppercase text-ink-subtle font-body font-medium mb-4 pb-3 border-b border-ink/5">
              Order Summary
            </h3>

            {/* Items */}
            <div className="space-y-3 mb-4">
              {items.map((item, i) => (
                <div key={i} className="flex gap-3">
                  <div className="w-12 h-14 flex-shrink-0 bg-cream/50 border border-ink/5 flex items-center justify-center overflow-hidden">
                    <img src={item.image} alt={item.name} className="h-10 w-auto object-contain" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-body text-ink-soft truncate">{item.name}</p>
                    <p className="text-[11px] text-ink-subtle font-body">{item.size} &times; {item.qty}</p>
                  </div>
                  <span className="text-[13px] font-body font-medium text-ink-soft flex-shrink-0">
                    &#8377;{item.price * item.qty}
                  </span>
                </div>
              ))}
            </div>

            {/* Price breakdown */}
            <div className="border-t border-ink/5 pt-3 space-y-2">
              <div className="flex justify-between text-[13px] font-body">
                <span className="text-ink-subtle">Subtotal</span>
                <span className="text-ink-soft">&#8377;{subtotal}</span>
              </div>
              <div className="flex justify-between text-[13px] font-body">
                <span className="text-ink-subtle">Delivery</span>
                <span className="text-green-700 font-medium">Free</span>
              </div>
              <div className="border-t border-ink/5 pt-2 mt-2">
                <div className="flex justify-between">
                  <span className="text-sm font-body font-semibold text-ink-soft">Total</span>
                  <span className="text-lg font-heading font-bold text-gold">&#8377;{subtotal}</span>
                </div>
              </div>
            </div>

            {/* CTA — desktop */}
            <button
              type="submit"
              className="w-full mt-6 py-3.5 bg-ink hover:bg-ink-soft text-white text-[11px] tracking-[0.1em] uppercase font-body font-semibold transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] min-h-[48px] hidden lg:block"
            >
              Continue to Payment
            </button>
            <button
              type="button"
              onClick={() => setStep('cart')}
              className="w-full mt-3 py-2.5 text-[12px] text-ink-subtle font-body text-center hover:text-ink-soft transition-colors underline underline-offset-2 decoration-ink/20 hidden lg:block"
            >
              Back to Cart
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}
