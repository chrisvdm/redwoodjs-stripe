export interface CustomerDescription {
  id: string;
  search: string;
}

export interface CartItem {
  id: string;
  quantity: number;
}

export type Customer = unknown;

export type Cart = CartItem[];

export type SetCart = (cart: Cart) => unknown;

export type WaitForCustomer = () => Promise<Customer | null>;
