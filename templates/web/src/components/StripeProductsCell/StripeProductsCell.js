import { useStripeCart } from 'redwoodjs-stripe/web'
import { Icon } from './Icon'
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

const Product = ({ name, price, id, images, type }) => {
  const { addToCart } = useStripeCart()

  const onAddToCartButtonClick = (item) => {
    addToCart(item)
  }
  return (
    <>
      <div className="rws-product">
        <img className="rws-product__img" src={images[0]} alt="" />
        <div className="rws-product__data">
          <div className="rws-product__text-wrapper">
            <p className="rws-product__text">{name}</p>
            <p className="rws-product__text">
              {(price / 100).toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
              })}
            </p>
          </div>

          <button
            className="rws-button"
            onClick={() =>
              onAddToCartButtonClick({
                name: name,
                id: id,
                price: price,
                type: type,
              })
            }
          >
            <Icon name="plus" />
          </button>
        </div>
      </div>
    </>
  )
}
