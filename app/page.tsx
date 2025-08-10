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
    </>
  );
};
export default Home;
