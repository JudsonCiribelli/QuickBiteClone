"use client";
import { SearchIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import React, { FormEventHandler, useState } from "react";
import { useRouter } from "next/navigation";

const SearchComponent = () => {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!search) {
      return;
    }
    router.push(`/restaurants?search=${search}`);
  };

  return (
    <form className="flex gap-2" onSubmit={handleSearchSubmit}>
      <Input
        type="text"
        value={search}
        onChange={handleSearch}
        placeholder="Buscar Restaurante"
        className="border-none bg-slate-100"
      />
      <Button type="submit">
        <SearchIcon size={16} />
      </Button>
    </form>
  );
};

export default SearchComponent;
