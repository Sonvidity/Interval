
"use client";
import { useState } from 'react';
import type { Vehicle, ModStage } from '@/lib/types';
import { VehicleSelector } from '@/components/fitment/VehicleSelector';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getModRecommendations, type ModRecommendations } from '@/ai/flows/get-mod-recommendation-flow';
import { Skeleton } from '@/components/ui/skeleton';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Lightbulb, AlertTriangle, ShieldCheck, Wrench } from 'lucide-react';
import { useGarage } from '@/context/GarageContext';

const RecommendationCard = ({ icon, title, content }: { icon: React.ReactNode, title: string, content: string[] }) => (
  <Card>
    <CardHeader className="flex flex-row items-center gap-3 space-y-0 pb-2">
      {icon}
      <CardTitle className="font-headline text-lg">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
        {content.map((item, i) => <li key={i}>{item}</li>)}
      </ul>
    </CardContent>
  </Card>
);

export default function ModGuidePage() {
  const { getCarById } = useGarage();
  const [selectedVehicleInfo, setSelectedVehicleInfo] = useState<{ vehicle: Vehicle; modStage: ModStage; carId?: string; } | null>(null);
  const [recommendations, setRecommendations] = useState<ModRecommendations | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleVehicleSelect = (vehicle: Vehicle, carId?: string) => {
    let modStage: ModStage = 'Stock';
    if (carId) {
      const userCar = getCarById(carId);
      if (userCar) {
        modStage = userCar.modStage;
      }
    }
    setSelectedVehicleInfo({ vehicle, modStage, carId });
    setRecommendations(null); // Reset recommendations on new vehicle selection
    setError(null);
  };
  
  const fetchRecommendations = async () => {
    if (!selectedVehicleInfo) return;

    setLoading(true);
    setError(null);
    setRecommendations(null);

    try {
      const result = await getModRecommendations({
        make: selectedVehicleInfo.vehicle.make,
        model: selectedVehicleInfo.vehicle.model,
        variant: selectedVehicleInfo.vehicle.variant,
        year: selectedVehicleInfo.vehicle.years,
        currentModStage: selectedVehicleInfo.modStage
      });
      setRecommendations(result);
    } catch (e) {
      console.error(e);
      setError("Failed to fetch recommendations. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="text-center">
        <h1 className="text-4xl font-bold font-headline">AI-Powered Mod Guide</h1>
        <p className="text-muted-foreground mt-2">Get tailored modification advice for your car.</p>
      </div>

      <VehicleSelector onVehicleSelect={handleVehicleSelect} />

      {selectedVehicleInfo && (
        <Card className="animate-in fade-in-50">
          <CardHeader>
            <CardTitle className="text-xl font-headline">
              Guide for {selectedVehicleInfo.vehicle.make} {selectedVehicleInfo.vehicle.model} {selectedVehicleInfo.vehicle.variant}
            </CardTitle>
            <CardDescription>
              Currently at <span className="font-semibold text-accent">{selectedVehicleInfo.modStage}</span>. Click below to generate AI-powered recommendations.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={fetchRecommendations} disabled={loading} className="w-full">
              {loading ? 'Generating...' : 'Generate Modification Guide'}
            </Button>
          </CardContent>
        </Card>
      )}

      {loading && (
        <div className="space-y-4">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      )}
      
      {error && (
        <Card className="border-destructive">
          <CardHeader>
            <CardTitle className="text-destructive flex items-center gap-2"><AlertTriangle /> Error</CardTitle>
            <CardDescription>{error}</CardDescription>
          </CardHeader>
        </Card>
      )}

      {recommendations && (
        <div className="space-y-6 animate-in fade-in-50">
           <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl font-headline"><Wrench className="text-accent"/> Mod Path for {recommendations.stageTitle}</CardTitle>
              <CardDescription>{recommendations.stageSummary}</CardDescription>
            </CardHeader>
          </Card>
          
          <Accordion type="single" collapsible defaultValue="next-mods" className="w-full">
            <AccordionItem value="next-mods">
              <AccordionTrigger className="text-lg font-bold"><Lightbulb className="mr-2 text-accent"/>Next Suggested Mods</AccordionTrigger>
              <AccordionContent className="pt-2">
                 <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  {recommendations.nextMods.map((mod, i) => <li key={i}>{mod}</li>)}
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="issues">
              <AccordionTrigger className="text-lg font-bold"><AlertTriangle className="mr-2 text-yellow-400"/>Common Issues & Reliability</AccordionTrigger>
              <AccordionContent className="pt-2">
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  {recommendations.reliabilityConcerns.map((issue, i) => <li key={i}>{issue}</li>)}
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="limits">
              <AccordionTrigger className="text-lg font-bold"><ShieldCheck className="mr-2 text-green-400"/>Stock Engine Limits</AccordionTrigger>
              <AccordionContent className="pt-2">
                 <p className="text-muted-foreground">{recommendations.engineLimits}</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      )}
    </div>
  );
}
