import { createContext, useContext, useState, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import { stopSmoothScroll, startSmoothScroll } from '../hooks/useLenis'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState([])
  const [step, setStep] = useState('closed')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [delivery, setDelivery] = useState({ name: '', phone: '', email: '', address: '', pincode: '' })
  const [orderId, setOrderId] = useState(null)
  const [detailProduct, setDetailProduct] = useState(null)

  const openProductModal = useCallback((product) => {
    setSelectedProduct(product)
    setStep('product-modal')
    document.body.style.overflow = 'hidden'
    stopSmoothScroll()
  }, [])

  const closeFlow = useCallback(() => {
    setStep('closed')
    setSelectedProduct(null)
    document.body.style.overflow = ''
    startSmoothScroll()
  }, [])

  const openProductDetail = useCallback((product) => {
    setDetailProduct(product)
    stopSmoothScroll()
    history.pushState({ view: 'product-detail', productId: product.id }, '')
  }, [])

  const closeProductDetail = useCallback(() => {
    setDetailProduct(null)
    startSmoothScroll()
  }, [])

  const addToCart = useCallback((item) => {
    setItems(prev => {
      const existing = prev.findIndex(i => i.name === item.name && i.size === item.size)
      if (existing >= 0) {
        const updated = [...prev]
        updated[existing] = { ...updated[existing], qty: updated[existing].qty + item.qty }
        return updated
      }
      return [...prev, item]
    })
    setStep('cart')
    stopSmoothScroll()
  }, [])

  const removeFromCart = useCallback((index) => {
    setItems(prev => prev.filter((_, i) => i !== index))
  }, [])

  const updateQty = useCallback((index, qty) => {
    if (qty < 1) return
    setItems(prev => {
      const updated = [...prev]
      updated[index] = { ...updated[index], qty }
      return updated
    })
  }, [])

  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0)

  const confirmOrder = useCallback(async () => {
    let savedOrderId = null

    // Insert to Supabase if configured
    if (supabase) {
      try {
        console.log('[NIYU] Attempting Supabase insert...', { delivery, items, subtotal })
        const { data, error } = await supabase
          .from('orders')
          .insert({
            customer_name: delivery.name,
            phone: delivery.phone,
            email: delivery.email,
            address: delivery.address,
            pincode: delivery.pincode,
            items: items.map(i => ({ name: i.name, size: i.size, price: i.price, qty: i.qty })),
            subtotal,
            payment_method: 'UPI',
            status: 'pending',
          })
          .select('id')
          .single()

        if (error) {
          console.error('[NIYU] Supabase insert error:', error)
        } else {
          console.log('[NIYU] Order saved:', data.id)
          savedOrderId = data.id
          setOrderId(data.id)
        }
      } catch (err) {
        console.error('[NIYU] Supabase exception:', err)
      }
    } else {
      console.warn('[NIYU] Supabase not configured — order not saved')
    }

    // Send order confirmation email (fire-and-forget)
    const emailPayload = {
      email: delivery.email,
      name: delivery.name,
      phone: delivery.phone,
      orderId: savedOrderId,
      items: items.map(i => ({ name: i.name, size: i.size, price: i.price, qty: i.qty })),
      subtotal,
      address: delivery.address,
      pincode: delivery.pincode,
    }
    fetch('/api/send-confirmation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(emailPayload),
    }).catch(err => console.error('[NIYU] Email failed:', err))

    setStep('confirmation')
  }, [items, delivery, subtotal])

  return (
    <CartContext.Provider value={{
      items, step, selectedProduct, delivery, subtotal, orderId, detailProduct,
      openProductModal, closeFlow, addToCart, removeFromCart, updateQty,
      openProductDetail, closeProductDetail,
      setStep, setDelivery, confirmOrder,
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
