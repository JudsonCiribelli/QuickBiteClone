import { Card } from "@/app/_components/ui/card";
import { formatCurrency } from "@/app/_helpers/price";
import { Restaurant } from "@/app/generated/prisma";
import { BikeIcon, ClockIcon, StarIcon } from "lucide-react";
import Image from "next/image";

interface RestaurantDetailsProps {
  restaurant: Restaurant;
}
const RestaurantDetails = ({ restaurant }: RestaurantDetailsProps) => {
  return (
    <div className="relative z-50 mt-[-1.5rem] rounded-tl-3xl rounded-tr-3xl bg-white p-5">
      {/* HEADERS */}
      <div className="space-y-6">
        {/* Nome + Avaliação */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <div className="relative h-14 w-14">
              <Image
                src={restaurant.imageUrl}
                alt={restaurant.name}
                className="rounded-full object-cover"
                fill
              />
            </div>
            <h2 className="text-xl font-semibold">{restaurant.name}</h2>
          </div>
          <div>
            <div className="flex items-center gap-[2px] rounded-xl bg-slate-800 px-3 py-[5px]">
              <StarIcon size={12} className="fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-semibold text-white">5.0</span>
            </div>
          </div>
        </div>
        {/* Tempo + Entrega */}
        <Card className="mt-6 flex items-center justify-around py-3">
          {/* Esquerda */}
          <div className="items-center text-center">
            <div className="flex items-center gap-1">
              <span className="text-sm text-muted-foreground">Entrega</span>
              <BikeIcon className="text-muted-foreground" size={14} />
            </div>
            {Number(restaurant.deliveryFee) > 0 ? (
              <p className="text-sm font-semibold">
                {formatCurrency(Number(restaurant.deliveryFee))}
              </p>
            ) : (
              <p className="text-sm">Grátis</p>
            )}
          </div>
          {/* Direita */}
          <div className="items-center text-center">
            <div className="flex items-center gap-1">
              <span className="text-sm text-muted-foreground">Entrega</span>
              <ClockIcon
                size={14}
                className="text-bold text-muted-foreground"
              />
            </div>
            <p className="text-sm font-semibold">
              {restaurant.deliveryTimeMinutes} min
            </p>
          </div>
        </Card>
        {/* Categoria */}
        <div>
          <div></div>
        </div>
        {/* Mais pedidos */}
      </div>
    </div>
  );
};

export default RestaurantDetails;
