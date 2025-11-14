"use client";

import { useGarage } from "@/context/GarageContext";
import { CarCard } from "@/components/garage/CarCard";
import { AddVehiclePrompt } from "@/components/garage/AddVehiclePrompt";
import { Skeleton } from "@/components/ui/skeleton";

export default function MyGaragePage() {
  const { cars, loading } = useGarage();

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-headline font-bold">My Garage</h1>
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Skeleton className="h-[380px] rounded-lg" />
          <Skeleton className="h-[380px] rounded-lg" />
        </div>
      </div>
    );
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
