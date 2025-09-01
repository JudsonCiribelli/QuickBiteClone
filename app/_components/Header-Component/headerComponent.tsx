"use client";
import Image from "next/image";
import { Button } from "../ui/button";
import {
  HeartIcon,
  HomeIcon,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
  ScrollTextIcon,
} from "lucide-react";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

import { Avatar, AvatarFallback } from "../ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Separator } from "../ui/separator";

const HeaderComponent = () => {
  const { data: session } = useSession();

  const handleSignOutUser = () => {
    signOut();
  };
  const handleSignInUser = () => {
    signIn();
  };

  return (
    <Link href="/">
      <header className="flex justify-between px-4 pt-6">
        <Image src="/logo.png" width={120} height={30} alt="logo" />
        <Sheet>
          <SheetTrigger>
            <Button variant="secondary" size="icon">
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle className="text-left">Menu</SheetTitle>
            </SheetHeader>

            {session?.user ? (
              <>
                <div className="flex justify-between pt-6">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={session?.user?.image} />
                      <AvatarFallback>
                        {session?.user?.name?.split(" ")[0][0]}
                        {session?.user?.name?.split(" ")[1][0]}
                      </AvatarFallback>
                    </Avatar>

                    <div>
                      <h3 className="text-sm font-semibold">
                        {session?.user?.name}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {session?.user?.email}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center justify-between pt-8">
                  <h2 className="text-lg font-semibold">Olá, faça seu login</h2>
                  <Button size="icon" onClick={handleSignInUser}>
                    <LogInIcon />
                  </Button>
                </div>
              </>
            )}

            <div className="py-4">
              <Separator />
            </div>

            {session?.user && (
              <>
                <div className="space-y-2">
                  <Button className="w-full justify-start space-x-2 rounded-full text-sm">
                    <HomeIcon />
                    <span className="block">Início</span>
                  </Button>

                  <Button
                    variant="ghost"
                    className="w-full justify-start space-x-2 rounded-full text-sm"
                  >
                    <ScrollTextIcon />
                    <span className="block">Meus pedidos</span>
                  </Button>

                  <Button
                    variant="ghost"
                    className="w-full justify-start space-x-2 rounded-full text-sm"
                  >
                    <HeartIcon />
                    <span className="block">Restaurantes favoritos</span>
                  </Button>
                </div>

                <div className="py-4">
                  <Separator />
                </div>
              </>
            )}

            {session?.user && (
              <Button
                onClick={handleSignOutUser}
                variant="ghost"
                className="w-full justify-start space-x-2 rounded-full text-sm"
              >
                <LogOutIcon />
                Sair da conta
              </Button>
            )}
          </SheetContent>
        </Sheet>
      </header>
    </Link>
  );
};

export default HeaderComponent;
