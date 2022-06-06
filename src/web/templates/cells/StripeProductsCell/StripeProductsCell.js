import { StripeProductCard } from 'redwoodjs-stripe/web'
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
    <ul style={productCardListStyle}>
      {products.map(({ id, name, description, price }) => {
        return (
          <li
            style={productCardListItemStyle}
            key={`stripe-products-cell-${id}`}
          >
            <StripeProductCard name={name}>
              <p>{description}</p>
              <p>{price}</p>
            </StripeProductCard>
          </li>
        )
      })}
    </ul>
  )
}
const productCardListStyle = {
  listStyle: 'none',
  padding: '0',
  display: 'flex',
  gap: '20px',
}

const productCardListItemStyle = {
  minWidth: '200px',
}
