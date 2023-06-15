
// Define context shape
export const createStripeApi = (cart, setCart, customer, waitForCustomer) => ({
  waitForCustomer,
  customer: customer,
  cart,
  addToCart: (item) => {
    const prevCart = [...cart] 
    const itemIndex = findItemIndexByID(item.id, prevCart)
    let newCart = []
    if (itemIndex >= 0) {
      // replace obj with new object
      newCart =[ ...prevCart]
      newCart.splice(itemIndex, 1, {
          ...item,
          quantity: prevCart[itemIndex].quantity + 1
        })
    } else {
      newCart = [
        ...cart,
        {
          ...item,
          quantity: 1
        }
      ]
    }

    setCart(newCart)
  },
  removeFromCart: (item) => {
    const prevCart = [...cart] 
    const itemIndex = findItemIndexByID(item, prevCart)
    let newCart = []
    if (itemIndex >= 0) {
      newCart =[... prevCart]
      newCart.splice(itemIndex,1)
    } else {
      newCart = [...cart]
    }

    setCart(newCart)
  },
  editCartItem: (item, payload) => {
    const itemIndex = findItemIndexByID(item, cart)
    
    // payload shape: {quantity: 1}
    const editedItem = {
      ...cart[itemIndex],
      ...payload,
    }
    const editedCart = [...cart]
    editedCart.splice(itemIndex, 1, editedItem)
    setCart(editedCart)
  },
  clearCart: () => {
    setCart([])
  },
})

const findItemIndexByID = (key, inputArray) => {
  for (let i = 0; i < inputArray.length; i++) {
      if (inputArray[i].id === key) {
          return i;
      }
  }
}