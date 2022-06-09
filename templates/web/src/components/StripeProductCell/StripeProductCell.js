import {
  StripeProductCard,
  StripeButton,
  useStripeCart,
} from 'redwoodjs-stripe/web'

/*
  Fetches a product by associated price id.
*/

export const QUERY = gql`
  query ProductByPrice($id: ID!) {
    ProductByPrice: productByPrice(id: $id) {
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

export const Success = ({
  ProductByPrice: { name, description, price, id, images },
}) => {
  const { addToCart, clearCart, removeFromCart, editCartItem } = useStripeCart()

  const handleAddToCartButtonClick = () => {
    addToCart({ id: id, name: name, price: price })
  }

  const handleClearCartButtonClick = () => {
    clearCart()
  }

  const handleRemoveFromCartButtonClick = () => {
    removeFromCart(id)
  }

  const handleEditCartItemButtonClick = () => {
    editCartItem(id, { quantity: 100 })
  }

  return (
    <>
      <StripeProductCard name={name}>
        <p>{description}</p>
        <p>{price}</p>
        <img src={images[0]} alt={name} />
        <div>
          <StripeButton onClick={handleAddToCartButtonClick}>
            Add To Cart
          </StripeButton>{' '}
          <StripeButton onClick={handleClearCartButtonClick}>
            Clear Cart
          </StripeButton>{' '}
          <StripeButton onClick={handleRemoveFromCartButtonClick}>
            Remove Item From Cart
          </StripeButton>
          <p>Edits the cart so that the quantity is 100</p>
          <StripeButton onClick={handleEditCartItemButtonClick}>
            Edit Item
          </StripeButton>{' '}
        </div>
      </StripeProductCard>
    </>
  )
}
