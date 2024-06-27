import type { DocumentNode } from "graphql";

export type FragmentNames =
  | "createFragment"
  | "retrieveFragment"
  | "listFragment";

export type Fragments = Partial<Record<FragmentNames, DocumentNode>>;

// todo(justinvdm, 27 June 2024): Use codegen-ed types
type UnknownByString = Record<string, unknown>;
export type ListStripeSubscriptionsParamsInput = UnknownByString;
export type StripeCustomerPortalInput = UnknownByString;
export type StripeCustomerPortalConfigInput = UnknownByString;
export type StripeAdditionalPropertiesInput = UnknownByString;
export type CreateStripeCustomerInput = UnknownByString;
