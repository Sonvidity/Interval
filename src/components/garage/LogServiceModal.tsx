"use client";

import { useState } from 'react';
import { useGarage } from '@/context/GarageContext';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { UserCar, ServiceLog, Vehicle } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { Checkbox } from '../ui/checkbox';
import { ScrollArea } from '../ui/scroll-area';

interface LogServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  car: UserCar;
  vehicleInfo: Vehicle;
}

export function LogServiceModal({ isOpen, onClose, car, vehicleInfo }: LogServiceModalProps) {
  const { logService } = useGarage();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    kms: car.odometerReading.toString(),
    cost: '',
    notes: '',
    itemsDone: [] as string[],
  });

  const handleItemsDoneChange = (item: string) => {
    setFormData(prev => {
      const newItems = prev.itemsDone.includes(item)
        ? prev.itemsDone.filter(i => i !== item)
        : [...prev.itemsDone, item];
      return { ...prev, itemsDone: newItems };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.itemsDone.length === 0) {
        toast({
            title: "No items selected",
            description: "Please select at least one service item.",
            variant: "destructive"
        });
        return;
    }
    
    logService(car.id, {
        date: formData.date,
        kms: parseInt(formData.kms) || car.odometerReading,
        // The serviceType is now inferred, but let's keep it simple and just pass 'General'
        serviceType: 'General', 
        cost: formData.cost ? parseFloat(formData.cost) : undefined,
        itemsDone: formData.itemsDone,
        notes: formData.notes
    });
    toast({
        title: "Service Logged!",
        description: `Your service for ${car.nickname} has been recorded.`,
    });
    onClose();
    // Reset form
    setFormData({
        date: new Date().toISOString().split('T')[0],
        kms: car.odometerReading.toString(),
        cost: '',
        notes: '',
        itemsDone: [],
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-headline">Log Service for {car.nickname}</DialogTitle>
          <DialogDescription>
            Add a new service record to your vehicle's history. Select all items that were completed.
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
            <Label>Items Serviced</Label>
            <ScrollArea className="h-40 rounded-md border p-4">
                <div className="space-y-2">
                    {vehicleInfo.serviceItems.map(item => (
                        <div key={item.name} className="flex items-center space-x-2">
                            <Checkbox 
                                id={`item-${item.name}`} 
                                checked={formData.itemsDone.includes(item.name)}
                                onCheckedChange={() => handleItemsDoneChange(item.name)}
                            />
                            <label htmlFor={`item-${item.name}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                {item.name}
                            </label>
                        </div>
                    ))}
                </div>
            </ScrollArea>
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
