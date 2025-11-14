import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Car } from "lucide-react";

export function AddVehiclePrompt() {
  return (
    <div className="flex items-center justify-center h-full min-h-[60vh]">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mx-auto bg-accent/20 text-accent rounded-full p-3 w-fit">
            <Car className="h-10 w-10" />
          </div>
          <CardTitle className="mt-4 font-headline text-2xl">Welcome to Interval</CardTitle>
          <CardDescription>Your garage is currently empty. Add your first vehicle to get a personalized, adaptive maintenance schedule.</CardDescription>
        </CardHeader>
        <CardContent>
          <Link href="/add-vehicle">
            <Button size="lg" className="w-full shadow-sm hover:shadow-glow-accent transition-shadow duration-300">
              <Car className="mr-2 h-4 w-4" />
              Add Your First Vehicle
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
