
"use client";

import { useState } from 'react';
import type { Vehicle } from '@/lib/types';
import { VehicleSelector } from '@/components/fitment/VehicleSelector';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Flame, AlertTriangle, ShieldCheck, DollarSign, Zap } from 'lucide-react';
import { VEHICLE_DATABASE } from '@/lib/vehicles';
import { MOD_DATA } from '@/lib/mod-data';

export default function ModGuidePage() {
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  const modGuide = selectedVehicle ? MOD_DATA[selectedVehicle.modGuideId || ''] : null;

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="text-center">
        <h1 className="text-4xl font-bold font-headline">Modification Guide</h1>
        <p className="text-muted-foreground mt-2">Get platform-specific advice for your car.</p>
      </div>

      <VehicleSelector onVehicleSelect={setSelectedVehicle} />

      {selectedVehicle && (
        <div className="animate-in fade-in-50 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-headline">
                Mod Guide for {selectedVehicle.make} {selectedVehicle.model} {selectedVehicle.variant}
              </CardTitle>
              <CardDescription>
                {selectedVehicle.years}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {modGuide ? (
                <>
                  <p className="text-muted-foreground">{modGuide.summary}</p>
                  
                  <Card className="bg-stone-200">
                    <CardHeader className="flex-row items-center gap-4 space-y-0">
                       <AlertTriangle className="w-8 h-8 text-destructive" />
                       <div className="text-stone-800">
                         <CardTitle className="text-destructive">Stock Engine Power Limit</CardTitle>
                         <p className="text-lg font-bold">{modGuide.powerLimit}</p>
                       </div>
                    </CardHeader>
                  </Card>
                  
                  <div>
                    <h3 className="font-bold text-xl mb-2 flex items-center gap-2"><Flame size={20} className="text-accent"/>Modification Stages</h3>
                    <Accordion type="single" collapsible defaultValue="item-0">
                      {modGuide.stages.map((stage, index) => (
                        <AccordionItem value={`item-${index}`} key={stage.name}>
                          <AccordionTrigger className="font-semibold text-lg">{stage.name}</AccordionTrigger>
                          <AccordionContent className="space-y-4">
                             <p className="text-muted-foreground">{stage.description}</p>
                             <p><strong className="font-medium">Common Mods:</strong> {stage.common_mods}</p>
                             <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6 border-t pt-4 mt-4 text-sm">
                                {stage.cost && (
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                    <DollarSign size={16} className="text-accent" />
                                    <strong className="font-medium text-foreground/80">Est. Cost:</strong> 
                                    <span>{stage.cost}</span>
                                    </div>
                                )}
                                {stage.power && (
                                    <div className="flex items-center gap-2 text-muted-foreground mt-2 sm:mt-0">
                                    <Zap size={16} className="text-accent" />
                                    <strong className="font-medium text-foreground/80">Est. Power:</strong> 
                                    <span>{stage.power}</span>
                                    </div>
                                )}
                              </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                  
                  <div>
                     <h3 className="font-bold text-xl mb-2 flex items-center gap-2"><ShieldCheck size={20} className="text-accent"/>Common Issues & Reliability</h3>
                     <div className="space-y-4">
                        {modGuide.common_issues.map((issue) => (
                          <Card key={issue.name} className="bg-card/50">
                             <CardHeader className="pb-2">
                               <CardTitle className="text-base">{issue.name}</CardTitle>
                             </CardHeader>
                             <CardContent>
                               <p className="text-sm text-muted-foreground">{issue.description}</p>
                             </CardContent>
                          </Card>
                        ))}
                     </div>
                  </div>
                </>
              ) : (
                <p className="text-muted-foreground text-center py-8">No modification guide available for this vehicle yet.</p>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

    