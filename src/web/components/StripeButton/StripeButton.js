import './styles.css'

export const StripeButton = ({ children, ...restArgs }) => {
  return (
    <button className="stripe-button" {...restArgs}>
      {children}
    </button>
  )
}
