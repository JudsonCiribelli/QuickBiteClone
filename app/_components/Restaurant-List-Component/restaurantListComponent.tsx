import db from "@/app/_lib/prisma";
import RestaurantItem from "../Restaurant-Item/restaurantItem";

const RestaurantListComponent = async () => {
  const restaurants = await db.restaurant.findMany({ take: 10 });
  return (
    <div className="flex gap-4 overflow-scroll px-5 [&::-webkit-scrollbar]:hidden">
      {restaurants.map((restaurant) => (
        <RestaurantItem restaurant={restaurant} key={restaurant.id} />
      ))}
    </div>
  );
};

export default RestaurantListComponent;
