
// Define context shape
export const createStripeCartApi = (cart, setCart) => ({
  cart,
  addToCart: (item) => {
    setCart([...cart, item])
  },
  clearCart: () => {
    setCart([])
  },
})