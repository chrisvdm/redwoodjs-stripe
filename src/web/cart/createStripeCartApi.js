
// Define context shape
export const createStripeCartApi = (cart, setCart) => ({
  cart,
  addToCart: (item) => {
    const prevCart = [...cart] 
    const itemIndex = findItemIndexByID(item, prevCart)
    let newCart = []

    if (itemIndex >= 0) {
      // replace obj with new object
      newCart = prevCart
      newCart.splice(itemIndex, 1, {
          id: item,
          quantity: prevCart[itemIndex].quantity + 1
        })
    } else {
      newCart = [
        ...cart,
        {
          id: item,
          quantity: 1
        }
      ]
    }

    setCart(newCart)
  },
  clearCart: () => {
    setCart([])
  },
})

const findItemIndexByID = (key, inputArray) => {
  for (let i=0; i < inputArray.length; i++) {
      if (inputArray[i].id === key) {
          return i;
      } else {
        return -1;
      }
  }
}