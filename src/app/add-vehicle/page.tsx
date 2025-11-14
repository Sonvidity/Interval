
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Check, Car, Gauge, Rocket } from "lucide-react";
import type { ModStage, DrivingStyle, ServiceLog, TransmissionType } from "@/lib/types";
import { Switch } from "@/components/ui/switch";
import { useGarage } from "@/context/GarageContext";
import { VEHICLE_DATABASE } from "@/lib/vehicles";
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";


const steps = [
    { id: 'find', title: 'Find', icon: Car },
    { id: 'details', title: 'Details', icon: Gauge },
    { id: 'usage', title: 'Usage', icon: Rocket },
    { id: 'finish', title: 'Finish', icon: Check },
];

export default function AddVehiclePage() {
  const router = useRouter();
  const { addCar } = useGarage();
  const { toast } = useToast();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    vehicleId: "",
    nickname: "",
    year: "",
    variant: "",
    odometerReading: "",
    drivingStyle: "Spirited" as DrivingStyle,
    modStage: "Stock" as ModStage,
    transmission: "Manual" as TransmissionType,
    hasEngineSwap: false,
    chassisKmsAtSwap: "",
    engineKmsAtSwap: "",
    wasServicedAtSwap: false,
    lastServiceDate: "",
    lastServiceKms: "",
    lastServiceItems: [] as string[],
  });
  const [searchTerm, setSearchTerm] = useState("");

  const selectedVehicle = VEHICLE_DATABASE.find(v => v.id === formData.vehicleId);

  const handleNext = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const handleBack = () => setStep((s) => Math.max(s - 1, 0));

  const handleItemsDoneChange = (item: string) => {
    setFormData(prev => {
      const newItems = prev.lastServiceItems.includes(item)
        ? prev.lastServiceItems.filter(i => i !== item)
        : [...prev.lastServiceItems, item];
      return { ...prev, lastServiceItems: newItems };
    });
  };

  const handleSubmit = async () => {
    if (!selectedVehicle) {
        toast({
            variant: "destructive",
            title: "No vehicle selected",
            description: "Please search for and select a vehicle first.",
        });
        return;
    }
    if (!formData.odometerReading || !formData.year || !formData.variant) {
        toast({
            variant: "destructive",
            title: "Details Missing",
            description: "Please fill out the year, variant, and odometer reading.",
        });
        return;
    }

    const initialOdometer = parseInt(formData.odometerReading) || 0;
    
    let initialServiceLog: ServiceLog;

    // If user provided last service details, use them. Otherwise, create a default "Initial" log.
    if (formData.lastServiceDate && formData.lastServiceKms && formData.lastServiceItems.length > 0) {
        initialServiceLog = {
            id: new Date().toISOString(),
            date: formData.lastServiceDate,
            kms: parseInt(formData.lastServiceKms) || 0,
            serviceType: 'General',
            itemsDone: formData.lastServiceItems,
            notes: "Manually entered previous service during vehicle setup."
        };
    } else {
        initialServiceLog = {
            id: new Date().toISOString(),
            date: new Date().toISOString(),
            kms: initialOdometer,
            serviceType: 'Initial',
            itemsDone: selectedVehicle.serviceItems.map(item => item.name),
            notes: "Initial vehicle state when added to Garage. Assumes all items serviced."
        };
    }
    
    const carData = {
        vehicleId: formData.vehicleId,
        nickname: formData.nickname || `${selectedVehicle.make} ${selectedVehicle.model}`,
        odometerReading: initialOdometer,
        year: parseInt(formData.year),
        variant: formData.variant,
        drivingStyle: formData.drivingStyle,
        modStage: formData.modStage,
        transmission: formData.transmission,
        serviceHistory: [initialServiceLog],
        imageId: selectedVehicle.imageId,
    };

    const newCarData: any = { ...carData };

    if (formData.hasEngineSwap && formData.chassisKmsAtSwap && formData.engineKmsAtSwap) {
        newCarData.engineSwapDetails = {
            isReplaced: true,
            chassisKmsAtSwap: parseInt(formData.chassisKmsAtSwap) || 0,
            engineKmsAtSwap: parseInt(formData.engineKmsAtSwap) || 0,
            wasServicedAtSwap: formData.wasServicedAtSwap,
        };
    }
    
    await addCar(newCarData);

    toast({
        title: "Vehicle Added!",
        description: `Your new ${formData.year} ${selectedVehicle.make} ${formData.variant} is in the garage.`,
    });
    router.push('/');
  };


  const filteredVehicles = VEHICLE_DATABASE.filter(vehicle =>
    `${vehicle.make} ${vehicle.model} ${vehicle.variant} ${vehicle.years}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const StepIndicator = () => (
    <div className="flex justify-center items-center space-x-2 sm:space-x-4 mb-8">
      {steps.map((s, index) => {
        const isActive = index === step;
        const isCompleted = index < step;
        const Icon = s.icon;
        return (
          <div key={s.id} className="flex flex-col items-center text-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                isActive ? 'border-accent bg-accent/20' : isCompleted ? 'border-accent/50 bg-transparent' : 'border-border'
              }`}
            >
              <Icon className={`h-5 w-5 ${isActive || isCompleted ? 'text-accent' : 'text-muted-foreground'}`} />
            </div>
            <p className={`mt-2 text-xs font-medium ${isActive || isCompleted ? 'text-foreground' : 'text-muted-foreground'}`}>{s.title}</p>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto">
      <StepIndicator />
      <Card className="overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            {step === 0 && (
              <CardContent className="p-4 sm:p-6">
                <CardHeader className="p-0 mb-4">
                  <CardTitle className="font-headline text-xl sm:text-2xl">Step 1: Find Your Car</CardTitle>
                  <CardDescription>Search our database for your vehicle's OEM service guide.</CardDescription>
                </CardHeader>
                <Input
                  placeholder="e.g., Toyota 86"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
                <div className="max-h-60 overflow-y-auto mt-4 space-y-2 pr-2">
                  {filteredVehicles.map(v => (
                    <Button
                      key={v.id}
                      variant={formData.vehicleId === v.id ? 'secondary' : 'outline'}
                      className="w-full justify-start h-auto py-2 text-left"
                      onClick={() => setFormData({ ...formData, vehicleId: v.id })}
                    >
                      <div>
                        <p className="font-semibold">{v.make} {v.model}</p>
                        <p className="text-sm text-muted-foreground">{v.variant} ({v.years})</p>
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            )}

            {step === 1 && selectedVehicle && (
               <CardContent className="p-4 sm:p-6 space-y-4">
                 <CardHeader className="p-0 mb-4">
                  <CardTitle className="font-headline text-xl sm:text-2xl">Step 2: Tell Us About Your Car</CardTitle>
                  <CardDescription>Personalize your vehicle and set its current mileage. This will be the starting point for all service calculations.</CardDescription>
                </CardHeader>
                 <div>
                   <Label htmlFor="nickname">Nickname</Label>
                   <Input id="nickname" value={formData.nickname} onChange={e => setFormData({ ...formData, nickname: e.target.value })} placeholder={`e.g., My ${selectedVehicle.make}`} />
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="year">Year</Label>
                        <Input id="year" type="number" value={formData.year} onChange={e => setFormData({ ...formData, year: e.target.value })} placeholder="e.g., 2015" />
                    </div>
                    <div>
                        <Label>Variant</Label>
                        <Select onValueChange={(v: string) => setFormData({...formData, variant: v})} defaultValue={formData.variant}>
                            <SelectTrigger><SelectValue placeholder="Select variant..."/></SelectTrigger>
                            <SelectContent>
                                {selectedVehicle.specificVariants?.map(v => <SelectItem key={v} value={v}>{v}</SelectItem>)}
                                {!selectedVehicle.specificVariants && <SelectItem value={selectedVehicle.variant}>{selectedVehicle.variant}</SelectItem>}
                            </SelectContent>
                        </Select>
                    </div>
                 </div>
                 <div>
                   <Label htmlFor="odometer">Current Odometer Reading (km)</Label>
                   <Input id="odometer" type="number" value={formData.odometerReading} onChange={e => setFormData({ ...formData, odometerReading: e.target.value })} placeholder="e.g., 50000" />
                 </div>
                 <div>
                    <Label>Transmission Type</Label>
                    <Select onValueChange={(v: TransmissionType) => setFormData({...formData, transmission: v})} defaultValue={formData.transmission}>
                        <SelectTrigger><SelectValue/></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Manual">Manual</SelectItem>
                            <SelectItem value="Automatic">Automatic</SelectItem>
                        </SelectContent>
                    </Select>
                  </div>
                  
                  <Separator className="my-6" />

                  <div>
                     <CardTitle className="font-headline text-lg">Last Service Details (Optional)</CardTitle>
                     <CardDescription className="text-sm">If you know when your car was last serviced, enter it here for the most accurate schedule.</CardDescription>
                     <div className="grid grid-cols-2 gap-4 mt-4">
                        <div>
                           <Label htmlFor="last-service-date">Last Service Date</Label>
                           <Input id="last-service-date" type="date" value={formData.lastServiceDate} onChange={e => setFormData({ ...formData, lastServiceDate: e.target.value })} />
                        </div>
                        <div>
                           <Label htmlFor="last-service-kms">Odometer at Service</Label>
                           <Input id="last-service-kms" type="number" value={formData.lastServiceKms} onChange={e => setFormData({ ...formData, lastServiceKms: e.target.value })} placeholder="e.g., 45000"/>
                        </div>
                     </div>
                     <div className="mt-4">
                        <Label>Items Serviced</Label>
                        <ScrollArea className="h-32 rounded-md border p-4 mt-2">
                           <div className="space-y-2">
                              {selectedVehicle.serviceItems.map(item => (
                                 <div key={item.name} className="flex items-center space-x-2">
                                    <Checkbox 
                                       id={`item-init-${item.name}`} 
                                       checked={formData.lastServiceItems.includes(item.name)}
                                       onCheckedChange={() => handleItemsDoneChange(item.name)}
                                    />
                                    <label htmlFor={`item-init-${item.name}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                       {item.name}
                                    </label>
                                 </div>
                              ))}
                           </div>
                        </ScrollArea>
                     </div>
                  </div>

               </CardContent>
            )}
            
            {step === 2 && (
                 <CardContent className="p-4 sm:p-6 space-y-4">
                    <CardHeader className="p-0 mb-4">
                        <CardTitle className="font-headline text-xl sm:text-2xl">Step 3: Define Your Profile</CardTitle>
                        <CardDescription>How you drive and what mods you have.</CardDescription>
                    </CardHeader>
                    <div>
                        <Label>Driving Style</Label>
                        <Select onValueChange={(v: DrivingStyle) => setFormData({...formData, drivingStyle: v})} defaultValue={formData.drivingStyle}>
                            <SelectTrigger><SelectValue/></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Easy">Easy (Daily commute, relaxed driving)</SelectItem>
                                <SelectItem value="Spirited">Spirited (Weekend back-roads, occasional hard pulls)</SelectItem>
                                <SelectItem value="Hard">Hard (Regular track days, autocross)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label>Modification Stage</Label>
                        <Select onValueChange={(v: ModStage) => setFormData({...formData, modStage: v})} defaultValue={formData.modStage}>
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Stock">Stock (OEM configuration)</SelectItem>
                                <SelectItem value="Stage 1">Stage 1 (e.g., tune, filter)</SelectItem>
                                <SelectItem value="Stage 2">Stage 2 (e.g., tune, downpipe, intercooler)</SelectItem>
                                <SelectItem value="Stage 3">Stage 3 (e.g., built motor, E85)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <div className="flex items-center space-x-2 mt-6">
                            <Switch id="engine-swap" checked={formData.hasEngineSwap} onCheckedChange={c => setFormData({...formData, hasEngineSwap: c})} />
                            <Label htmlFor="engine-swap">Advanced: Engine Has Been Replaced</Label>
                        </div>
                        {formData.hasEngineSwap && (
                            <Card className="mt-4 p-4 space-y-4 bg-background/50 animate-in fade-in-50">
                                <p className="text-sm text-muted-foreground">This helps track engine and chassis mileage separately.</p>
                                <div>
                                    <Label>Chassis KMs at Swap</Label>
                                    <Input type="number" value={formData.chassisKmsAtSwap} onChange={e => setFormData({ ...formData, chassisKmsAtSwap: e.target.value })} placeholder="e.g., 40000"/>
                                </div>
                                <div>
                                    <Label>New Engine KMs at Swap</Label>
                                    <Input type="number" value={formData.engineKmsAtSwap} onChange={e => setFormData({ ...formData, engineKmsAtSwap: e.target.value })} placeholder="e.g., 5000"/>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Switch id="serviced-at-swap" checked={formData.wasServicedAtSwap} onCheckedChange={c => setFormData({...formData, wasServicedAtSwap: c})}/>
                                    <Label htmlFor="serviced-at-swap">Engine was serviced at swap</Label>
                                </div>
                            </Card>
                        )}
                    </div>
                 </CardContent>
            )}

            {step === 3 && selectedVehicle && (
                 <CardContent className="p-4 sm:p-6 text-center">
                    <CardHeader className="p-0 mb-4">
                        <CardTitle className="font-headline text-xl sm:text-2xl">All Set!</CardTitle>
                        <CardDescription>Review your new vehicle and add it to your garage.</CardDescription>
                    </CardHeader>
                    <Card className="p-4 text-left space-y-2 bg-background/50">
                        <h3 className="text-lg font-bold font-headline">{formData.nickname || `${selectedVehicle.make} ${selectedVehicle.model}`}</h3>
                        <p><strong>Vehicle:</strong> {formData.year} {selectedVehicle.make} {formData.variant}</p>
                        <p><strong>Odometer:</strong> {parseInt(formData.odometerReading).toLocaleString()} km</p>
                        <p><strong>Transmission:</strong> {formData.transmission}</p>
                        <p><strong>Driving Style:</strong> {formData.drivingStyle}</p>
                        <p><strong>Mod Stage:</strong> {formData.modStage}</p>
                        {formData.hasEngineSwap && <p className="text-accent">Engine Swap Details Logged</p>}
                    </Card>
                 </CardContent>
            )}
            
          </motion.div>
        </AnimatePresence>
      </Card>
      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={handleBack} disabled={step === 0}>
          <ChevronLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        {step < steps.length - 1 ? (
          <Button onClick={handleNext} disabled={(step === 0 && !formData.vehicleId) || (step === 1 && (!formData.odometerReading || !formData.year || !formData.variant))}>
            Next <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button onClick={handleSubmit} className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-sm hover:shadow-glow-accent transition-shadow duration-300">
            <Check className="mr-2 h-4 w-4" /> Finish & Add to Garage
          </Button>
        )}
      </div>
    </div>
  );
}

    