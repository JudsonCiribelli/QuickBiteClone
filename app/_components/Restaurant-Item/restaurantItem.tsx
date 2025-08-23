import { formatCurrency } from "@/app/_helpers/price";
import { Restaurant } from "@/app/generated/prisma";
import { BikeIcon, ClockIcon, HeartIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { cn } from "@/app/_lib/utils";

interface RestaurantItemProsp {
  restaurant: Restaurant;
  className?: string;
}
const RestaurantItem = ({ restaurant, className }: RestaurantItemProsp) => {
  return (
    <Link href={`/restaurants/${restaurant.id}`} className="space-y-2">
      <div className={cn("min-w-[266px] max-w-[266px]", className)}>
        {/* Image */}
        <div className="relative h-[136px] w-full">
          <Image
            src={restaurant.imageUrl}
            alt={restaurant.name}
            fill
            className="rounded-lg object-cover"
          />

          <div className="absolute left-2 top-2 flex items-center gap-[2px] rounded-xl bg-white px-2 py-[2px]">
            <StarIcon size={12} className="fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-semibold">5.0</span>
          </div>

          <Button
            size="icon"
            className="absolute right-2 top-2 h-7 w-7 rounded-full bg-slate-600"
          >
            <HeartIcon size={12} className="fill-white text-white" />
          </Button>
        </div>

        {/* Texto */}
        <div>
          <h3 className="text-sm font-semibold">{restaurant.name}</h3>
          <div className="flex gap-3">
            {/* Entrega */}
            <div className="flex items-center gap-2">
              <BikeIcon size={15} className="text-primary" />
              <span className="text-xs text-muted-foreground">
                {Number(restaurant.deliveryFee) === 0
                  ? "Entrega grátis"
                  : formatCurrency(Number(restaurant.deliveryFee))}
              </span>
            </div>
            {/* Tempo de entrega */}
            <div className="items-center1 flex gap-1">
              <ClockIcon size={15} className="text-primary" />
              <span className="text-xs text-muted-foreground">
                {restaurant.deliveryTimeMinutes} min
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantItem;
