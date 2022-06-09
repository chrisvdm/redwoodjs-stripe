import { StripeButton, useStripeCart } from 'redwoodjs-stripe/web'
import './styles.css'
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
      images
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
    <ul className="rws-products__list">
      {products.map((product) => {
        return (
          <li
            className="rws-products__list__item"
            key={`stripe-products-cell-${product.id}`}
          >
            <Product {...product} />
          </li>
        )
      })}
    </ul>
  )
}

const Product = ({ name, description, price, id }) => {
  const { addToCart } = useStripeCart()

  const onAddToCartButtonClick = (item) => {
    addToCart(item)
  }
  return (
    <>
      <div>
        <h3>{name}</h3>
        <p>{description}</p>
        <p>
          {(price / 100).toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
          })}
        </p>
      </div>

      <StripeButton
        onClick={() =>
          onAddToCartButtonClick({ name: name, id: id, price: price })
        }
      >
        Add to Cart
      </StripeButton>
    </>
  )
}
