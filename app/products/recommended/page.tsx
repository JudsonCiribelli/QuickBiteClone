import HeaderComponent from "@/app/_components/Header-Component/headerComponent";
import db from "@/app/_lib/prisma";
import ProductItem from "@/app/_components/Product-Item/productItem";

const RecommendedProducts = async () => {
  const products = await db.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
    take: 20,
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
      <div className="px-5 py-6">
        <h2 className="mb-6 text-lg font-semibold">Productos Recomendados</h2>
        <div className="grid grid-cols-2 gap-6">
          {products.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
};

export default RecommendedProducts;
