import type { DocumentNode } from "graphql";
import type { StripeItemTypeEnum } from "./generated/graphql.js";

export type FragmentNames =
  | "createFragment"
  | "retrieveFragment"
  | "listFragment";

export type Fragments = Partial<Record<FragmentNames, DocumentNode>>;

export type UnknownByString = Record<string, unknown>;

export interface CustomerDescription {
  id: string;
  search: string;
}

export type Cart = CartItem[];

export interface CartItem {
  id: string;
  quantity: number;
  type: StripeItemTypeEnum;
}

export type SetCart = (cart: Cart) => unknown;

export type MaybePromise<V> = V | Promise<V>;

export type WaitForCustomer = () => MaybePromise<StripeCustomer | null>;

export interface StripeCustomer {
  id: string;
  name: string;
  email: string;
}

export interface ProductInput {
  id: string;
  quantity: number;
}
