import { Product } from "@/app/generated/prisma";
import { ArrowDownIcon } from "lucide-react";

interface DiscountBadgeProps {
  product: Pick<Product, "discountPercentage">;
}

const DiscountBadgeComponent = ({ product }: DiscountBadgeProps) => {
  return (
    <div className="flex items-center gap-2 rounded-xl bg-primary px-2 text-white">
      <ArrowDownIcon size={14} />
      <span className="text-xs font-semibold">
        {product.discountPercentage}%
      </span>
    </div>
  );
};

export default DiscountBadgeComponent;
