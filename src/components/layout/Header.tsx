
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Car, Wrench, User, CircleDot, Menu, Database, HelpCircle, Flame, Droplets, Palette } from "lucide-react";
import { useUser } from "@/firebase/auth/use-user";
import { Skeleton } from "../ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { useAuth } from "@/firebase";
import { useToast } from "@/hooks/use-toast";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { useState } from "react";
import { useTheme } from "@/context/ThemeContext";


export function Header() {
  const pathname = usePathname();
  const { user, loading } = useUser();
  const auth = useAuth();
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    if (auth) {
      await auth.signOut();
      toast({
        title: "Signed Out",
        description: "You have been successfully signed out.",
      });
    }
  };

  const getAvatarFallback = () => {
    if (!user) return '';
    if (user.isAnonymous) return 'A';
    if (user.email) return user.email.charAt(0).toUpperCase();
    return 'U';
  };

  const navLinks = [
    { href: "/", label: "My Garage", icon: Car },
    { href: "/fitment", label: "Fitment", icon: CircleDot },
    { href: "/mod-guide", label: "Mod Guide", icon: Flame },
    { href: "/fluids-guide", label: "Fluids Guide", icon: Droplets },
    { href: "/database", label: "Vehicle Database", icon: Database },
    { href: "/how-it-works", label: "How It Works", icon: HelpCircle },
  ];

  const themes = [
    { name: "Default", value: "dark" },
    { name: "Subaru", value: "theme-subaru" },
    { name: "Mercedes", value: "theme-mercedes" },
    { name: "Holden", value: "theme-holden" },
    { name: "Ford", value: "theme-ford" },
    { name: "BMW", value: "theme-bmw" },
    { name: "Lotus", value: "theme-lotus" },
    { name: "Lamborghini", value: "theme-lamborghini" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex items-center">
          <div className="md:hidden mr-2">
             <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <div className="flex flex-col h-full">
                    <div className="border-b pb-4">
                      <Link href="/" className="flex items-center space-x-2">
                        <Wrench className="h-6 w-6 text-accent" />
                        <span className="font-bold font-headline text-lg">Interval</span>
                      </Link>
                    </div>
                    <nav className="flex flex-col gap-4 mt-6">
                        {navLinks.map((link) => (
                           <SheetClose asChild key={link.href}>
                            <Link
                                href={link.href}
                                className={cn(
                                "flex items-center gap-3 rounded-md p-2 text-lg font-medium transition-colors hover:bg-accent/10",
                                pathname === link.href ? "text-accent" : "text-foreground/80"
                                )}
                            >
                                <link.icon className="h-5 w-5" />
                                {link.label}
                            </Link>
                           </SheetClose>
                        ))}
                    </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <Link href="/" className="mr-6 hidden md:flex items-center space-x-2">
            <Wrench className="h-6 w-6 text-accent" />
            <span className="font-bold font-headline text-lg">Interval</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "transition-colors hover:text-accent",
                  pathname === link.href ? "text-accent" : "text-foreground/60"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2 sm:space-x-4">
          {user && (
            <Link href="/add-vehicle" passHref>
              <Button className="shadow-sm hover:shadow-glow-accent transition-shadow duration-300 hidden sm:inline-flex">
                  <Car className="mr-2 h-4 w-4" />
                  Add Vehicle
              </Button>
            </Link>
          )}
          {loading ? (
            <Skeleton className="h-8 w-8 rounded-full" />
          ) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar className="h-8 w-8">
                  <AvatarFallback>{getAvatarFallback()}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                  {user.isAnonymous ? "Anonymous User" : user.email}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <Palette className="mr-2 h-4 w-4" />
                    Change Theme
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
                      {themes.map((t) => (
                        <DropdownMenuRadioItem key={t.value} value={t.value}>
                          {t.name}
                        </DropdownMenuRadioItem>
                      ))}
                    </DropdownMenuRadioGroup>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>

                <DropdownMenuSeparator />
                {user.isAnonymous && (
                  <Link href="/login" passHref>
                     <DropdownMenuItem>Sign Up / Login</DropdownMenuItem>
                  </Link>
                )}
                <DropdownMenuItem onClick={handleSignOut} className="text-red-500 focus:text-red-500">Sign Out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
             <Link href="/login" passHref>
              <Button variant="outline">
                  <User className="mr-2 h-4 w-4" />
                  Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
