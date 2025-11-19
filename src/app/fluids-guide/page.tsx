
"use client";

import { useState } from 'react';
import type { Vehicle, FluidsGuide } from '@/lib/types';
import { VehicleSelector } from '@/components/fitment/VehicleSelector';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Droplets, Info } from 'lucide-react';
import { FLUIDS_DATA } from '@/lib/fluids-data';

const InfoPill = ({ title, content }: { title: string, content: string }) => (
    <div className="border border-border/50 rounded-lg p-3">
        <p className="text-xs font-semibold text-muted-foreground">{title}</p>
        <p className="font-mono text-sm">{content}</p>
    </div>
)

export default function FluidsGuidePage() {
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  const fluidsGuide = selectedVehicle ? FLUIDS_DATA[selectedVehicle.fluidsGuideId || ''] : null;

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="text-center">
        <h1 className="text-4xl font-bold font-headline">Fluids & Filters Guide</h1>
        <p className="text-muted-foreground mt-2">Find the right oil and filters for your car.</p>
      </div>

      <VehicleSelector onVehicleSelect={setSelectedVehicle} />

      {selectedVehicle && (
        <Card className="animate-in fade-in-50">
          <CardHeader>
            <CardTitle className="text-2xl font-headline">
              Fluids Guide for {selectedVehicle.make} {selectedVehicle.model}
            </CardTitle>
            <CardDescription>
              {selectedVehicle.variant} ({selectedVehicle.years})
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {fluidsGuide ? (
              <>
                <div>
                  <h3 className="font-bold text-xl mb-2 flex items-center gap-2"><Droplets size={20} className="text-accent"/>Engine Oil Recommendations</h3>
                   <div className="space-y-4">
                        <Card className="bg-card/50">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-base">Daily Driving</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <InfoPill title="Viscosity" content={fluidsGuide.engineOil.daily.viscosity}/>
                                <p className="text-sm text-muted-foreground mt-2">{fluidsGuide.engineOil.daily.description}</p>
                            </CardContent>
                        </Card>
                        <Card className="bg-card/50">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-base">Spirited / Fast Road</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <InfoPill title="Viscosity" content={fluidsGuide.engineOil.spirited.viscosity}/>
                                <p className="text-sm text-muted-foreground mt-2">{fluidsGuide.engineOil.spirited.description}</p>
                            </CardContent>
                        </Card>
                        <Card className="bg-card/50">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-base">Track / Competition</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <InfoPill title="Viscosity" content={fluidsGuide.engineOil.track.viscosity}/>
                                <p className="text-sm text-muted-foreground mt-2">{fluidsGuide.engineOil.track.description}</p>
                            </CardContent>
                        </Card>
                   </div>
                   {fluidsGuide.notes && (
                        <div className="mt-4 p-3 bg-blue-900/20 border border-blue-700 text-blue-300 rounded-lg flex items-start gap-3">
                            <Info size={16} className="mt-1 flex-shrink-0" />
                            <p className="text-sm">{fluidsGuide.notes}</p>
                        </div>
                   )}
                </div>
                 <div>
                  <h3 className="font-bold text-xl mb-2 flex items-center gap-2"><Info size={20} className="text-accent"/>Oil Filter Part Numbers</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                     <InfoPill title="OEM" content={fluidsGuide.oilFilter.oem}/>
                     {fluidsGuide.oilFilter.ryco && <InfoPill title="Ryco" content={fluidsGuide.oilFilter.ryco}/>}
                     {fluidsGuide.oilFilter.kn && <InfoPill title="K&N" content={fluidsGuide.oilFilter.kn}/>}
                     {fluidsGuide.oilFilter.other?.map(f => (
                        <InfoPill key={f.brand} title={f.brand} content={f.partNumber}/>
                     ))}
                  </div>
                   <p className="text-xs text-muted-foreground mt-2">Disclaimer: Part numbers are for reference only. Always double-check fitment for your specific model and year before purchasing.</p>
                </div>
              </>
            ) : (
              <p className="text-muted-foreground text-center py-8">No fluids and filters guide available for this vehicle yet.</p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

