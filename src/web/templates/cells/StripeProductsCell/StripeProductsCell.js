/*
  Fetches an array of products and their prices filtered via params.
  Available params can be found in Stripe API documentation (https://stripe.com/docs/api/products/list)

  Example for fetching active products with one-time prices
  params: {
    productParams: {
      active: true
    },
    priceParams: {
      type: 'one_time'
    }
  }
*/

export const QUERY = gql`
  query Products($params: StripeProductsParamsInput) {
    products(params: $params) {
      id
      name
      description
      image
      price
      type
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ products }) => {
  return (
    <ul>
      {products.map((item) => {
        return <li key={item.id}>{JSON.stringify(item)}</li>
      })}
    </ul>
  )
}
