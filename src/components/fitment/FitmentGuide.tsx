
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Lightbulb, Settings, Scaling, MoveHorizontal, Compass, Grip, Droplets } from 'lucide-react';

export function FitmentGuide() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl font-headline flex items-center gap-2">
                    <Lightbulb className="text-accent" />
                    Understanding Fitment
                </CardTitle>
                <CardDescription>A quick guide to demystifying wheel and tire specs.</CardDescription>
            </CardHeader>
            <CardContent>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger className="font-bold"><Scaling className="mr-2 h-4 w-4" />Wheel Size (e.g., 18x8.5)</AccordionTrigger>
                        <AccordionContent>
                            This is read as **Diameter x Width**, in inches.
                            <ul className="list-disc list-inside mt-2 space-y-1">
                                <li>**18" Diameter:** The overall size of the wheel. Larger wheels can look more aggressive but may lead to a harsher ride due to smaller tire sidewalls.</li>
                                <li>**8.5" Width:** The width of the wheel barrel. Wider wheels allow for wider tires, which can increase grip.</li>
                            </ul>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger className="font-bold"><MoveHorizontal className="mr-2 h-4 w-4" />Offset (e.g., +35)</AccordionTrigger>
                        <AccordionContent>
                            Offset, measured in millimeters (mm), is the distance from the wheel's mounting hub to its centerline. It determines how far in or out the wheel sits in the wheel well.
                            <ul className="list-disc list-inside mt-2 space-y-1">
                                <li>**Lower Offset (e.g., +20):** Pushes the wheel further out, creating a "flush" or "poked" look. Can improve stability but may cause tires to rub against the fender.</li>
                                <li>**Higher Offset (e.g., +45):** Pulls the wheel further in. This is a more conservative fitment, less likely to rub but may look "tucked in."</li>
                            </ul>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger className="font-bold"><Compass className="mr-2 h-4 w-4" />PCD & Stud Pattern (e.g., 5x114.3)</AccordionTrigger>
                        <AccordionContent>
                             This is the **Pitch Circle Diameter**. It's a critical measurement that must match your car's hub.
                             <ul className="list-disc list-inside mt-2 space-y-1">
                                <li>**5:** The number of stud holes.</li>
                                <li>**114.3mm:** The diameter of the imaginary circle that passes through the center of the stud holes.</li>
                                <li>**Your car's PCD is non-negotiable.** You must buy wheels with the correct PCD.</li>
                            </ul>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4">
                        <AccordionTrigger className="font-bold"><Settings className="mr-2 h-4 w-4" />Tire Size (e.g., 245/40R18)</AccordionTrigger>
                        <AccordionContent>
                             This code tells you everything about the tire's dimensions.
                             <ul className="list-disc list-inside mt-2 space-y-1">
                                <li>**245:** The tire's width in millimeters. A wider tire provides a larger contact patch with the road, generally increasing grip.</li>
                                <li>**40:** The aspect ratio, or sidewall height, as a percentage of the width. A lower number means a shorter sidewall, leading to a stiffer ride and sharper steering response.</li>
                                <li>**R18:** The construction type (R for Radial) and the wheel diameter it fits, in inches.</li>
                            </ul>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-5">
                        <AccordionTrigger className="font-bold"><Grip className="mr-2 h-4 w-4" />How Wheels & Tires Affect Performance</AccordionTrigger>
                        <AccordionContent>
                            <ul className="list-disc list-inside mt-2 space-y-2">
                                <li>**Grip vs. Comfort:** Wider tires with shorter sidewalls (e.g., on larger wheels) provide more grip and a quicker steering feel, but often at the expense of ride comfort. The reduced sidewall has less ability to absorb bumps.</li>
                                <li>**Weight:** Larger wheels are typically heavier. This "unsprung weight" can negatively impact handling and acceleration, as your suspension has to work harder to control them. Lighter, forged wheels can be a significant performance upgrade.</li>
                                <li>**Gearing:** Changing the overall diameter of your wheel and tire combination will affect your car's effective gearing. A significantly smaller diameter acts like shorter gearing (faster acceleration), while a larger diameter acts like taller gearing (better for cruising). It will also cause your speedometer to be inaccurate.</li>
                            </ul>
                        </AccordionContent>
                    </AccordionItem>
                     <AccordionItem value="item-6">
                        <AccordionTrigger className="font-bold"><Droplets className="mr-2 h-4 w-4" />Tire Recommendations by Use Case</AccordionTrigger>
                        <AccordionContent className="space-y-4">
                            <div>
                                <h4 className="font-semibold text-base">Daily / All-Round Performance</h4>
                                <p className="text-sm text-muted-foreground mt-1">These are typically 'Ultra High Performance' (UHP) Summer tires. They offer the best balance of excellent dry and wet grip, reasonable comfort, and decent tread life. Not suitable for snow or ice.</p>
                                <p className="text-sm mt-2"><strong>Popular Examples:</strong> Michelin Pilot Sport 4S/5, Continental ExtremeContact Sport 02, Goodyear Eagle F1 SuperSport.</p>
                            </div>
                            <div>
                                <h4 className="font-semibold text-base">Spirited / Occasional Track Day</h4>
                                <p className="text-sm text-muted-foreground mt-1">These are 'Max Performance' or '200tw' tires. They offer a significant step up in dry grip from UHP tires, with stiffer sidewalls for better response, but sacrifice tread life and wet performance.</p>
                                <p className="text-sm mt-2"><strong>Popular Examples:</strong> Yokohama Advan Neova AD09, Bridgestone Potenza RE-71RS, Falken Azenis RT660.</p>
                            </div>
                            <div>
                                <h4 className="font-semibold text-base">Dedicated Track / Competition</h4>
                                <p className="text-sm text-muted-foreground mt-1">These are '100tw' or lower R-Compound / Semi-Slick tires. They provide the ultimate in dry grip but have very little tread, making them dangerous in wet conditions. They wear out extremely quickly and are generally not recommended for street driving.</p>
                                <p className="text-sm mt-2"><strong>Popular Examples:</strong> Nankang AR-1, Yokohama Advan A052, Goodyear Eagle F1 Supercar 3R.</p>
                            </div>
                            <div>
                                <h4 className="font-semibold text-base">All-Season / Daily Commuter</h4>
                                <p className="text-sm text-muted-foreground mt-1">For drivers in climates with varied weather, All-Season tires offer a safe compromise. They trade ultimate performance for longevity and the ability to handle light snow and colder temperatures.</p>
                                <p className="text-sm mt-2"><strong>Popular Examples:</strong> Michelin Pilot Sport All-Season 4, Continental ExtremeContact DWS06 Plus.</p>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
        </Card>
    );
}
