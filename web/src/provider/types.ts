export interface CustomerDescription {
  id: string;
  search: string;
}

export interface CartItem {
  id: string;
  quantity: number;
}

export type Customer = {
  id: string;
  name: string;
  email: string;
};

export type Cart = CartItem[];

export type SetCart = (cart: Cart) => unknown;

export type MaybePromise<V> = V | Promise<V>;

export type WaitForCustomer = () => MaybePromise<Customer | null>;
