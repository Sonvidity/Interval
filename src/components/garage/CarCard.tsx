"use client";

import { useState } from 'react';
import type { UserCar } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { VEHICLE_DATABASE } from '@/lib/vehicles';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { getEngineKms, calculateService } from '@/lib/calculations';
import { ServiceProgress } from './ServiceProgress';
import { CalculationModal } from './CalculationModal';
import { Button } from '../ui/button';
import { LogServiceModal } from './LogServiceModal';
import { Wrench } from 'lucide-react';

export function CarCard({ car }: { car: UserCar }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [logModalOpen, setLogModalOpen] = useState(false);
  const [calculationData, setCalculationData] = useState<any>(null);

  const vehicleInfo = VEHICLE_DATABASE.find(v => v.id === car.vehicleId);
  if (!vehicleInfo) return null;

  const engineService = calculateService(car, vehicleInfo, 'Engine');
  const chassisService = calculateService(car, vehicleInfo, 'Chassis');
  const engineKms = getEngineKms(car);

  const vehicleImage = PlaceHolderImages.find(img => img.id === vehicleInfo.imageId);

  const handleShowCalculation = (data: any) => {
    setCalculationData(data);
    setModalOpen(true);
  };
  
  return (
    <>
      <Card className="flex flex-col">
        <CardHeader className="relative">
          {vehicleImage && (
            <Image
              src={vehicleImage.imageUrl}
              alt={vehicleImage.description}
              width={600}
              height={400}
              className="rounded-t-lg object-cover aspect-[3/2] w-full"
              data-ai-hint={vehicleImage.imageHint}
            />
          )}
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent rounded-b-lg">
            <CardTitle className="text-2xl font-headline text-white">{car.nickname}</CardTitle>
            <CardDescription className="text-gray-300">{vehicleInfo.make} {vehicleInfo.model} - {vehicleInfo.variant}</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="flex-grow p-6 flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                  <p className="text-sm text-muted-foreground">Chassis KMs</p>
                  <p className="text-xl font-bold">{car.odometerReading.toLocaleString()}</p>
              </div>
              <div>
                  <p className="text-sm text-muted-foreground">Engine KMs</p>
                  <p className={`text-xl font-bold ${engineKms ? '' : 'text-muted-foreground'}`}>{engineKms ? engineKms.toLocaleString() : 'N/A'}</p>
              </div>
          </div>

          <div className="flex-grow space-y-4">
            <ServiceProgress
              service={engineService}
              onShowCalculation={() => handleShowCalculation(engineService)}
            />
            <ServiceProgress
              service={chassisService}
              onShowCalculation={() => handleShowCalculation(chassisService)}
            />
          </div>
          
          <Button onClick={() => setLogModalOpen(true)} className="w-full mt-4 shadow-sm hover:shadow-glow-accent transition-shadow duration-300">
            <Wrench className="mr-2 h-4 w-4" />
            Log Service
          </Button>
        </CardContent>
      </Card>
      
      {calculationData && (
        <CalculationModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          data={calculationData}
        />
      )}
      <LogServiceModal 
        isOpen={logModalOpen}
        onClose={() => setLogModalOpen(false)}
        car={car}
      />
    </>
  );
}
