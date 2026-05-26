import { createContext, useContext, useState, useCallback } from 'react'
import { supabase } from '../lib/supabase'

const CartContext = createContext(null)

const UPI_ID = 'PLACEHOLDER@upi'
const WHATSAPP_NUMBER = '916302040779'

export function CartProvider({ children }) {
  const [items, setItems] = useState([])
  const [step, setStep] = useState('closed')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [delivery, setDelivery] = useState({ name: '', phone: '', address: '', pincode: '' })
  const [orderId, setOrderId] = useState(null)
  const [detailProduct, setDetailProduct] = useState(null)

  const openProductModal = useCallback((product) => {
    setSelectedProduct(product)
    setStep('product-modal')
  }, [])

  const closeFlow = useCallback(() => {
    setStep('closed')
    setSelectedProduct(null)
  }, [])

  const openProductDetail = useCallback((product) => {
    setDetailProduct(product)
    document.body.style.overflow = 'hidden'
    history.pushState({ view: 'product-detail', productId: product.id }, '')
  }, [])

  const closeProductDetail = useCallback(() => {
    setDetailProduct(null)
    document.body.style.overflow = ''
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

  const buildWhatsAppUrl = useCallback(() => {
    const itemLines = items.map(i =>
      `\u2022 ${i.name} \u2014 ${i.size} x ${i.qty} \u2014 \u20B9${i.price * i.qty}`
    ).join('\n')

    const msg = [
      `\uD83D\uDED2 NEW ORDER \u2014 NIYU Perfumes`,
      ``,
      `Customer: ${delivery.name}`,
      `Phone: ${delivery.phone}`,
      `Address: ${delivery.address}, ${delivery.pincode}`,
      ``,
      `Items:`,
      itemLines,
      ``,
      `Total: \u20B9${subtotal}`,
      `Payment: UPI`,
      ``,
      `Please confirm and dispatch.`,
    ].join('\n')

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`
  }, [items, delivery, subtotal])

  const confirmOrder = useCallback(async () => {
    // Insert to Supabase if configured
    if (supabase) {
      try {
        console.log('[NIYU] Attempting Supabase insert...', { delivery, items, subtotal })
        const { data, error } = await supabase
          .from('orders')
          .insert({
            customer_name: delivery.name,
            phone: delivery.phone,
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
          setOrderId(data.id)
        }
      } catch (err) {
        console.error('[NIYU] Supabase exception:', err)
      }
    } else {
      console.warn('[NIYU] Supabase not configured — order not saved')
    }

    setStep('confirmation')
  }, [items, delivery, subtotal])

  return (
    <CartContext.Provider value={{
      items, step, selectedProduct, delivery, subtotal, orderId, detailProduct,
      openProductModal, closeFlow, addToCart, removeFromCart, updateQty,
      openProductDetail, closeProductDetail,
      setStep, setDelivery, confirmOrder, buildWhatsAppUrl,
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
