"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { X, ArrowDown } from "lucide-react";
import type { CalculatedService } from "@/lib/types";

interface CalculationModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: CalculatedService;
}

export function CalculationModal({ isOpen, onClose, data }: CalculationModalProps) {
  if (!data) return null;
  
  const isEngine = data.type === 'Engine';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl">{data.type} Service Calculation</DialogTitle>
          <DialogDescription>
            Here's how we calculated your personalized service interval.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Base Interval (OEM)</TableCell>
                <TableCell className="text-right font-mono">{data.baseIntervalKm.toLocaleString()} km</TableCell>
              </TableRow>
              {isEngine && (
                <TableRow>
                  <TableCell>Your Mods (Stage {data.modFactor === 1.0 ? '0' : data.modFactor === 0.8 ? '1' : data.modFactor === 0.6 ? '2' : '3'})</TableCell>
                  <TableCell className="text-right font-mono">x {data.modFactor}</TableCell>
                </TableRow>
              )}
              <TableRow>
                <TableCell>Your Driving ({data.driveFactor === 1.0 ? 'Easy' : data.driveFactor === 0.85 ? 'Spirited' : 'Hard'})</TableCell>
                <TableCell className="text-right font-mono">x {data.driveFactor}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          
          <div className="flex justify-center">
            <ArrowDown className="h-6 w-6 text-muted-foreground"/>
          </div>

          <div className="text-center bg-accent/10 p-4 rounded-lg">
            <p className="text-sm text-accent">Your New Interval</p>
            <p className="text-3xl font-bold font-headline text-accent">
                {data.recommendedIntervalKm.toLocaleString()} km
            </p>
            <p className="text-xs text-accent/80">or {Math.round(data.adjustedIntervalMonths)} months</p>
          </div>

          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Last Service</TableCell>
                <TableCell className="text-right font-mono">{data.lastServiceKm.toLocaleString()} km</TableCell>
              </TableRow>
               <TableRow>
                <TableCell>Next Service Due</TableCell>
                <TableCell className="text-right font-mono">{Math.round(data.nextServiceKm).toLocaleString()} km</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
}
