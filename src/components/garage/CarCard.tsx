
"use client";

import { useState, useMemo, memo } from 'react';
import type { UserCar, CalculatedService } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { VEHICLE_DATABASE } from '@/lib/vehicles';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { getEngineKms, calculateAllServices } from '@/lib/calculations';
import { ServiceProgress } from './ServiceProgress';
import { CalculationModal } from './CalculationModal';
import { Button } from '../ui/button';
import { LogServiceModal } from './LogServiceModal';
import { MoreVertical, Wrench, History } from 'lucide-react';
import { ServiceListModal } from './ServiceListModal';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { RemoveCarDialog } from './RemoveCarDialog';
import { ChangePhotoModal } from './ChangePhotoModal';
import Link from 'next/link';


const CarCardComponent = ({ car }: { car: UserCar }) => {
  const [calculationModalOpen, setCalculationModalOpen] = useState(false);
  const [logModalOpen, setLogModalOpen] = useState(false);
  const [serviceListModalOpen, setServiceListModalOpen] = useState(false);
  const [removeCarModalOpen, setRemoveCarModalOpen] = useState(false);
  const [changePhotoModalOpen, setChangePhotoModalOpen] = useState(false);
  const [calculationData, setCalculationData] = useState<CalculatedService | null>(null);

  const vehicleInfo = useMemo(() => VEHICLE_DATABASE.find(v => v.id === car.vehicleId), [car.vehicleId]);

  const allServices = useMemo(() => {
    if (!vehicleInfo) return [];
    return calculateAllServices(car, vehicleInfo);
  }, [car, vehicleInfo]);

  const sortedServices = useMemo(() => {
      return [...allServices].sort((a, b) => a.dueInKm - b.dueInKm);
  }, [allServices]);
  
  const engineKms = useMemo(() => getEngineKms(car), [car]);

  const { vehicleImage, vehicleImageAlt, imageHint } = useMemo(() => {
    let imageUrl = '';
    let alt = car.nickname;
    let hint: string | undefined = undefined;

    if (car.customImageUrl) {
      imageUrl = car.customImageUrl;
    } else {
      const placeholder = PlaceHolderImages.find(img => img.id === car.imageId);
      if (placeholder) {
        imageUrl = placeholder.imageUrl;
        alt = placeholder.description;
        hint = placeholder.imageHint;
      } else {
        const vehiclePlaceholder = PlaceHolderImages.find(img => img.id === vehicleInfo?.imageId);
        imageUrl = vehiclePlaceholder?.imageUrl || 'https://placehold.co/600x400/1e293b/ffffff?text=Image+Not+Found';
      }
    }

    return { vehicleImage: imageUrl, vehicleImageAlt: alt, imageHint: hint };
  }, [car.customImageUrl, car.imageId, car.nickname, vehicleInfo?.imageId]);


  if (!vehicleInfo) return null;


  const handleShowCalculation = (data: CalculatedService) => {
    setCalculationData(data);
    setCalculationModalOpen(true);
  };
  
  return (
    <>
      <Card className="flex flex-col">
        <CardHeader className="relative p-0">
          <Image
              src={vehicleImage}
              alt={vehicleImageAlt}
              width={600}
              height={400}
              className="rounded-t-lg object-cover aspect-[3/2] w-full"
              data-ai-hint={imageHint}
              onError={(e) => e.currentTarget.src = 'https://placehold.co/600x400/1e293b/ffffff?text=Invalid+Image'}
            />
          <div className="absolute top-2 right-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary" size="icon" className="h-8 w-8 bg-black/50 hover:bg-black/70 border-none text-white">
                  <MoreVertical size={16} />
                  <span className="sr-only">Car Options</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setChangePhotoModalOpen(true)}>
                  Change Photo
                </DropdownMenuItem>
                <Link href={`/history/${car.id}`} passHref>
                  <DropdownMenuItem>
                    <History className="mr-2 h-4 w-4" />
                    View Service History
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setRemoveCarModalOpen(true)} className="text-red-500 focus:text-red-500">
                  Remove Car
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
            <CardTitle className="text-2xl font-headline text-white">{car.nickname}</CardTitle>
            <CardDescription className="text-gray-300">{car.year} {vehicleInfo.make} {car.variant}</CardDescription>
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
                  <p className={`text-xl font-bold ${engineKms !== car.odometerReading ? 'text-accent' : ''}`}>{engineKms ? engineKms.toLocaleString() : car.odometerReading.toLocaleString()}</p>
              </div>
          </div>

          <div className="flex-grow flex flex-col">
            <h3 className="text-sm font-medium text-muted-foreground mb-2 px-1">Top Upcoming Services</h3>
            <div className="space-y-3">
              {sortedServices.slice(0, 4).map((service) => (
                <ServiceProgress
                  key={service.name}
                  service={service}
                  onShowCalculation={() => handleShowCalculation(service)}
                />
              ))}
            </div>
          </div>
          
          <div className="flex gap-2 mt-4">
            <Button onClick={() => setLogModalOpen(true)} className="w-full shadow-sm hover:shadow-glow-accent transition-shadow duration-300">
              <Wrench className="mr-2 h-4 w-4" />
              Log Service
            </Button>
            <Button onClick={() => setServiceListModalOpen(true)} variant="outline" className="w-full">
                View All
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {calculationData && (
        <CalculationModal
          isOpen={calculationModalOpen}
          onClose={() => setCalculationModalOpen(false)}
          data={calculationData}
        />
      )}
      <LogServiceModal 
        isOpen={logModalOpen}
        onClose={() => setLogModalOpen(false)}
        car={car}
        vehicleInfo={vehicleInfo}
      />
       <ServiceListModal 
        isOpen={serviceListModalOpen}
        onClose={() => setServiceListModalOpen(false)}
        services={sortedServices}
        onShowCalculation={handleShowCalculation}
      />
       <RemoveCarDialog
        isOpen={removeCarModalOpen}
        onClose={() => setRemoveCarModalOpen(false)}
        carId={car.id}
        carNickname={car.nickname}
      />
      <ChangePhotoModal
        isOpen={changePhotoModalOpen}
        onClose={() => setChangePhotoModalOpen(false)}
        car={car}
      />
    </>
  );
}


export const CarCard = memo(CarCardComponent);
