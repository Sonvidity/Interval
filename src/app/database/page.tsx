
"use client";

import { useState } from 'react';
import { VEHICLE_DATABASE } from '@/lib/vehicles';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Image from 'next/image';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

// Re-importing placeholder logic to be safe
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function VehicleDatabasePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState<(typeof VEHICLE_DATABASE)[0] | null>(null);

  const filteredVehicles = VEHICLE_DATABASE.filter(vehicle =>
    `${vehicle.make} ${vehicle.model} ${vehicle.variant} ${vehicle.years}`.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleSelectVehicle = (vehicle: typeof VEHICLE_DATABASE[0]) => {
    setSelectedVehicle(vehicle);
  }

  const getImage = (imageId: string) => {
    return PlaceHolderImages.find(img => img.id === imageId);
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold font-headline">Vehicle Database</h1>
        <p className="text-muted-foreground mt-2">Browse the OEM service guides for any car in our database.</p>
      </div>

      <div className="max-w-4xl mx-auto">
        <Input
          placeholder="Search for a car... (e.g., Ford Falcon)"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setSelectedVehicle(null);
          }}
          className="text-lg p-6"
        />

        {searchTerm && !selectedVehicle && (
          <Card className="mt-4">
            <CardContent className="p-2">
              <div className="max-h-96 overflow-y-auto">
                {filteredVehicles.map(vehicle => (
                  <button
                    key={vehicle.id}
                    onClick={() => handleSelectVehicle(vehicle)}
                    className="w-full text-left p-3 hover:bg-accent/10 rounded-md transition-colors"
                  >
                    <p className="font-semibold">{vehicle.make} {vehicle.model} {vehicle.variant}</p>
                    <p className="text-sm text-muted-foreground">{vehicle.years}</p>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {selectedVehicle && (
        <Card className="max-w-4xl mx-auto animate-in fade-in-50">
          <CardHeader>
            <div className="flex flex-col sm:flex-row gap-6">
              {getImage(selectedVehicle.imageId) && (
                <div className="sm:w-1/3">
                  <Image
                    src={getImage(selectedVehicle.imageId)?.imageUrl || ''}
                    alt={getImage(selectedVehicle.imageId)?.description || selectedVehicle.model}
                    width={600}
                    height={400}
                    className="rounded-lg object-cover"
                    data-ai-hint={getImage(selectedVehicle.imageId)?.imageHint}
                  />
                </div>
              )}
              <div className="sm:w-2/3">
                <CardTitle className="text-3xl font-headline">{selectedVehicle.make} {selectedVehicle.model}</CardTitle>
                <CardDescription>{selectedVehicle.variant} ({selectedVehicle.years})</CardDescription>
                <p className="text-sm mt-4">This is the standard manufacturer-recommended service schedule. 'Interval' will adapt this based on your car's modifications and your driving style.</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
             <Accordion type="single" collapsible defaultValue="engine" className="w-full">
              <AccordionItem value="engine">
                <AccordionTrigger className="text-lg font-bold">Engine Components</AccordionTrigger>
                <AccordionContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Item</TableHead>
                        <TableHead className="text-right">Interval (km)</TableHead>
                        <TableHead className="text-right">Interval (Months)</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedVehicle.serviceItems.filter(i => i.type === 'Engine').map(item => (
                        <TableRow key={item.name}>
                          <TableCell className="font-medium">{item.name}</TableCell>
                          <TableCell className="text-right">{item.oemIntervalKm.toLocaleString()}</TableCell>
                          <TableCell className="text-right">{item.oemIntervalMonths}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="chassis">
                <AccordionTrigger className="text-lg font-bold">Chassis Components</AccordionTrigger>
                <AccordionContent>
                   <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Item</TableHead>
                        <TableHead className="text-right">Interval (km)</TableHead>
                        <TableHead className="text-right">Interval (Months)</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedVehicle.serviceItems.filter(i => i.type === 'Chassis').map(item => (
                        <TableRow key={item.name}>
                          <TableCell className="font-medium">{item.name}</TableCell>
                          <TableCell className="text-right">{item.oemIntervalKm.toLocaleString()}</TableCell>
                          <TableCell className="text-right">{item.oemIntervalMonths}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      )}

      {!selectedVehicle && (
        <Card className="max-w-6xl mx-auto">
          <CardHeader>
            <CardTitle>Full Vehicle List</CardTitle>
            <CardDescription>A complete list of all vehicles currently in the database.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="max-h-[80vh] overflow-y-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Year</TableHead>
                    <TableHead>Make</TableHead>
                    <TableHead>Model</TableHead>
                    <TableHead>Variant</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {VEHICLE_DATABASE.sort((a,b) => `${a.make} ${a.model}`.localeCompare(`${b.make} ${b.model}`)).map(vehicle => (
                    <TableRow key={vehicle.id} onClick={() => handleSelectVehicle(vehicle)} className="cursor-pointer">
                      <TableCell>{vehicle.years}</TableCell>
                      <TableCell>{vehicle.make}</TableCell>
                      <TableCell>{vehicle.model}</TableCell>
                      <TableCell>{vehicle.variant}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
