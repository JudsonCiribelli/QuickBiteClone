import CategoryListComponent from "./_components/Category-List-Component/categoryListComponent";
import HeaderComponent from "./_components/Header-Component/headerComponent";
import SearchComponent from "./_components/Search-Component/searchComponent";
import ProductListComponent from "./_components/Product-List-Component/productListComponent";
import { Button } from "./_components/ui/button";
import { ChevronRightIcon } from "lucide-react";
import db from "./_lib/prisma";
import PromoBanner from "./_components/Promo-Banner/promoBanner";
import RestaurantListComponent from "./_components/Restaurant-List-Component/restaurantListComponent";

const Home = async () => {
  const products = await db.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
    take: 10,
    include: {
      restaurant: {
        select: {
          name: true,
        },
      },
    },
  });
  return (
    <>
      <HeaderComponent />

      <div className="px-5 pt-6">
        <SearchComponent />
      </div>

      <div className="px-5 pt-6">
        <CategoryListComponent />
      </div>

      <div className="px-5 pt-6">
        <PromoBanner alt="ate 30% de descontos em pizzas" src="/Banner.png" />
      </div>

      <div className="space-y-4 pt-6">
        <div className="flex items-center justify-between px-5">
          <h2 className="font-semibold">Pedidos Recomendados</h2>
          <Button
            variant="ghost"
            className="h-fit p-0 font-semibold text-primary hover:bg-transparent"
          >
            Ver Todos
            <ChevronRightIcon size={16} />
          </Button>
        </div>
        <ProductListComponent products={products} />
      </div>

      <div className="px-5 pt-6">
        <PromoBanner alt="Lanches a partir de 17,90" src="/Banner2.png" />
      </div>

      <div className="space-y-4 py-6">
        <div className="flex items-center justify-between px-5">
          <h2 className="font-semibold">Restaurantes Recomendados</h2>
          <Button
            variant="ghost"
            className="h-fit p-0 font-semibold text-primary hover:bg-transparent"
          >
            Ver Todos
            <ChevronRightIcon size={16} />
          </Button>
        </div>
        <RestaurantListComponent />
      </div>
    </>
  );
};
export default Home;
