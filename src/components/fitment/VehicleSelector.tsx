
"use client";

import { useState, useEffect } from 'react';
import { useGarage } from '@/context/GarageContext';
import { VEHICLE_DATABASE } from '@/lib/vehicles';
import type { Vehicle } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Car, History } from 'lucide-react';
import { ScrollArea } from '../ui/scroll-area';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"


const MAX_RECENT_VEHICLES = 5;

interface VehicleSelectorProps {
  onVehicleSelect: (vehicle: Vehicle, carId?: string) => void;
}

export function VehicleSelector({ onVehicleSelect }: VehicleSelectorProps) {
  const { cars: userCars } = useGarage();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState(userCars.length > 0 ? 'garage' : 'search');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [recentVehicles, setRecentVehicles] = useState<Vehicle[]>([]);

  useEffect(() => {
    try {
      const storedRecents = localStorage.getItem('recentVehicles');
      if (storedRecents) {
        setRecentVehicles(JSON.parse(storedRecents));
      }
    } catch (error) {
      console.error("Failed to parse recent vehicles from localStorage", error);
      setRecentVehicles([]);
    }
  }, []);

  const addVehicleToRecents = (vehicle: Vehicle) => {
    setRecentVehicles(prevRecents => {
      const isAlreadyRecent = prevRecents.some(v => v.id === vehicle.id);
      if (isAlreadyRecent) {
        return prevRecents; // Don't add if it's already there
      }
      const updatedRecents = [vehicle, ...prevRecents].slice(0, MAX_RECENT_VEHICLES);
      try {
        localStorage.setItem('recentVehicles', JSON.stringify(updatedRecents));
      } catch (error) {
        console.error("Failed to save recent vehicles to localStorage", error);
      }
      return updatedRecents;
    });
  };

  const handleSelect = (vehicle: Vehicle, carId?: string) => {
    addVehicleToRecents(vehicle);
    onVehicleSelect(vehicle, carId);
  }

  const handleSelectFromGarage = (carId: string) => {
    const userCar = userCars.find(c => c.id === carId);
    if (!userCar) return;
    
    const vehicle = VEHICLE_DATABASE.find(v => v.id === userCar.vehicleId);
    if (vehicle) {
      handleSelect(vehicle, userCar.id);
    }
  };

  const filteredVehicles = VEHICLE_DATABASE.filter(vehicle =>
    `${vehicle.make} ${vehicle.model} ${vehicle.variant} ${vehicle.years}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getVehicleList = (list: Vehicle[], handler: (vehicle: Vehicle) => void) => (
     <ScrollArea className="h-48 mt-2">
        <div className="space-y-2 pr-4">
            {list.map(v => (
                <Button
                key={v.id}
                variant={'outline'}
                className="w-full justify-start h-auto py-2 text-left"
                onClick={() => handler(v)}
                >
                <div>
                    <p className="font-semibold">{v.make} {v.model}</p>
                    <p className="text-sm text-muted-foreground">{v.variant} ({v.years})</p>
                </div>
                </Button>
            ))}
        </div>
    </ScrollArea>
  )

  return (
    <Card>
      <CardContent className="p-4">
        <Tabs value={activeTab} onValueChange={(value) => { setSearchTerm(''); setIsSearchFocused(false); setActiveTab(value); }} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="garage">My Garage</TabsTrigger>
            <TabsTrigger value="search">Search All</TabsTrigger>
          </TabsList>
          <TabsContent value="garage" className="mt-4">
            {userCars.length > 0 ? (
                <ScrollArea className="h-48">
                    <div className="space-y-2 pr-4">
                        {userCars.map(car => {
                            const vehicleInfo = VEHICLE_DATABASE.find(v => v.id === car.vehicleId);
                            if (!vehicleInfo) return null;
                            return (
                                <Button
                                key={car.id}
                                variant="outline"
                                className="w-full justify-start h-auto py-2 text-left"
                                onClick={() => handleSelectFromGarage(car.id)}
                                >
                                <Car className="mr-4 text-accent" />
                                <div>
                                    <p className="font-semibold">{car.nickname}</p>
                                    <p className="text-sm text-muted-foreground">{car.year} {vehicleInfo.make} {vehicleInfo.variant}</p>
                                </div>
                                </Button>
                            )
                        })}
                    </div>
                </ScrollArea>
            ) : (
              <div className="text-center py-10">
                <p className="text-muted-foreground">You have no cars in your garage.</p>
                <p className="text-sm text-muted-foreground">Add a car or use the 'Search All' tab.</p>
              </div>
            )}
          </TabsContent>
          <TabsContent value="search" className="mt-4">
            <Input
              placeholder="e.g., Toyota 86"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
            />
            {isSearchFocused && searchTerm.length === 0 && recentVehicles.length > 0 && (
                 <Collapsible open={true} className="mt-4">
                    <CollapsibleTrigger className="flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground w-full">
                        <History size={16}/> Recently Selected
                    </CollapsibleTrigger>
                     <CollapsibleContent>
                        {getVehicleList(recentVehicles, handleSelect)}
                    </CollapsibleContent>
                </Collapsible>
            )}

            {isSearchFocused && (
                 <Collapsible open={true} className="mt-4">
                    <CollapsibleTrigger className="flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground w-full">
                        <Car size={16}/> All Vehicles
                    </CollapsibleTrigger>
                     <CollapsibleContent>
                        {getVehicleList(filteredVehicles, handleSelect)}
                    </CollapsibleContent>
                </Collapsible>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
