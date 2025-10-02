"use client";
import { Avatar, AvatarImage } from "@/app/_components/ui/avatar";
import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Separator } from "@/app/_components/ui/separator";
import { CartContext } from "@/app/_context/cart";
import { formatCurrency } from "@/app/_helpers/price";
import { OrderStatus, Prisma } from "@/app/generated/prisma";
import { CircleChevronRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext } from "react";

interface OrderItemComponentProps {
  order: Prisma.OrderGetPayload<{
    include: {
      restaurant: true;
      products: {
        include: {
          product: true;
        };
      };
    };
  }>;
}

const getOrderStatusLabel = (status: OrderStatus) => {
  switch (status) {
    case "CANCELED":
      return "Cancelado";
    case "COMPLETED":
      return "Finalizado";
    case "CONFIRMED":
      return "Confirmado";
    case "DELIVERING":
      return "A caminho";
    case "PREPARING":
      return "Em preparo";
  }
};

const OrderItemComponent = ({ order }: OrderItemComponentProps) => {
  const { handleAddProductToCart } = useContext(CartContext);
  const router = useRouter();

  const handleRedoOrderClick = () => {
    for (const orderProduct of order.products) {
      handleAddProductToCart({
        product: { ...orderProduct.product, restaurant: order.restaurant },
        quantity: orderProduct.quantity,
      });
    }
    router.push(`/restaurants/${order.restaurantId}`);
  };

  return (
    <Card>
      <CardContent className="p-5">
        <div
          className={`w-fit rounded-full bg-[#EEEEEE] px-2 py-1 text-muted-foreground ${order.status !== "COMPLETED" && "bg-green-400 text-white"}`}
        >
          <span className="block text-xs font-semibold">
            {getOrderStatusLabel(order.status)}
          </span>
        </div>

        <div className="flex items-center justify-between pt-3">
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={order.restaurant.imageUrl} />
            </Avatar>

            <p className="text-xs font-semibold">{order.restaurant.name}</p>
          </div>

          <Button variant="ghost" size="icon" className="h-7 w-7" asChild>
            <Link href={`/restaurants/${order.restaurant.id}`}>
              <CircleChevronRight />
            </Link>
          </Button>
        </div>

        <div className="py-2">
          <Separator />
        </div>

        <div className="space-y-2">
          {order.products.map((product) => (
            <div className="flex items-center gap-2" key={product.id}>
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-muted-foreground">
                <span className="block text-xs text-white">
                  {product.quantity}
                </span>
              </div>
              <span className="text-xs text-muted-foreground">
                {product.product.name}
              </span>
            </div>
          ))}
        </div>

        <div className="py-2">
          <Separator />
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold">
            {formatCurrency(Number(order.totalPrice))}
          </p>

          <Button
            onClick={handleRedoOrderClick}
            variant="ghost"
            className="text-xs text-primary"
            disabled={order.status !== "COMPLETED"}
          >
            Refazer pedido
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderItemComponent;
