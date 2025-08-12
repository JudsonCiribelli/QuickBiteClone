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

  const juices = await db.product.findMany({
    where: {
      category: {
        name: "Sucos",
      },
    },
    include: {
      restaurant: true,
    },
    take: 5,
  });

  if (!product) {
    return notFound();
  }

  return (
    <div>
      <ProductImage product={product} />
      {/*  */}
      <ProductDetails product={product} complementaryProducts={juices} />
    </div>
  );
};

export default ProductsPage;
