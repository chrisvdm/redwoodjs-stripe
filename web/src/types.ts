import type { DocumentNode } from "graphql";

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

// todo(justinvdm, 27 June 2024): Use codegen-ed types
export type StripeCheckoutModeEnum = "payment" | "subscription" | "setup";
export type StripeItemTypeEnum = "once_off" | "recurring";

export type ListStripeSubscriptionsParamsInput = UnknownByString;
export type StripeCustomerPortalInput = UnknownByString;
export type StripeCustomerPortalConfigInput = UnknownByString;
export type StripeAdditionalPropertiesInput = UnknownByString;
export type CreateStripeCustomerInput = UnknownByString;

export interface StripeCustomer {
  id: string;
  name: string;
  email: string;
}

export interface ProductInput {
  id: string;
  quantity: number;
}
