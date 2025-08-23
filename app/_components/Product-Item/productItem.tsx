import {
  calculateProductTotalPrice,
  formatCurrency,
} from "@/app/_helpers/price";
import { cn } from "@/app/_lib/utils";
import { Prisma } from "@/app/generated/prisma";
import { ArrowDownIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ProductItemProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true;
        };
      };
    };
  }>;
  className?: string;
}

const ProductItem = ({ product, className }: ProductItemProps) => {
  return (
    <Link
      href={`/products/${product.id}`}
      className={cn("w-[150px] min-w-[150px]", className)}
    >
      <div className="w-full space-y-2">
        <div className="relative aspect-square w-full">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="rounded-lg object-cover shadow-md"
          />

          {product.discountPercentage && (
            <div className="absolute left-2 top-2 flex items-center gap-[2px] rounded-xl bg-primary px-2 py-[2px] text-white">
              <ArrowDownIcon size={12} />
              <span className="text-xs font-semibold">
                {product.discountPercentage}%
              </span>
            </div>
          )}
        </div>

        <div>
          <h2 className="truncate text-sm font-normal">{product.name}</h2>
          <div className="flex items-center gap-1">
            <h1 className="font-semibold">
              {formatCurrency(Number(calculateProductTotalPrice(product)))}
            </h1>
            {product.discountPercentage > 0 && (
              <span className="text-sm text-muted-foreground line-through">
                {formatCurrency(Number(product.price))}
              </span>
            )}
          </div>
          <h3 className="block text-sm text-muted-foreground">
            {product.restaurant.name}
          </h3>
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;
