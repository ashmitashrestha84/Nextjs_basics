import CartProvider from "./cart.provider";
import ReactQueryClientProvider from "./queryclient.provider";
import WishlistProvider from "./wishlist.provider";

const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReactQueryClientProvider>
      <WishlistProvider>
        <CartProvider>{children}</CartProvider>
      </WishlistProvider>
    </ReactQueryClientProvider>
  );
};

export default Provider;
