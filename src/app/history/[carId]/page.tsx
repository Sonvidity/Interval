"use client";

import { useGarage } from "@/context/GarageContext";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Car } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format, parseISO } from "date-fns";
import { VEHICLE_DATABASE } from "@/lib/vehicles";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";


export default function ServiceHistoryPage() {
  const { carId } = useParams();
  const router = useRouter();
  const { getCarById, loading } = useGarage();

  const car = getCarById(carId as string);
  const vehicleInfo = car ? VEHICLE_DATABASE.find(v => v.id === car.vehicleId) : null;

  if (loading) {
    return (
      <div>
        <Skeleton className="h-10 w-48 mb-4" />
        <Skeleton className="h-8 w-64 mb-8" />
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-1/2" />
            <Skeleton className="h-4 w-3/4" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-64 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!car || !vehicleInfo) {
    return (
      <div className="text-center">
        <h2 className="text-2xl font-bold">Vehicle Not Found</h2>
        <p className="text-muted-foreground">We couldn't find the vehicle you were looking for.</p>
        <Link href="/" passHref>
          <Button className="mt-4">
            <ArrowLeft className="mr-2 h-4 w-4" /> Go Back to Garage
          </Button>
        </Link>
      </div>
    );
  }

  const sortedHistory = car.serviceHistory?.sort((a, b) => parseISO(b.date).getTime() - parseISO(a.date).getTime()) || [];

  return (
    <div className="max-w-4xl mx-auto">
      <Button variant="ghost" onClick={() => router.push('/')} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Garage
      </Button>

      <Card className="animate-in fade-in-50">
        <CardHeader>
          <CardTitle className="text-3xl font-headline flex items-center gap-3">
             <Car size={30} className="text-accent"/>
             <span>{car.nickname}</span>
          </CardTitle>
          <CardDescription>
            Complete service history for your {vehicleInfo.make} {vehicleInfo.model}.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {sortedHistory.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Odometer</TableHead>
                  <TableHead>Items Serviced</TableHead>
                  <TableHead className="text-right">Cost</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedHistory.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell className="font-medium">
                      {format(parseISO(log.date), "dd MMM yyyy")}
                    </TableCell>
                    <TableCell>{log.kms.toLocaleString()} km</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-2">
                        {log.itemsDone.map(item => (
                          <Badge key={item} variant="secondary" className="font-normal">{item}</Badge>
                        ))}
                         {log.notes && (
                            <p className="text-xs text-muted-foreground w-full mt-1 italic">Note: {log.notes}</p>
                         )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      {log.cost ? `$${log.cost.toFixed(2)}` : '-'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-12">
                <p className="text-muted-foreground">No service history has been logged for this vehicle yet.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
