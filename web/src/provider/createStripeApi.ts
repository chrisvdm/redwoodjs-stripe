import type {
  Customer,
  Cart,
  SetCart,
  WaitForCustomer,
  CartItem,
} from "./types.js";

export const createStripeApi = (
  cart: Cart,
  setCart: SetCart,
  customer: Customer,
  waitForCustomer: WaitForCustomer,
) => ({
  waitForCustomer,
  customer: customer,
  cart,
  addToCart: (item: CartItem) => {
    const prevCart = [...cart];
    const itemIndex = findItemIndexByID(item.id, prevCart);
    let newCart = [];

    if (itemIndex !== null && itemIndex >= 0) {
      // replace obj with new object
      newCart = [...prevCart];
      newCart.splice(itemIndex, 1, {
        ...item,
        quantity: prevCart[itemIndex].quantity + 1,
      });
    } else {
      newCart = [
        ...cart,
        {
          ...item,
          quantity: 1,
        },
      ];
    }

    setCart(newCart);
  },
  removeFromCart: (item: CartItem) => {
    const prevCart = [...cart];
    const itemIndex = findItemIndexByID(item.id, prevCart);
    let newCart = [];
    if (itemIndex !== null && itemIndex >= 0) {
      newCart = [...prevCart];
      newCart.splice(itemIndex, 1);
    } else {
      newCart = [...cart];
    }

    setCart(newCart);
  },
  editCartItem: (item: CartItem, payload: Partial<CartItem>) => {
    const itemIndex = findItemIndexByID(item.id, cart);
    let editedCart: Cart;

    if (itemIndex !== null) {
      // payload shape: {quantity: 1}
      const editedItem = {
        ...cart[itemIndex],
        ...payload,
      };

      editedCart = [...cart];
      editedCart.splice(itemIndex, 1, editedItem);
    } else {
      editedCart = [
        ...cart,
        {
          ...item,
          ...payload,
        },
      ];
    }

    setCart(editedCart);
  },
  clearCart: () => {
    setCart([]);
  },
});

const findItemIndexByID = (key: string, inputArray: { id: string }[]) => {
  for (let i = 0; i < inputArray.length; i++) {
    if (inputArray[i].id === key) {
      return i;
    }
  }

  return null;
};
