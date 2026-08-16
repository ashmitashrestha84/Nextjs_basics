import AuthProvider from "./auth.provider";
import CartProvider from "./cart.provider";
import ReactQueryClientProvider from "./queryclient.provider";
import WishlistProvider from "./wishlist.provider";

const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReactQueryClientProvider>
        <AuthProvider>
      <WishlistProvider>
        <CartProvider>{children}</CartProvider>
      </WishlistProvider>
      </AuthProvider>
    </ReactQueryClientProvider>
  );
};

export default Provider;
