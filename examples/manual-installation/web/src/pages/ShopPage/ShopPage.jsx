import { useStripeCart } from "@redwoodjs-stripe/web";

import { Metadata } from "@redwoodjs/web";

const ShopPage = () => {
  const { cart, addToCart } = useStripeCart();
  console.log("uber cart:", cart);

  const buttonClicked = async () => {
    await addToCart({ id: "price34235" });
    console.log(cart);
  };

  return (
    <>
      <Metadata title="Shop" description="Shop page" />

      <h1>ShopPage</h1>
      <article>
        <button onClick={buttonClicked}>Add to Cart</button>
      </article>
    </>
  );
};

export default ShopPage;
