import { CartContext } from "@/app/_context/cart";
import { useContext } from "react";
import CartItem from "../Cart-Item/cartItem";

const CartComponent = () => {
  const { products } = useContext(CartContext);
  return (
    <div className="py-5">
      <div className="space-y-4">
        {products.map((product) => (
          <CartItem key={product.name} cartProduct={product} />
        ))}
      </div>
    </div>
  );
};

export default CartComponent;
