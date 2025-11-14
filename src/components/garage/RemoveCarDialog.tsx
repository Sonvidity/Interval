"use client";

import { useGarage } from "@/context/GarageContext";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";

interface RemoveCarDialogProps {
  isOpen: boolean;
  onClose: () => void;
  carId: string;
  carNickname: string;
}

export function RemoveCarDialog({ isOpen, onClose, carId, carNickname }: RemoveCarDialogProps) {
  const { removeCar } = useGarage();
  const { toast } = useToast();

  const handleRemove = async () => {
    await removeCar(carId);
    toast({
      title: "Vehicle Removed",
      description: `"${carNickname}" has been removed from your garage.`,
    });
    onClose();
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently remove "{carNickname}" from your garage. This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleRemove} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
            Remove
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
