import Image from "next/image";
import CategoryListComponent from "./_components/Category-List-Component/categoryListComponent";
import HeaderComponent from "./_components/Header-Component/headerComponent";
import SearchComponent from "./_components/Search-Component/searchComponent";

const Home = () => {
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
        <Image
          src="/Banner.png"
          alt="até 30% de descontos em pizza"
          height={0}
          width={0}
          className="h-auto w-full object-contain"
          sizes="100vw"
          quality={100}
        />
      </div>
    </>
  );
};
export default Home;
