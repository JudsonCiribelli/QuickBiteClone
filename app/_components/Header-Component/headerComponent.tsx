import Image from "next/image";
import { Button } from "../ui/button";
import { MenuIcon } from "lucide-react";

const HeaderComponent = () => {
  return (
    <header className="flex justify-between px-4 pt-6">
      <Image src="/logo.png" width={120} height={30} alt="logo" />
      <Button variant="secondary" size="icon">
        <MenuIcon />
      </Button>
    </header>
  );
};

export default HeaderComponent;
