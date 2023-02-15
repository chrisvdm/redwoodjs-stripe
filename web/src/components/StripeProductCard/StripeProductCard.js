import '../styles.css'

export const StripeProductCard = ({ name, children = '' }) => {
return (
    <div className='stripe-product-card'>
      <h3>{name}</h3>
      {children}
    </div>
)}