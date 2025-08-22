"use client";
import { Button } from "@/app/_components/ui/button";
import { Restaurant } from "@/app/generated/prisma";
import { ChevronLeftIcon, HeartIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
interface RestaurantImageProps {
  restaurant: Pick<Restaurant, "name" | "imageUrl">;
}

const RestaurantImage = ({ restaurant }: RestaurantImageProps) => {
  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  };
  return (
    <div className="relative h-[260px] w-full">
      <Image
        src={restaurant.imageUrl}
        alt={restaurant.name}
        fill
        className="object-cover"
      />
      <Button
        onClick={handleBackClick}
        size="icon"
        className="absolute left-4 top-4 rounded-full bg-white text-foreground hover:text-white"
      >
        <ChevronLeftIcon size={20} />
      </Button>
      <Button
        size="icon"
        className="absolute right-4 top-4 rounded-full bg-slate-800"
      >
        <HeartIcon size={20} className="fill-white" />
      </Button>
    </div>
  );
};

export default RestaurantImage;
