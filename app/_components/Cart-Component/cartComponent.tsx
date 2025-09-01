import { CartContext } from "@/app/_context/cart";
import { useContext } from "react";
import CartItem from "../Cart-Item/cartItem";
import { Card, CardContent } from "../ui/card";
import { formatCurrency } from "@/app/_helpers/price";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";

const CartComponent = () => {
  const { products, totalDiscounts, totalPrice, subTotalPrice } =
    useContext(CartContext);
  return (
    <div className="flex h-full flex-col py-5">
      {products.length > 0 ? (
        <>
          <div className="flex-auto space-y-4">
            {products.map((product) => (
              <CartItem key={product.name} cartProduct={product} />
            ))}
          </div>
          <div className="mt-6">
            <Card>
              <CardContent className="space-y-4 p-5">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Subtotal
                  </span>
                  <span className="text-sm font-semibold">
                    {formatCurrency(subTotalPrice)}
                  </span>
                </div>
                <Separator />

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Descontos
                  </span>
                  <span className="text-sm font-semibold">
                    - {formatCurrency(totalDiscounts)}
                  </span>
                </div>
                <Separator />

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Entrega</span>
                  <span className="text-sm font-semibold text-primary">
                    {Number(products?.[0].restaurant.deliveryFee) === 0
                      ? "Grátis"
                      : formatCurrency(
                          Number(products?.[0].restaurant.deliveryFee),
                        )}
                  </span>
                </div>
                <Separator />

                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold">Total</span>
                  <span className="text-sm font-semibold">
                    {formatCurrency(totalPrice)}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
          <Button className="mt-6 w-full">Finalizar pedido</Button>
        </>
      ) : (
        <h2 className="text-left text-xl font-semibold text-primary">
          Carrinho vazio!
        </h2>
      )}
    </div>
  );
};

export default CartComponent;
