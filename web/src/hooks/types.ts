import type { DocumentNode } from "graphql";

export type FragmentNames =
  | "createFragment"
  | "retrieveFragment"
  | "listFragment";

export type Fragments = Partial<Record<FragmentNames, DocumentNode>>;

// todo(justinvdm, 27 June 2024): Use codegen-ed types
export type ListStripeSubscriptionsParamsInput = Record<string, unknown>;
export type StripeCustomerPortalInput = Record<string, unknown>;
export type StripeCustomerPortalConfigInput = Record<string, unknown>;
