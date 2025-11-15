import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Wrench, HeartPulse, Gauge, UserCheck, Repeat, CircleDot, Flame, Sigma, Info } from "lucide-react";

const InfoCard = ({ icon, title, children }: { icon: React.ReactNode, title: string, children: React.ReactNode }) => (
  <Card className="bg-card/50">
    <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
      {icon}
      <CardTitle className="font-headline text-lg">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="text-muted-foreground">{children}</div>
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
          <CardTitle className="text-2xl font-headline flex items-center gap-3">
            <Sigma className="text-accent" />
            The Calculation: A Full Breakdown
          </CardTitle>
          <CardDescription>No black boxes or funny business. Here is the exact formula we use to generate your personalized service schedule.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted/50 p-4 rounded-lg text-center">
            <p className="font-mono text-lg font-semibold tracking-wide">Adjusted Interval = Base Interval × ModFactor × DriveFactor</p>
          </div>
          <div className="grid md:grid-cols-3 gap-4 pt-4">
            <InfoCard icon={<Gauge className="text-accent" />} title="Base Interval">
              <p>This is the standard OEM service interval in kilometers or months for a specific part (e.g., 'Engine Oil - 10,000km'). We get this from our vehicle database.</p>
            </InfoCard>
             <InfoCard icon={<Flame className="text-accent" />} title="ModFactor">
              <p>More power = more heat and stress. We apply a multiplier based on your mods. A 'Stage 2' car might have a ModFactor of 0.6, shortening the interval by 40%.</p>
            </InfoCard>
            <InfoCard icon={<UserCheck className="text-accent" />} title="DriveFactor">
              <p>Hard driving accelerates wear. We apply a multiplier for your driving style. 'Hard' driving might have a DriveFactor of 0.6, significantly shortening the interval.</p>
            </InfoCard>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-headline flex items-center gap-3">
            <HeartPulse className="text-accent" />
            The Adaptive Interval Engine
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-lg">
            'Interval' throws away the one-size-fits-all approach. We create a dynamic, personalized service schedule that adapts to your car and how you use it. We do this by running two separate calculations for your vehicle's core systems.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <InfoCard icon={<Gauge className="text-accent" />} title="Engine Component Schedule">
              Applies to Engine Oil, Filters, and Spark Plugs. This calculation is sensitive to both your modifications (ModFactor) and your driving style (DriveFactor), as both significantly increase engine heat and stress.
            </InfoCard>
            <InfoCard icon={<UserCheck className="text-accent" />} title="Chassis Component Schedule">
               Applies to Brakes, Transmission, and Differential fluids. This is primarily affected by your driving style (DriveFactor). A 'Stage 2' tune doesn't stress your brake fluid, but a track day certainly does, so the ModFactor is not applied here.
            </InfoCard>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-headline flex items-center gap-3">
             <Repeat className="text-accent" />
            Special Case: Engine Swaps
          </CardTitle>
        </CardHeader>
        <CardContent>
           <p className="text-lg">
            'Interval' is one of the only apps designed to correctly handle engine-swapped vehicles. When you log an engine swap, we track the engine's mileage completely separately from the chassis mileage.
          </p>
          <ul className="list-disc list-inside mt-4 space-y-2 text-muted-foreground">
            <li><span className="font-semibold text-foreground">Engine KMs</span> are used for all 'Engine' type services (oil changes, spark plugs).</li>
            <li><span className="font-semibold text-foreground">Chassis KMs</span> are used for all 'Chassis' type services (suspension, brakes, transmission).</li>
          </ul>
           <p className="mt-4 font-semibold">This is the only way to properly service an engine-swapped car, and we make it simple.</p>
        </CardContent>
      </Card>
      
       <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-headline flex items-center gap-3">
            <Info className="text-accent" />
            The Guides
          </CardTitle>
          <CardDescription>Beyond calculations, we provide expert, platform-specific knowledge.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
           <div className="grid md:grid-cols-2 gap-6">
            <InfoCard icon={<Flame className="text-accent" />} title="Modification Guide">
              <p>Get platform-specific advice for your car, including common modification paths, realistic power limits on a stock engine, and critical reliability issues to watch out for before you start tuning.</p>
            </InfoCard>
            <InfoCard icon={<CircleDot className="text-accent" />} title="Fitment Guide">
              <p>Find the perfect wheel and tire setup. We provide OEM data plus a range of tested, community-approved options for different sizes, from a safe daily setup to an aggressive track stance.</p>
            </InfoCard>
          </div>
        </CardContent>
      </Card>

    </div>
  );
}
