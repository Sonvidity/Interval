"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { CalculatedService } from "@/lib/types";
import { ServiceProgress } from "./ServiceProgress";

interface ServiceListModalProps {
  isOpen: boolean;
  onClose: () => void;
  services: CalculatedService[];
  onShowCalculation: (service: CalculatedService) => void;
}

export function ServiceListModal({ isOpen, onClose, services, onShowCalculation }: ServiceListModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl">All Service Items</DialogTitle>
          <DialogDescription>
            Complete list of upcoming services, sorted by urgency.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[60vh] pr-4">
          <div className="space-y-3 py-4">
            {services.map((service) => (
              <ServiceProgress
                key={service.name}
                service={service}
                onShowCalculation={() => onShowCalculation(service)}
              />
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
