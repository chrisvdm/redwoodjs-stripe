/* eslint-disable */
import * as types from './graphql.js';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
const documents = {
    "\n      mutation Checkout(\n        $cart: [ProductInput!]!\n        $successUrl: String\n        $cancelUrl: String\n        $customer: StripeCustomerInput\n        $mode: StripeCheckoutModeEnum\n        $allowPromotionCodes: Boolean\n      ) {\n        checkout(cart: $cart, successUrl: $successUrl, cancelUrl: $cancelUrl, customer: $customer, mode: $mode, allowPromotionCodes: $allowPromotionCodes) {\n          id\n          url\n        }\n      }\n    ": types.CheckoutDocument,
    "\n    query retrieveStripeCheckoutSession(\n      $id: ID!\n    ) {\n      retrieveStripeCheckoutSession(id: $id) {\n        id\n        customer\n        customer_email\n        line_items {\n          object\n        }\n      }\n    }\n  ": types.RetrieveStripeCheckoutSessionDocument,
    "\n  fragment RetrieveFragment on StripeCustomer {\n    name\n    email\n    id\n  }\n": types.RetrieveFragmentFragmentDoc,
    "\n  fragment CreateFragment on StripeCustomer {\n    id\n  }\n": types.CreateFragmentFragmentDoc,
    "\n      mutation createStripeCustomer($data: CreateStripeCustomerInput) {\n        createStripeCustomer(data: $data) {\n          ...CreateFragment\n        }\n        \n        \n      }\n  ": types.CreateStripeCustomerDocument,
    "\n    query retrieveStripeCustomer(\n      $data: RetrieveStripeCustomerInput\n    ) {\n      retrieveStripeCustomer(data: $data) {\n        ...RetrieveFragment\n      }\n    }\n\n    \n  ": types.RetrieveStripeCustomerDocument,
    "\n    query stripeCustomerSearch(\n      $query: String\n    ) {\n      stripeCustomerSearch(query: $query) {\n        id\n        name\n        email\n      }\n    }\n  ": types.StripeCustomerSearchDocument,
    "\n    query fetchRetrieveStripeCustomer(\n      $data: RetrieveStripeCustomerInput\n    ) {\n      retrieveStripeCustomer(data: $data) {\n        id \n        name\n        email\n      }\n    }\n  ": types.FetchRetrieveStripeCustomerDocument,
    "\n  query listStripeCustomerPortalConfig(\n    $params: StripeCustomerPortalConfigParamsInput\n  ) {\n    listStripeCustomerPortalConfig(params: $params) {\n      data {\n        id\n        is_default\n        active\n      }\n     \n    }\n  }\n": types.ListStripeCustomerPortalConfigDocument,
    "\n      mutation createStripeCustomerPortalConfig($data: StripeCustomerPortalConfigInput ) {\n        createStripeCustomerPortalConfig(data: $data) {\n          id\n        }\n      }\n    ": types.CreateStripeCustomerPortalConfigDocument,
    "\n    mutation createStripeCustomerPortalSession($data: StripeCustomerPortalInput ) {\n      createStripeCustomerPortalSession(data: $data) {\n        id\n        url\n      }\n    }\n  ": types.CreateStripeCustomerPortalSessionDocument,
    "\n    mutation createStripeCustomerPortalSessionSkipAuth($data: StripeCustomerPortalInput) {\n      createStripeCustomerPortalSessionSkipAuth(data: $data) {\n        id\n        url\n      }\n    }\n  ": types.CreateStripeCustomerPortalSessionSkipAuthDocument,
    "\n      fragment ListFragment on StripeSubscription {\n       id\n       customer\n       status\n      }\n    ": types.ListFragmentFragmentDoc,
    "\n    query listStripeSubscriptions(\n      $data: ListStripeSubscriptionsInput\n    ) {\n      listStripeSubscriptions(data: $data) {\n        ...ListFragment\n      }\n    }\n\n    \n  ": types.ListStripeSubscriptionsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation Checkout(\n        $cart: [ProductInput!]!\n        $successUrl: String\n        $cancelUrl: String\n        $customer: StripeCustomerInput\n        $mode: StripeCheckoutModeEnum\n        $allowPromotionCodes: Boolean\n      ) {\n        checkout(cart: $cart, successUrl: $successUrl, cancelUrl: $cancelUrl, customer: $customer, mode: $mode, allowPromotionCodes: $allowPromotionCodes) {\n          id\n          url\n        }\n      }\n    "): (typeof documents)["\n      mutation Checkout(\n        $cart: [ProductInput!]!\n        $successUrl: String\n        $cancelUrl: String\n        $customer: StripeCustomerInput\n        $mode: StripeCheckoutModeEnum\n        $allowPromotionCodes: Boolean\n      ) {\n        checkout(cart: $cart, successUrl: $successUrl, cancelUrl: $cancelUrl, customer: $customer, mode: $mode, allowPromotionCodes: $allowPromotionCodes) {\n          id\n          url\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query retrieveStripeCheckoutSession(\n      $id: ID!\n    ) {\n      retrieveStripeCheckoutSession(id: $id) {\n        id\n        customer\n        customer_email\n        line_items {\n          object\n        }\n      }\n    }\n  "): (typeof documents)["\n    query retrieveStripeCheckoutSession(\n      $id: ID!\n    ) {\n      retrieveStripeCheckoutSession(id: $id) {\n        id\n        customer\n        customer_email\n        line_items {\n          object\n        }\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment RetrieveFragment on StripeCustomer {\n    name\n    email\n    id\n  }\n"): (typeof documents)["\n  fragment RetrieveFragment on StripeCustomer {\n    name\n    email\n    id\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment CreateFragment on StripeCustomer {\n    id\n  }\n"): (typeof documents)["\n  fragment CreateFragment on StripeCustomer {\n    id\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation createStripeCustomer($data: CreateStripeCustomerInput) {\n        createStripeCustomer(data: $data) {\n          ...CreateFragment\n        }\n        \n        \n      }\n  "): (typeof documents)["\n      mutation createStripeCustomer($data: CreateStripeCustomerInput) {\n        createStripeCustomer(data: $data) {\n          ...CreateFragment\n        }\n        \n        \n      }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query retrieveStripeCustomer(\n      $data: RetrieveStripeCustomerInput\n    ) {\n      retrieveStripeCustomer(data: $data) {\n        ...RetrieveFragment\n      }\n    }\n\n    \n  "): (typeof documents)["\n    query retrieveStripeCustomer(\n      $data: RetrieveStripeCustomerInput\n    ) {\n      retrieveStripeCustomer(data: $data) {\n        ...RetrieveFragment\n      }\n    }\n\n    \n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query stripeCustomerSearch(\n      $query: String\n    ) {\n      stripeCustomerSearch(query: $query) {\n        id\n        name\n        email\n      }\n    }\n  "): (typeof documents)["\n    query stripeCustomerSearch(\n      $query: String\n    ) {\n      stripeCustomerSearch(query: $query) {\n        id\n        name\n        email\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query fetchRetrieveStripeCustomer(\n      $data: RetrieveStripeCustomerInput\n    ) {\n      retrieveStripeCustomer(data: $data) {\n        id \n        name\n        email\n      }\n    }\n  "): (typeof documents)["\n    query fetchRetrieveStripeCustomer(\n      $data: RetrieveStripeCustomerInput\n    ) {\n      retrieveStripeCustomer(data: $data) {\n        id \n        name\n        email\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query listStripeCustomerPortalConfig(\n    $params: StripeCustomerPortalConfigParamsInput\n  ) {\n    listStripeCustomerPortalConfig(params: $params) {\n      data {\n        id\n        is_default\n        active\n      }\n     \n    }\n  }\n"): (typeof documents)["\n  query listStripeCustomerPortalConfig(\n    $params: StripeCustomerPortalConfigParamsInput\n  ) {\n    listStripeCustomerPortalConfig(params: $params) {\n      data {\n        id\n        is_default\n        active\n      }\n     \n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation createStripeCustomerPortalConfig($data: StripeCustomerPortalConfigInput ) {\n        createStripeCustomerPortalConfig(data: $data) {\n          id\n        }\n      }\n    "): (typeof documents)["\n      mutation createStripeCustomerPortalConfig($data: StripeCustomerPortalConfigInput ) {\n        createStripeCustomerPortalConfig(data: $data) {\n          id\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation createStripeCustomerPortalSession($data: StripeCustomerPortalInput ) {\n      createStripeCustomerPortalSession(data: $data) {\n        id\n        url\n      }\n    }\n  "): (typeof documents)["\n    mutation createStripeCustomerPortalSession($data: StripeCustomerPortalInput ) {\n      createStripeCustomerPortalSession(data: $data) {\n        id\n        url\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation createStripeCustomerPortalSessionSkipAuth($data: StripeCustomerPortalInput) {\n      createStripeCustomerPortalSessionSkipAuth(data: $data) {\n        id\n        url\n      }\n    }\n  "): (typeof documents)["\n    mutation createStripeCustomerPortalSessionSkipAuth($data: StripeCustomerPortalInput) {\n      createStripeCustomerPortalSessionSkipAuth(data: $data) {\n        id\n        url\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      fragment ListFragment on StripeSubscription {\n       id\n       customer\n       status\n      }\n    "): (typeof documents)["\n      fragment ListFragment on StripeSubscription {\n       id\n       customer\n       status\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query listStripeSubscriptions(\n      $data: ListStripeSubscriptionsInput\n    ) {\n      listStripeSubscriptions(data: $data) {\n        ...ListFragment\n      }\n    }\n\n    \n  "): (typeof documents)["\n    query listStripeSubscriptions(\n      $data: ListStripeSubscriptionsInput\n    ) {\n      listStripeSubscriptions(data: $data) {\n        ...ListFragment\n      }\n    }\n\n    \n  "];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;