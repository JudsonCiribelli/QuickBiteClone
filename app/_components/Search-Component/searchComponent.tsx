import { SearchIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const SearchComponent = () => {
  return (
    <div className="flex gap-2">
      <Input
        type="text"
        placeholder="Buscar Restaurante"
        className="border-none bg-slate-100"
      />
      <Button>
        <SearchIcon size={16} />
      </Button>
    </div>
  );
};

export default SearchComponent;
