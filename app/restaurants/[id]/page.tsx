import db from "@/app/_lib/prisma";
import { notFound } from "next/navigation";
import RestaurantImage from "./_components/Restaurant-Image/restaurantImage";
import Image from "next/image";
import { StarIcon } from "lucide-react";
import DeliveryInfo from "@/app/_components/Delivery-Info/deliveryInfo";
import ProductListComponent from "@/app/_components/Product-List-Component/productListComponent";
import CartBanner from "./_components/Cart-Banner/cartBanner";
interface RestaurantPageProps {
  params: Promise<{ id: string }>;
}

const RestaurantPage = async ({ params }: RestaurantPageProps) => {
  const { id } = await params;

  const restaurant = await db.restaurant.findUnique({
    where: {
      id: id,
    },
    include: {
      categories: {
        orderBy: {
          createdAt: "desc",
        },
        include: {
          products: {
            where: {
              restaurantId: id,
            },
            include: {
              restaurant: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
      products: {
        take: 10,
        include: {
          restaurant: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  if (!restaurant) {
    return notFound();
  }

  return (
    <div>
      <RestaurantImage restaurant={restaurant} />
      {/* <RestaurantDetails restaurant={restaurant} /> */}
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
                <StarIcon
                  size={12}
                  className="fill-yellow-400 text-yellow-400"
                />
                <span className="text-sm font-semibold text-white">5.0</span>
              </div>
            </div>
          </div>
          {/* Tempo + Entrega */}
          <div className="px-5">
            <DeliveryInfo restaurant={restaurant} />
          </div>
          {/* Categoria */}

          <div className="mt-4 flex gap-4 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
            {restaurant.categories.map((category) => (
              <div
                className="min-W-[167px] rounded-lg bg-[#F4F4F4] px-8 py-2 text-center"
                key={category.id}
              >
                <span className="text-xs text-muted-foreground">
                  {category.name}
                </span>
              </div>
            ))}
          </div>

          {/* Mais pedidos */}
          <div className="mt-6 space-y-4">
            {/* Produto mais pedidos */}
            <h2 className="font-semibold">Mais Pedidos</h2>
            <ProductListComponent products={restaurant.products} />
          </div>
        </div>
        {restaurant.categories.map((category) => (
          <div key={category.id} className="mt-6 space-y-4">
            {/* Produto mais pedidos */}
            <h2 className="font-semibold">{category.name}</h2>
            <ProductListComponent products={category.products} />
          </div>
        ))}
      </div>
      <CartBanner restaurant={restaurant} />
    </div>
  );
};

export default RestaurantPage;
