import { createContext, useContext, useState, useCallback, useMemo } from 'react'

const WishlistContext = createContext(null)

const STORAGE_KEY = 'niyu-wishlist'

function loadWishlist() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState(loadWishlist)

  const persist = (list) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
  }

  const toggleWishlist = useCallback((productId) => {
    setWishlist(prev => {
      const next = prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
      persist(next)
      return next
    })
  }, [])

  const isWished = useCallback((productId) => {
    return wishlist.includes(productId)
  }, [wishlist])

  const value = useMemo(() => ({
    wishlist,
    toggleWishlist,
    isWished,
    wishlistCount: wishlist.length,
  }), [wishlist, toggleWishlist, isWished])

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const ctx = useContext(WishlistContext)
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider')
  return ctx
}
