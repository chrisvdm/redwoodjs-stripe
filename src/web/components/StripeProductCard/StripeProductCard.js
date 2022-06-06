import { StripeButton } from "../StripeButton/StripeButton"

export const StripeProductCard = ({ name, children = '' }) => {
    const handleOnStripeButtonAddToCartClick = () => {
        console.log(`Adding product id ${id} to`)
    }
    
    return (
    <div style={productCardStyle}>
      <h3>{name}</h3>
      {children}
    </div>
)}

const productCardStyle = {
    padding: '10px 20px',
  borderRadius: '5px',
  backgroundColor: '#fff',
  color: '#3a444a',
  boxShadow: '2px 2px #dcdbdb',
    fontStyle: 'normal',
}