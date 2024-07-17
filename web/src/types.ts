import type { DocumentNode } from "graphql";
import type {
  StripeCustomer,
  StripeItemTypeEnum,
} from "./generated/graphql.js";

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

export type WaitForCustomer = () => MaybePromise<StripeCustomerBase | null>;

export type StripeCustomerBase = Pick<StripeCustomer, "id" | "email" | "name">;
