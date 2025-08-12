import ProductItem from "../Product-Item/productItem";
import { Prisma } from "@/app/generated/prisma";

interface ProductListProps {
  products: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true;
        };
      };
    };
  }>[];
}
const ProductListComponent = ({ products }: ProductListProps) => {
  return (
    <div className="flex gap-4 overflow-scroll px-5 [&::-webkit-scrollbar]:hidden">
      {products.map((product) => (
        <ProductItem product={product} key={product.id} />
      ))}
    </div>
  );
};

export default ProductListComponent;
