const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [stockState, setStockState] = useState({})

  // Initialize stockState from PRODUCTS on first render
  // (PRODUCTS must be imported here if needed, or passed as prop/context)

  function getStockKey(product, size) {
    return `${product.id}-${size}`
  }

  function addItem(product, size) {
    // Only check stock if product has stock field
    if (product.stock && size) {
      const stockKey = getStockKey(product, size)
      const currentStock = stockState[stockKey] ?? product.stock[size]
      if (!currentStock || currentStock < 1) {
        alert('Þessi stærð er uppseld!')
        return
      }
      setStockState(prev => ({ ...prev, [stockKey]: currentStock - 1 }))
    }
    const key = `${product.id}-${size || 'default'}`
    setItems(prev => {
      const existing = prev.find(i => i.key === key)
      if (existing) {
        return prev.map(i => i.key === key ? { ...i, qty: i.qty + 1 } : i)
      }
      return [...prev, { key, product, size: size || null, qty: 1 }]
    })
    setIsOpen(true)
  }

  function removeItem(key) {
    // Optionally: restore stock if item is removed from cart
    setItems(prev => prev.filter(i => i.key !== key))
  }

  function updateQty(key, delta) {
    setItems(prev =>
      prev.map(i => i.key === key ? { ...i, qty: Math.max(1, i.qty + delta) } : i)
    )
  }

  function clearCart() {
    setItems([])
  }

  const total = items.reduce((sum, i) => {
    const price = parseInt(i.product.price.replace(/[^0-9]/g, ''), 10)
    return sum + price * i.qty
  }, 0)

  const count = items.reduce((sum, i) => sum + i.qty, 0)

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQty, clearCart, total, count, isOpen, setIsOpen, stockState }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}
