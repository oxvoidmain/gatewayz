
"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import Link from 'next/link';
import { ThemeToggle } from "@/components/theme-toggle";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { usePrivy } from '@privy-io/react-auth';
import { UserNav } from './user-nav';
import { SearchBar } from './search-bar';

export function AppHeader() {
  const { user, login, getAccessToken } = usePrivy();

  useEffect(() => {
    const get = async () => {
      if(user) {
        const token = await getAccessToken();
        console.log({user});
        console.log({token});
      }
    }
    get();
  }, [user])

  return (
    <header className="sticky top-0 z-50 w-full h-[65px] border-b bg-header flex items-center">
      <div className="container flex h-14 max-w-screen-2xl items-center px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="flex items-center mr-auto">
          <Link href="/" className="flex items-center space-x-2 w-[45px] h-[45px] shrink-0">
            <img src="/logo_black.svg" alt="Gatewayz" className="w-[45px] h-[45px] object-contain" />
          </Link>
           <div className="relative hidden sm:block w-full max-w-sm pl-6">
             <SearchBar />
           </div>
        </div>
        
        <div className="flex items-center gap-4">
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link href="/models" className="transition-colors hover:text-foreground/80 ">Models</Link>
            <Link href="/chat" className="transition-colors hover:text-foreground/80 ">Chat</Link>
            <Link href="/developers" className="transition-colors hover:text-foreground/80 ">Developers</Link>
            <Link href="/rankings" className="transition-colors hover:text-foreground/80 ">Ranking</Link>
          </nav>
          <div className="hidden md:flex items-center gap-2">
            {user ? (
              <UserNav user={user} />
            ) : (
              // <Link href="/signin">
                <Button variant="outline" onClick={() => login()}>Sign In</Button>
              // </Link>
            )}
            <ThemeToggle />
          </div>
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="p-4">
                  <nav className="flex flex-col gap-4 text-lg">
                    <Link href="/models" className="transition-colors hover:text-foreground/80 text-foreground/60">Models</Link>
                    <Link href="/chat" className="transition-colors hover:text-foreground/80 text-foreground/60">Chat</Link>
                    <Link href="/developers" className="transition-colors hover:text-foreground/80 text-foreground/60">Developers</Link>
                    <Link href="/rankings" className="transition-colors hover:text-foreground/80 text-foreground/60">Ranking</Link>
                  </nav>
                  <div className="mt-6 flex flex-col gap-2">
                    {user ? (
                       <UserNav user={user} />
                    ) : (
                       <Link href="/signin">
                         <Button variant="outline" className="w-full">Sign In</Button>
                       </Link>
                    )}
                     <ThemeToggle />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
