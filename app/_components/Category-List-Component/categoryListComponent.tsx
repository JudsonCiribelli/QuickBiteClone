import db from "@/app/_lib/prisma";
import CategoryItem from "../Category-Item/categoryItem";

const CategoryListComponent = async () => {
  const categories = await db.category.findMany({});
  return (
    <div className="grid grid-cols-2 gap-2">
      {categories.map((categorie) => (
        <CategoryItem category={categorie} key={categorie.id} />
      ))}
    </div>
  );
};

export default CategoryListComponent;
