import HeaderComponent from "@/app/_components/Header-Component/headerComponent";
import RestaurantItem from "@/app/_components/Restaurant-Item/restaurantItem";
import db from "@/app/_lib/prisma";

const RecommendedRestaurant = async () => {
  const restaurants = await db.restaurant.findMany({});
  return (
    <>
      <HeaderComponent />
      <div className="px-5 py-6">
        <h2 className="mb-6 text-lg font-semibold">
          Restaurantes Recomendados
        </h2>
        <div className="flex w-full flex-col gap-6">
          {restaurants.map((restaurant) => (
            <RestaurantItem
              key={restaurant.id}
              restaurant={restaurant}
              className="min-w-full max-w-full"
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default RecommendedRestaurant;
