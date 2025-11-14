"use client";

import { useGarage } from "@/context/GarageContext";
import { CarCard } from "@/components/garage/CarCard";
import { AddVehiclePrompt } from "@/components/garage/AddVehiclePrompt";
import { Skeleton } from "@/components/ui/skeleton";
import { useUser } from "@/firebase";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import { useAuth } from "@/firebase";
import { signInAnonymously } from "firebase/auth";

export default function MyGaragePage() {
  const { cars, loading: garageLoading } = useGarage();
  const { user, loading: userLoading } = useUser();
  const auth = useAuth();
  const loading = garageLoading || userLoading;

  const handleLogin = async () => {
    if (!auth) return;
    try {
      await signInAnonymously(auth);
    } catch (error) {
      console.error("Error signing in anonymously", error);
    }
  };

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-headline font-bold">My Garage</h1>
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Skeleton className="h-[480px] rounded-lg" />
          <Skeleton className="h-[480px] rounded-lg" />
        </div>
      </div>
    );
  }

  if (!user) {
    return (
        <div className="flex items-center justify-center h-full min-h-[60vh]">
            <div className="text-center">
                <h2 className="text-2xl font-bold font-headline mb-2">Welcome to Interval</h2>
                <p className="text-muted-foreground mb-6">Press Start to begin managing your garage.</p>
                <Button onClick={handleLogin} disabled={!auth}>
                    <LogIn className="mr-2 h-4 w-4" />
                    Start
                </Button>
            </div>
        </div>
    )
  }

  return (
    <div className="animate-in fade-in-50">
      {cars.length === 0 ? (
        <AddVehiclePrompt />
      ) : (
        <div className="space-y-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-headline font-bold">My Garage</h1>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {cars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
