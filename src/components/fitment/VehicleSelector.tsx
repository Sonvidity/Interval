
"use client";

import { useState } from 'react';
import { useGarage } from '@/context/GarageContext';
import { VEHICLE_DATABASE } from '@/lib/vehicles';
import type { Vehicle } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Car } from 'lucide-react';
import { ScrollArea } from '../ui/scroll-area';

interface VehicleSelectorProps {
  onVehicleSelect: (vehicle: Vehicle, carId?: string) => void;
}

export function VehicleSelector({ onVehicleSelect }: VehicleSelectorProps) {
  const { cars: userCars } = useGarage();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState(userCars.length > 0 ? 'garage' : 'search');

  const filteredVehicles = VEHICLE_DATABASE.filter(vehicle =>
    `${vehicle.make} ${vehicle.model} ${vehicle.variant} ${vehicle.years}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectFromGarage = (carId: string) => {
    const userCar = userCars.find(c => c.id === carId);
    if (!userCar) return;
    
    const vehicle = VEHICLE_DATABASE.find(v => v.id === userCar.vehicleId);
    if (vehicle) {
      onVehicleSelect(vehicle, userCar.id);
    }
  };

  return (
    <Card>
      <CardContent className="p-4">
        <Tabs value={activeTab} onValueChange={(value) => { setSearchTerm(''); setActiveTab(value); }} className="w-full">
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
                                    <p className="text-sm text-muted-foreground">{car.year} {vehicleInfo.make} {car.variant}</p>
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
            />
            {searchTerm && (
                <ScrollArea className="h-48 mt-2">
                    <div className="space-y-2 pr-4">
                        {filteredVehicles.map(v => (
                            <Button
                            key={v.id}
                            variant={'outline'}
                            className="w-full justify-start h-auto py-2 text-left"
                            onClick={() => onVehicleSelect(v)}
                            >
                            <div>
                                <p className="font-semibold">{v.make} {v.model}</p>
                                <p className="text-sm text-muted-foreground">{v.variant} ({v.years})</p>
                            </div>
                            </Button>
                        ))}
                    </div>
              </ScrollArea>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
