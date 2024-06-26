import { StripeProvider } from "@redwoodjs-stripe/web";

const MainLayout = ({ children }) => {
  return (
    <>
      <StripeProvider>{children}</StripeProvider>
    </>
  );
};

export default MainLayout;
