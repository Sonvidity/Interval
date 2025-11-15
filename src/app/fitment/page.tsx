
"use client";
import { useState } from 'react';
import type { Vehicle } from '@/lib/types';
import { VehicleSelector } from '@/components/fitment/VehicleSelector';
import { FitmentGuide } from '@/components/fitment/FitmentGuide';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Info } from 'lucide-react';

export default function FitmentPage() {
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div className="text-center">
        <h1 className="text-4xl font-bold font-headline">Wheel & Tire Fitment Guide</h1>
        <p className="text-muted-foreground mt-2">Find the perfect wheel and tire setup for your car.</p>
      </div>

      <VehicleSelector onVehicleSelect={setSelectedVehicle} />

      {selectedVehicle && (
        <div className="animate-in fade-in-50 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-headline">
                Fitment Data for {selectedVehicle.make} {selectedVehicle.model} {selectedVehicle.variant}
              </CardTitle>
              <CardDescription>
                {selectedVehicle.years}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {selectedVehicle.fitment ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                    <Card className="p-4">
                      <CardTitle className="text-sm font-medium text-muted-foreground">PCD</CardTitle>
                      <p className="text-xl font-bold font-mono">{selectedVehicle.fitment.pcd}</p>
                    </Card>
                    <Card className="p-4">
                      <CardTitle className="text-sm font-medium text-muted-foreground">Stud Pattern</CardTitle>
                      <p className="text-xl font-bold font-mono">{selectedVehicle.fitment.studPattern}</p>
                    </Card>
                     <Card className="p-4">
                      <CardTitle className="text-sm font-medium text-muted-foreground">OEM Offset</CardTitle>
                      <p className="text-xl font-bold font-mono">{selectedVehicle.fitment.oemSize.offset}</p>
                    </Card>
                  </div>

                  <div>
                    <h3 className="font-bold text-lg mb-2 flex items-center gap-2"><Info size={16} className="text-accent"/>OEM Standard</h3>
                     <Badge variant="secondary" className="text-base font-mono font-normal">
                      {selectedVehicle.fitment.oemSize.wheel} &middot; {selectedVehicle.fitment.oemSize.tyre}
                    </Badge>
                  </div>

                  <div>
                     <h3 className="font-bold text-lg mb-2 flex items-center gap-2"><Info size={16} className="text-accent"/>Fitment Options</h3>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Wheel Size</TableHead>
                          <TableHead>Recommended Tire Range</TableHead>
                          <TableHead>Offset Range</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selectedVehicle.fitment.options.map((opt, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-mono font-medium">{opt.wheel}</TableCell>
                            <TableCell className="font-mono">{opt.minTyre} - {opt.maxTyre}</TableCell>
                            <TableCell className="font-mono">{opt.offset}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                     <p className="text-xs text-muted-foreground mt-2">Disclaimer: These are recommendations. Always confirm fitment with a professional before purchasing wheels or tires. Aggressive fitments may require guard rolling or other modifications.</p>
                  </div>
                </>
              ) : (
                <p className="text-muted-foreground text-center py-8">No fitment data available for this vehicle yet.</p>
              )}
            </CardContent>
          </Card>
          
          <FitmentGuide />
        </div>
      )}
    </div>
  );
}
