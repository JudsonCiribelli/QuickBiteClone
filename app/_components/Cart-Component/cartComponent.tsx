import { CartContext } from "@/app/_context/cart";
import { useContext, useState } from "react";
import CartItem from "../Cart-Item/cartItem";
import { Card, CardContent } from "../ui/card";
import { formatCurrency } from "@/app/_helpers/price";
import { toast } from "sonner";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { createOrder } from "@/app/_actions/order";
import { OrderStatus } from "@/app/generated/prisma";
import { useSession } from "next-auth/react";
import { Loader2, Loader2Icon } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { useRouter } from "next/navigation";

interface CartProps {
  setIsOpen: (isOpen: boolean) => void;
}

const CartComponent = ({ setIsOpen }: CartProps) => {
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);

  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

  const { products, totalDiscounts, totalPrice, subtotalPrice, clearCart } =
    useContext(CartContext);

  const { data } = useSession();

  const router = useRouter();

  const handleFinishOrderClick = async () => {
    if (!data?.user) return;
    const restaurant = products[0].restaurant;

    try {
      setIsSubmitLoading(true);
      await createOrder({
        subtotalPrice,
        totalDiscounts,
        totalPrice,
        deliveryFee: restaurant.deliveryFee,
        deliveryTimeMinutes: restaurant.deliveryTimeMinutes,
        restaurant: {
          connect: { id: restaurant.id },
        },
        status: OrderStatus.CONFIRMED,
        user: {
          connect: { id: data.user.id },
        },
        products: {
          createMany: {
            data: products.map((product) => ({
              productId: product.id,
              quantity: product.quantity,
            })),
          },
        },
      });
      clearCart();
      setIsOpen(false);
      toast("Pedido finalizado com sucesso!", {
        description: "Você pode acompanhá-lo na tela dos seus pedidos!",
        action: {
          label: "Meus pedidos",
          onClick: () => router.push("/my-orders"),
        },
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitLoading(false);
    }
  };

  return (
    <>
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
                      {formatCurrency(subtotalPrice)}
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
                    <span className="text-sm text-muted-foreground">
                      Entrega
                    </span>
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
            <Button
              className="mt-6 w-full"
              onClick={() => setIsConfirmDialogOpen(true)}
              disabled={isSubmitLoading}
            >
              {isSubmitLoading && <Loader2Icon className="animate-spin" />}
              Finalizar pedido
            </Button>
          </>
        ) : (
          <h2 className="text-left text-xl font-semibold text-primary">
            Carrinho vazio!
          </h2>
        )}
      </div>

      <AlertDialog
        open={isConfirmDialogOpen}
        onOpenChange={setIsConfirmDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Deseja finalizar seu pedido?</AlertDialogTitle>
            <AlertDialogDescription>
              Ao finalizar seu pedido, você concorda com os termos e condições
              da nossa plataforma.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleFinishOrderClick}
              disabled={isSubmitLoading}
            >
              {isSubmitLoading && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Finalizar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default CartComponent;
