"use client";

import { useState } from 'react';
import { useGarage } from '@/context/GarageContext';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import type { UserCar, ServiceLog } from '@/lib/types';
import { toast } from '@/hooks/use-toast';

interface LogServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  car: UserCar;
}

export function LogServiceModal({ isOpen, onClose, car }: LogServiceModalProps) {
  const { logService } = useGarage();
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    kms: car.odometerReading.toString(),
    serviceType: 'Engine' as ServiceLog['serviceType'],
    cost: '',
    itemsDone: '',
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    logService(car.id, {
        date: formData.date,
        kms: parseInt(formData.kms) || car.odometerReading,
        serviceType: formData.serviceType,
        cost: formData.cost ? parseFloat(formData.cost) : undefined,
        itemsDone: formData.itemsDone,
        notes: formData.notes
    });
    toast({
        title: "Service Logged!",
        description: `Your ${formData.serviceType} service for ${car.nickname} has been recorded.`,
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-headline">Log Service for {car.nickname}</DialogTitle>
          <DialogDescription>
            Add a new service record to your vehicle's history.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="date">Date</Label>
              <Input id="date" type="date" value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} />
            </div>
            <div>
              <Label htmlFor="kms">Odometer (km)</Label>
              <Input id="kms" type="number" value={formData.kms} onChange={e => setFormData({ ...formData, kms: e.target.value })} />
            </div>
          </div>
          <div>
            <Label htmlFor="serviceType">Service Type</Label>
            <Select onValueChange={(v: ServiceLog['serviceType']) => setFormData({ ...formData, serviceType: v})} defaultValue={formData.serviceType}>
                <SelectTrigger id="serviceType"><SelectValue/></SelectTrigger>
                <SelectContent>
                    <SelectItem value="Engine">Engine</SelectItem>
                    <SelectItem value="Chassis">Chassis</SelectItem>
                    <SelectItem value="General">General (Engine & Chassis)</SelectItem>
                    <SelectItem value="Repair">Repair</SelectItem>
                </SelectContent>
            </Select>
          </div>
           <div>
              <Label htmlFor="itemsDone">Items Serviced</Label>
              <Input id="itemsDone" value={formData.itemsDone} onChange={e => setFormData({ ...formData, itemsDone: e.target.value })} placeholder="e.g., Oil & Filter, Spark Plugs" />
            </div>
          <div>
            <Label htmlFor="cost">Cost ($)</Label>
            <Input id="cost" type="number" value={formData.cost} onChange={e => setFormData({ ...formData, cost: e.target.value })} placeholder="Optional" />
          </div>
          <div>
            <Label htmlFor="notes">Notes</Label>
            <Textarea id="notes" value={formData.notes} onChange={e => setFormData({ ...formData, notes: e.target.value })} placeholder="Optional notes about the service..." />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit" className="shadow-sm hover:shadow-glow-accent transition-shadow duration-300">Log Service</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
