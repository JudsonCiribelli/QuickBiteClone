"use client";
import DiscountBadgeComponent from "@/app/_components/Discount-Badge-Component/discountBadgeComponent";
import ProductListComponent from "@/app/_components/Product-List-Component/productListComponent";
import { Button } from "@/app/_components/ui/button";
import { Card } from "@/app/_components/ui/card";
import {
  calculateProductTotalPrice,
  formatCurrency,
} from "@/app/_helpers/price";
import { Prisma } from "@/app/generated/prisma";
import {
  BikeIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ClockIcon,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface ProductDetailsProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: true;
    };
  }>;
  complementaryProducts: Prisma.ProductGetPayload<{
    include: {
      restaurant: true;
    };
  }>[];
}
const ProductDetails = ({
  product,
  complementaryProducts,
}: ProductDetailsProps) => {
  const [quantity, setQuantity] = useState(1);

  const handleIncreaseQuantity = () => {
    setQuantity((currencyState) => currencyState + 1);
  };

  const handleDecreaseQuantity = () => {
    setQuantity((currencyState) => {
      if (currencyState === 1) {
        return 1;
      }
      return currencyState - 1;
    });
  };

  return (
    <div className="p-5">
      {/* Restaurante */}
      <div className="flex items-center gap-1">
        <div className="relative h-6 w-6">
          <Image
            src={product.restaurant.imageUrl}
            alt={product.restaurant.name}
            fill
            className="rounded-full object-cover"
          />
        </div>
        <span className="text-xs text-muted-foreground">
          {product.restaurant.name}
        </span>
      </div>

      {/* Titulo / nome do produto */}

      <h1 className="mb-2 mt-1 text-xl font-semibold">{product.name}</h1>
      {/* Valor do produto */}
      <div className="flex justify-between">
        <div>
          <div className="flex items-center gap-1">
            <h2 className="text-xl font-semibold">
              {formatCurrency(calculateProductTotalPrice(product))}
            </h2>
            {product.discountPercentage && (
              <DiscountBadgeComponent product={product} />
            )}
          </div>
          {product.discountPercentage > 0 && (
            <p className="text-sm text-muted-foreground">
              De: {formatCurrency(Number(product.price))}
            </p>
          )}
        </div>
        {/* Botoes */}
        <div className="flex items-center gap-3 text-center">
          <Button
            size="icon"
            variant="ghost"
            className="border border-solid border-muted-foreground"
            onClick={handleDecreaseQuantity}
          >
            <ChevronLeftIcon />
          </Button>
          <span className="w-4">{quantity}</span>
          <Button size="icon" onClick={handleIncreaseQuantity}>
            <ChevronRightIcon />
          </Button>
        </div>
      </div>
      {/* Entrega */}
      <Card className="mt-6 flex items-center justify-around py-3">
        {/* Esquerda */}
        <div className="items-center">
          <div className="flex items-center gap-1">
            <span className="text-sm text-muted-foreground">Entrega</span>
            <BikeIcon className="text-muted-foreground" size={14} />
          </div>
          {Number(product.restaurant.deliveryFee) > 0 ? (
            <p className="text-sm font-semibold">
              {formatCurrency(Number(product.restaurant.deliveryFee))}
            </p>
          ) : (
            <p className="text-sm">Grátis</p>
          )}
        </div>
        {/* Direita */}
        <div className="items-center">
          <div className="flex items-center gap-1">
            <span className="text-sm text-muted-foreground">Entrega</span>
            <ClockIcon size={14} className="text-bold text-muted-foreground" />
          </div>
          <p className="text-sm font-semibold">
            {product.restaurant.deliveryTimeMinutes} min
          </p>
        </div>
      </Card>

      <div className="mt-6 space-y-2">
        <h3 className="text-lg font-semibold">Sobre</h3>
        <p className="text-xs text-muted-foreground">{product.description}</p>
      </div>

      <div className="mb-3 mt-6 space-y-2">
        <h3 className="text-lg font-semibold">Sucos</h3>
        <ProductListComponent products={complementaryProducts} />
      </div>
    </div>
  );
};

export default ProductDetails;
