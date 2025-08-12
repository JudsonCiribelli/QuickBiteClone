import db from "@/app/_lib/prisma";

import { notFound } from "next/navigation";
import ProductImage from "./_components/Product-Image/productImage";

import ProductDetails from "./_components/Product-Details/productDetails";

interface ProductsPageProps {
  params: Promise<{ id: string }>;
}

const ProductsPage = async ({ params }: ProductsPageProps) => {
  const { id } = await params;

  const product = await db.product.findUnique({
    where: {
      id: id,
    },
    include: {
      restaurant: true,
    },
  });

  if (!product) {
    return notFound();
  }

  const juices = await db.product.findMany({
    where: {
      category: {
        name: "Sucos",
      },
      restaurant: {
        id: product?.restaurant.id,
      },
    },
    include: {
      restaurant: true,
    },
    take: 5,
  });

  return (
    <div>
      <ProductImage product={product} />
      {/*  */}
      <ProductDetails product={product} complementaryProducts={juices} />
    </div>
  );
};

export default ProductsPage;
