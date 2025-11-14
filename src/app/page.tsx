
"use client";

import { useGarage } from "@/context/GarageContext";
import { CarCard } from "@/components/garage/CarCard";
import { AddVehiclePrompt } from "@/components/garage/AddVehiclePrompt";
import { Skeleton } from "@/components/ui/skeleton";
import { useUser } from "@/firebase/auth/use-user";
import { WelcomeScreen } from "@/components/garage/WelcomeScreen";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Car } from "lucide-react";

export default function MyGaragePage() {
  const { user, loading: userLoading } = useUser();
  const { cars, loading: carsLoading } = useGarage();

  const loading = userLoading || carsLoading;

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-headline font-bold">My Garage</h1>
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Skeleton className="h-[480px] rounded-lg" />
          <Skeleton className="h-[480px] rounded-lg" />
        </div>
      </div>
    );
  }

  if (!user) {
    return <WelcomeScreen />;
  }

  return (
    <div className="animate-in fade-in-50">
      {cars.length === 0 ? (
        <AddVehiclePrompt />
      ) : (
        <div className="space-y-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl sm:text-3xl font-headline font-bold">My Garage</h1>
             <Link href="/add-vehicle" passHref>
              <Button className="shadow-sm hover:shadow-glow-accent transition-shadow duration-300 sm:hidden">
                  <Car className="mr-2 h-4 w-4" />
                  Add
              </Button>
            </Link>
          </div>
          {user.isAnonymous && (
             <div className="p-4 bg-yellow-900/20 border border-yellow-700 text-yellow-300 rounded-lg">
                <h3 className="font-bold">You are using an anonymous account.</h3>
                <p className="text-sm">Your garage is only saved on this device. 
                  <Link href="/login" className="font-semibold underline hover:text-yellow-200"> Create a free account </Link> 
                   to save your data and access it anywhere.
                </p>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {cars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
