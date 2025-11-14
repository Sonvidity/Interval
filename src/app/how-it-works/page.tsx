import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wrench, HeartPulse, Gauge, UserCheck, Repeat } from "lucide-react";

const InfoCard = ({ icon, title, children }: { icon: React.ReactNode, title: string, children: React.ReactNode }) => (
  <Card className="bg-card/50">
    <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
      {icon}
      <CardTitle className="font-headline">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-muted-foreground">{children}</p>
    </CardContent>
  </Card>
);

export default function HowItWorksPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold font-headline">How 'Interval' Works</h1>
        <p className="text-muted-foreground mt-2">Your car isn't stock. Why should its service schedule be?</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-headline flex items-center gap-2">
            <Wrench className="text-accent" />
            The Problem with OEM Schedules
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-lg">
          <p>
            A manufacturer's service schedule is a baseline for a factory-standard vehicle under average conditions. It's like a generic 2,000-calorie diet plan.
          </p>
          <p className="font-semibold text-accent">
            But you've turned your car into a professional athlete. It needs a high-performance diet.
          </p>
          <p>
            More power, aggressive driving, and track use all generate more heat and stress. Heat is the #1 enemy of your engine oil and other vital fluids. Following the OEM schedule for a modified or hard-driven car is a recipe for premature wear and tear.
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-headline flex items-center gap-2">
            <HeartPulse className="text-accent" />
            Our Solution: The Adaptive Interval Engine
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-lg">
            'Interval' throws away the one-size-fits-all approach. We create a dynamic, personalized service schedule that adapts to your car and how you use it. We do this by running two separate calculations for your vehicle's core systems.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <InfoCard icon={<Gauge className="text-accent" />} title="Engine Component Schedule">
              Applies to Engine Oil, Filters, and Spark Plugs. This calculation is sensitive to both your modifications and your driving style, as both significantly increase engine heat and stress.
            </InfoCard>
            <InfoCard icon={<UserCheck className="text-accent" />} title="Chassis Component Schedule">
               Applies to Brakes, Transmission, and Differential fluids. This is primarily affected by your driving style. A 'Stage 2' tune doesn't stress your brake fluid, but a track day certainly does.
            </InfoCard>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-headline flex items-center gap-2">
            <Repeat className="text-accent" />
            The 'How': Factors We Use
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <InfoCard icon={<Wrench className="text-accent" />} title="Modification Factor (ModFactor)">
              More power = more heat. We apply a multiplier to your engine service interval based on your mods. A 'Stage 2' car might have its oil change interval shortened by 40% to protect the engine from increased thermal load.
            </InfoCard>
            <InfoCard icon={<UserCheck className="text-accent" />} title="Driving Style Factor (DriveFactor)">
              'Hard' driving like a track day puts immense stress on everything. We shorten the interval for your brakes, transmission, and engine to account for this accelerated wear.
            </InfoCard>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-headline flex items-center gap-2">
             <Repeat className="text-accent" />
            Special Case: Engine Swaps
          </CardTitle>
        </CardHeader>
        <CardContent>
           <p className="text-lg">
            'Interval' is one of the only apps designed to correctly handle engine-swapped vehicles. When you log an engine swap, we track the engine's mileage completely separately from the chassis mileage.
          </p>
          <ul className="list-disc list-inside mt-4 space-y-2 text-muted-foreground">
            <li><span className="font-semibold text-foreground">Engine KMs</span> are used for oil changes, spark plugs, etc.</li>
            <li><span className="font-semibold text-foreground">Chassis KMs</span> are used for suspension, brakes, and transmission service.</li>
          </ul>
           <p className="mt-4 font-semibold">This is the only way to properly service an engine-swapped car, and we make it simple.</p>
        </CardContent>
      </Card>

    </div>
  );
}
