import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const CART_KEY = 'tow_v3_cart'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try { return JSON.parse(localStorage.getItem(CART_KEY)) || [] } catch { return [] }
  })
  const [toast, setToast] = useState(null)

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart))
  }, [cart])

  const addToCart = useCallback((name, price, qty = 1) => {
    setCart(prev => {
      const existing = prev.find(i => i.name === name)
      if (existing) return prev.map(i => i.name === name ? { ...i, qty: i.qty + qty } : i)
      return [...prev, { id: Date.now(), name, price, qty }]
    })
    setToast({ msg: `${name} added!`, type: 'success' })
    setTimeout(() => setToast(null), 2200)
  }, [])

  const removeFromCart = useCallback(id => setCart(prev => prev.filter(i => i.id !== id)), [])

  const updateQty = useCallback((id, qty) => {
    if (qty < 1) { removeFromCart(id); return }
    setCart(prev => prev.map(i => i.id === id ? { ...i, qty } : i))
  }, [removeFromCart])

  const clearCart = useCallback(() => setCart([]), [])

  const cartCount = cart.reduce((s, i) => s + i.qty, 0)
  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0)

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQty, clearCart, cartCount, cartTotal, toast }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
